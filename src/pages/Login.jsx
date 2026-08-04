import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import "../assets/css/Card.css";
import { userSignin } from "../services/user-service";
import { doLogin } from "../auth";

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
    const handleFormSubmit = (evt) => {
        evt.preventDefault();
        console.log(loginDetail);

        //validation
        if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '') {
            toast.error("Username and Password are required !!");
            return;
        }

        //submit data to server to generate token
        userSignin(loginDetail).then((privateData) => {
            console.log(privateData);

            //save the data to localStorage
            doLogin(privateData, () => {
                console.log("login detail is saved to localStorage");
            })

        }).catch(error => {
            console.log(error);
            if (error.response.status == 400 || error.response.status == 404) {
                toast.error(error.response.data.message);
            }
            toast.error("Something went wrong on server !!");
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
                                    <Form onSubmit={handleFormSubmit}>
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