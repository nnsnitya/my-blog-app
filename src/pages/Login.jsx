import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import "../assets/css/Card.css";

const Login = () => {

    return (
        <div className="overlay">
            <Base>
                <Container>
                    <Row className="mt-4">
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card className="main-card" color="secondary" inverse>
                                <CardHeader>
                                    <h3>Login Here!!</h3>
                                </CardHeader>
                                <CardBody>
                                        {/* Email Field */}
                                        <FormGroup>
                                            <Label for="email">Enter Email</Label>
                                            <Input type="text" id="email"
                                                value={loginDetail.username}
                                            />
                                        </FormGroup>
                                        {/* Password Field */}
                                        <FormGroup>
                                            <Label for="password">Enter Password</Label>
                                            <Input type="password" id="password"
                                                value={loginDetail.password}
                                            />
                                        </FormGroup>

                                        <Container>
                                            <Button color="light" outline>Login</Button>
                                        </Container>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Base>
        </div>
    );
};

export default Login;