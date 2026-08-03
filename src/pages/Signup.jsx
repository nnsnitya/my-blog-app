import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { userSignup } from "../services/user-service";
import { toast } from "react-toastify";
import "../assets/css/Card.css";

const Signup = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: ''
    });

    const [error, setError] = useState({
        errors: {},
        isError: false
    });

    //handle change
    const handleChange = (evt, property) => {
        //dynamic setting the value
        setData({ ...data, [property]: evt.target.value })
    };

    //resetting the form
    const resetData = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: ''
        })
    };

    //submitting the form
    const submitForm = (evt) => {
        evt.preventDefault();

        // if (error.isError) {
        //     toast.error("Form data is invalid, correct all details then submit !!");

        //     return;
        // }                //Problem in this approach, control will not move below until isError will not false

        console.log(data);
        //data validation

        //call server api for sending data
        userSignup(data).then((resp) => {
            console.log(resp);
            console.log("Success log");
            toast.success("User is registered successfully!! user id " + resp.id);
            resetData();
        })
            .catch((err) => {
                console.log(err);
                console.log("Error log");
                //handle errors in proper way
                setError({
                    errors: err,
                    isError: true
                })
            })
    };

    return (
        <div className="overlay">
            <Base>
                <Container>

                    <Row className="mt-4">
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card className="main-card" color="dark" outline>
                                <CardHeader>
                                    <h3>Fill Information to Register !!</h3>
                                </CardHeader>
                                <CardBody>
                                    {/* Creating form */}
                                    <Form onSubmit={submitForm}>

                                        {/* Name Field */}
                                        <FormGroup floating className="mb-4">

                                            <Input type="text" placeholder="Enter here" id="name"
                                                onChange={(e) => handleChange(e, 'name')}
                                                value={data.name}
                                                invalid={error.errors?.resp?.data?.name ? true : false}
                                            />
                                            <Label for="name">Enter Name</Label>
                                            <FormFeedback>
                                                {
                                                    error.errors?.resp?.data?.name
                                                }
                                            </FormFeedback>

                                        </FormGroup>
                                        {' '}
                                        {/* Email Field */}
                                        <FormGroup floating>


                                            <Input type="text" placeholder="Enter here" id="email"
                                                onChange={(e) => handleChange(e, 'email')}
                                                value={data.email}
                                            />
                                            <Label for="email">Enter Email</Label>
                                        </FormGroup>
                                        {' '}
                                        {/* Password Field */}
                                        <FormGroup floating>


                                            <Input type="password" placeholder="Enter here" id="password"
                                                onChange={(e) => handleChange(e, 'password')}
                                                value={data.password}
                                            />
                                            <Label for="password">Enter Password</Label>
                                        </FormGroup>
                                        {' '}
                                        {/* About Field */}
                                        <FormGroup floating>


                                            <Input type="textarea" placeholder="Enter here" id="about" style={{ height: "250px" }}
                                                onChange={(e) => handleChange(e, 'about')}
                                                value={data.about}
                                            />
                                            <Label for="about">Enter About</Label>
                                        </FormGroup>
                                        {' '}
                                        <Container className="text-center">

                                            <Button color="secondary" color="light">Register</Button>
                                            <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>

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

export default Signup;