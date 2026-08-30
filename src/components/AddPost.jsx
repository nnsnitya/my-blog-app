import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";

const AddPost = () => {

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
                                <option>
                                    Programming
                                </option>
                                <option>
                                    Politics
                                </option>
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