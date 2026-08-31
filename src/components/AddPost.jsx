import { useEffect, useRef, useState } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import JoditEditor from "jodit-react";
import { createPost as submitPostToServer } from "../services/post-service";
import { getCurrentUser } from "../auth";
import { toast } from "react-toastify";

const AddPost = () => {
    const editor = useRef(null);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    });

    const config = {
        placeholder: "Start typing..."
    }

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
            toast.success("Post created");
            console.log(post);
        }).catch((error) => {
            toast.error("error");
            console.log(error);
        });
    };

    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-4">
                <CardBody>
                    <h3>What's going in your mind</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" name="title"
                                onChange={fieldChanged} placeholder="Enter your title here" />

                        </div>
                        <div className="my-3">
                            <Label for="content"></Label>
                            <JoditEditor
                                ref={editor} value={post.content}
                                onChange={contentFieldChanged} />
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