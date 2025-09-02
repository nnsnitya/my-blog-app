import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { useState } from "react";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Signup=() => {

    const [data, setData] = useState({
        name: '',
        email:'',
        password:'',
        about:''
    })

    const [error, setError]=useState({
        errors:{},
        isError:false,
    });

    //handle change
    const handleChange =(event, property)=>{
        //dynamic setting the vaues - property
        setData({...data, [property]: event.target.value})
    }

    //resetting the form
    const resetData=()=>{
        setData({
            name: '',
            email:'',
            password:'',
            about:''
        })
    }

    //submitting the form
    const submitForm=(event)=>{
        event.preventDefault();

        // if(error.errors) {
        //     toast.error("Form data is invalid, correct then submit.");
        //     return;
        // }

        console.log(data);

        //validate data
        //call server api to send data
        signUp(data).then((resp) => {
            console.log(resp);
            console.log("success log");
            toast.success("User is registered successfully !! user id: "+resp.id);
            setData({
                name: '',
                email: '',
                password: '',
                about: '',
            });
        }).catch((error) => {
            console.log(error);
            console.log("error log");
            //handle errors in proper way
            setError({
                errors:error.response?.data || {},
                isError:true
            });
        })
    }

    return (
        <Base>
            <Container>
                <Row>
                    {/* {JSON.stringify(data)} */}
                    <Col sm={{size:6, offset:3}}>

                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Fill Information to Register !!</h3>
                            </CardHeader>
                            <CardBody>
                                {/* Creating form */}
                                <Form onSubmit={submitForm}>

                                    {/* Name Field */}
                                    <FormGroup>

                                        <Label for="name">Enter Name</Label>
                                        <Input type="text" placeholder="Enter here" id="name"
                                            onChange={(e) => handleChange(e, 'name')}
                                            value={data.name}
                                            invalid = {!!error.errors?.name}
                                        />
                                        <FormFeedback>
                                            { error.errors?.name }
                                        </FormFeedback>

                                    </FormGroup>

                                    {/* Email Field */}
                                    <FormGroup>

                                        <Label for="email">Enter Email</Label>
                                        <Input type="text" placeholder="Enter here" id="email"
                                            onChange={(e) => handleChange(e, 'email')}
                                            value={data.email}
                                            invalid = {error.errors?.email ? true:false}
                                        />
                                        <FormFeedback>
                                            { error.errors?.email }
                                        </FormFeedback>

                                    </FormGroup>

                                    {/* Password Field */}
                                    <FormGroup>

                                        <Label for="password">Enter Password</Label>
                                        <Input type="password" placeholder="Enter here" id="password"
                                            onChange={(e) => handleChange(e, 'password')}
                                            value={data.password}
                                            invalid = {!!error.errors?.password ? true:false}
                                        />
                                        <FormFeedback>
                                            { error.errors?.password }
                                        </FormFeedback>

                                    </FormGroup>

                                    {/* About Field */}
                                    <FormGroup>

                                        <Label for="about">Enter About</Label>
                                        <Input type="textarea" placeholder="Enter here" id="about" style={{height:"250px"}}
                                            onChange={(e) => handleChange(e, 'about')}
                                            value={data.about}
                                            invalid = {error.errors?.about ? true:false}
                                        />
                                        <FormFeedback>
                                            { error.errors?.about }
                                        </FormFeedback>

                                    </FormGroup>

                                    <Container className="text-center">

                                        <Button outline color="light">Register</Button>
                                        <Button onClick={resetData} color="secondary" type="reset" className="ms-2">Reset</Button>

                                    </Container>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </Base>
    );
};

export default Signup;