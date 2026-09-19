import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { createPost as submitPostToServer, uploadPostImage } from "../services/post-service";
import { getCurrentUser } from "../auth";
import { toast } from "react-toastify";
import "../assets/css/Inputfields.css";

const AddPost = () => {
    const editor = useRef(null);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [post, setPost] = useState({ title: '', content: '', categoryId: '', userId: '', imageName: '' });
    const [uploading, setUploading] = useState(false);
    const [submittng, setSubmitting] = useState(false);
    // const [image, setImage] = useState(null);

    // const config = {
    //     placeholder: "Start typing..."
    // }

    useEffect(
        () => {
            setUser(getCurrentUser());
            loadAllCategories().then((resp) => {
                console.log(resp);
                setCategories(resp.data);
            }).catch(error => {
                console.log(error);
            })
        }, [])

    const fieldChanged = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const contentFieldChanged = (data) => {
        // console.log(data);
        setPost({ ...post, 'content': data });
    };

    //create post function
    const createPost = async (e) => {
        e.preventDefault();

        try {
            setSubmitting(true);
            // 2. Prepare Post DTO
            // const post = { title: post.title, content: post.content, categoryId: post.categoryId, userId: user.id, fileName: fileName };
            console.log("Creating post:", post);

            //validation
            if (post.title.trim() === '') {
                toast.error("Title is required !!");
                return;
            }
            if (post.content.trim === '') {
                toast.error("Content is required !!");
                return;
            }
            if (post.categoryId === '') {
                toast.error("Select some category !!");
                return;
            }
            // 3. Create Post
            post['userId'] = user.id;
            const data = await submitPostToServer(post);
            console.log("Post created:", data);
            toast.success("Post created successfully!");

            //4. Reset Form
            setPost({
                title: '',
                content: '',
                categoryId: '',
                imageName: ''
            })
            // setImage(null);
        } catch (error) {
            console.error("Error creating post:", error);
            toast.error("Error creating post");
        } finally {
            setSubmitting(false);
        }
    };

    //handling file change event
    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            console.log("Selected File: ", selectedFile);
            // setImage(selectedFile);
            let fileName = null;
            setUploading(true);
            //1. Upload image first
            // if (image) {
            try {
                console.log("Uploading image...");
                const uploadData = await uploadPostImage(selectedFile);
                console.log("Image uploaded:", uploadData); // filename/objectKey returned by backend
                fileName = uploadData.imageName;
                post['imageName'] = fileName;
                console.log("image uploaded...");
            } catch (err) {
                console.error("Image upload failed:", err);
                toast.error("Error in uploading image"); return;
            } finally {
                setUploading(false);
            }
            // }
        }

    }
    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0">
                <CardBody>
                    <h3>What's going in your mind</h3>
                    <Form onSubmit={createPost}>
                        <div className="floating-input my-3">
                            <Input type="text" id="title" name="title"
                                onChange={fieldChanged} placeholder="" />
                            <Label for="title">Post Title</Label>

                        </div>
                        <div className="my-3">
                            <Label for="content"></Label>
                            <JoditEditor
                                ref={editor} value={post.content}
                                onChange={contentFieldChanged} />
                        </div>
                        {/* file field */}
                        <div className="floating-input mt-3">
                            <Input id="image" type="file" onChange={handleFileChange} placeholder="" />
                            <Label for="image">Select post banner</Label>
                        </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" name="categoryId"
                                onChange={fieldChanged}
                                defaultValue={0}>
                                <option disabled value={0}>--Select Category--</option>
                                {
                                    categories.map((category) => (
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle}
                                        </option>
                                    ))
                                }
                            </Input>

                        </div>
                        <Container className="text-center">
                            <Button type="submit" color="primary" disabled={uploading || submittng}>
                                {uploading ? "Uploading image..."
                                    : submittng ? "Creating post..." : "Create Post"}
                            </Button>
                            <Button type="reset" color="danger" className="ms-2">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div >
    );
}

export default AddPost;