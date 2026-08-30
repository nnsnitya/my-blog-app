import { useEffect, useState } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";

const AddPost = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadAllCategories().then((data) => {
            console.log(data);
            setCategories(data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <div className="wrapper">
            <Card className="shadow-sm border-0 mt-4">
                <CardBody>
                    <h3>What's going in your mind</h3>
                    <Form>
                        <div className="my-3">
                            <Label for="title">Post Title</Label>
                            <Input type="text" id="title" placeholder="Enter your title here" />

                        </div>
                        <div className="my-3">
                            <Label for="content"></Label>
                            <Input type="textarea" id="content"
                                style={{ height: '200px' }}
                                placeholder="Enter your content here" />

                        </div>
                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category">
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
                            <Button color="primary">Create Post</Button>
                            <Button color="danger" className="ms-2">Reset Content</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default AddPost;