import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import "../assets/css/Card.css";

const Login = () => {

    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''

    });

    const handleChange = (evt, field) => {
        let actualValue = evt.target.value;
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        })
    };
    const handleReset = () => {
        setLoginDetail({
            username: "",
            password: ""
        });
    };

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
                                                onChange={(e) => handleChange(e, 'username')}
                                            />
                                        </FormGroup>
                                        {/* Password Field */}
                                        <FormGroup>
                                            <Label for="password">Enter Password</Label>
                                            <Input type="password" id="password"
                                                value={loginDetail.password}
                                                onChange={(e) => handleChange(e, 'password')}
                                            />
                                        </FormGroup>

                                        <Container>
                                            <Button color="light" outline>Login</Button>
                                            <Button onClick={handleReset} className="ms-2" color="secondary">Reset</Button>
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