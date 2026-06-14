import { Button, Card, CardBody, CardHeader, Container, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import Base from "../components/Base";

const Signup = () => {

    return (
        <Base>
            <Container>

                <Card color="dark" inverse>
                    <CardHeader>
                        <h3>Fill Information to Register !!</h3>
                    </CardHeader>
                    <CardBody>
                        {/* Creating form */}
                        <Form>

                            {/* Name Field */}
                            <FormGroup>

                                <Label for="name">Enter Name</Label>
                                <Input type="text" placeholder="Enter here" id="name"
                                />

                            </FormGroup>

                            {/* Email Field */}
                            <FormGroup>

                                <Label for="email">Enter Email</Label>
                                <Input type="text" placeholder="Enter here" id="email"
                                />

                            </FormGroup>

                            {/* Password Field */}
                            <FormGroup>

                                <Label for="password">Enter Password</Label>
                                <Input type="password" placeholder="Enter here" id="password"
                                />

                            </FormGroup>

                            {/* About Field */}
                            <FormGroup>

                                <Label for="about">Enter About</Label>
                                <Input type="textarea" placeholder="Enter here" id="about" style={{ height: "250px" }}
                                />

                            </FormGroup>

                            <Container className="text-center">

                                <Button outline color="light">Register</Button>
                                <Button color="secondary" type="reset" className="ms-2">Reset</Button>

                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </Base>
    );
};

export default Signup;