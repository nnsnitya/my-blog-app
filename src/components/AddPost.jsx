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
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });

    const [image, setImage] = useState(null);

    // const config = {
    //     placeholder: "Start typing..."
    // }

    useEffect(
        () => {
            setUser(getCurrentUser());
            loadAllCategories().then((data) => {
                console.log(data);
                setCategories(data);
            }).catch(error => {
                console.log(error);
            })
        }, [])

    const fieldChanged = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const contentFieldChanged = (data) => {
        console.log(data);
        setPost({ ...post, 'content': data });
    };

    //create post function
    const createPost = (e) => {
        e.preventDefault();

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

        //submit the form to server
        post['userId'] = user.id;
        submitPostToServer(post).then(data => {
            uploadPostImage(image, data.postId)
                .then(resp => {
                    toast.success("Image Uploaded !!");
                }).catch(err => {
                    toast.error("Error in uploading image");
                    console.log(err);
                })
            toast.success("Post created");
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
            // console.log(post);
        }).catch((error) => {
            toast.error("error");
            console.log(error);
        });
    };

    //handling file change event
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }
    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-4">
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
                            <Button type="submit" color="primary">Create Post</Button>
                            <Button type="reset" color="danger" className="ms-2">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div >
    );
}

export default AddPost;