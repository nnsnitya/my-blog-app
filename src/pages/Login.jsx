import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import { signInUser } from "../services/user-service";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { doLogin } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login=() => {

    const userContextData=useContext(userContext);
    const navigate = useNavigate();

    const [loginDetail, setLoginDetail] = useState({
        username:'',
        password:''
    })

    const handleChange = (event, field) => {
        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]:actualValue
        })
    }

    const handleReset=()=>{
        setLoginDetail({
            username:"",
            password:"",
        });
    };

    const handleFormSubmit=(event)=>{
        event.preventDefault();
        console.log(loginDetail);
        //validation
        if(loginDetail.username.trim()=='' || loginDetail.password.trim()==''){
            toast.error("Username or Password is required !!")
            return;
        }

        //submit the data to server to generate token
        signInUser(loginDetail).then((data)=>{
            console.log(data)

            // settingup userContext
            userContextData.setUser({
                data: data.user,
                login: true
            })
            //save data to localstorage
            doLogin(data,()=> {
                console.log("login detail is saved to localstorage.");

                //redirect to user dashboard page
                navigate("/user/dashboard");

            })
            toast.success("Login Success!!")
        }).catch(error=>{
            console.log(error)
            // if(error.response.data==)
            toast.error(error.response.data.message)
        })
    } 

    return (
        <Base>
            <Container>
                <Row>

                    <Col sm={{size:6, offset:3}}>

                        <Card color="dark" inverse>
                            <CardHeader>
                                <h3>Login Here !!</h3>
                            </CardHeader>
                            <CardBody>
                                {/* Creating form */}
                                <Form onSubmit={handleFormSubmit}>

                                    {/* Email Field */}
                                    <FormGroup>

                                        <Label for="email">Enter Email</Label>
                                        <Input type="text" placeholder="Enter here" id="email"
                                            value = {loginDetail.username}
                                            onChange={(e) => handleChange(e, 'username')}
                                        />

                                    </FormGroup>

                                    {/* Password Field */}
                                    <FormGroup>

                                        <Label for="password">Enter Password</Label>
                                        <Input type="password" placeholder="Enter here" id="password"
                                            value = {loginDetail.password}
                                            onChange={(e) => handleChange(e, 'password')}
                                        />

                                    </FormGroup>

                                    <Container className="text-center">

                                        <Button color="dark">Login</Button>
                                        <Button onClick={handleReset} color="secondary" type="reset" className="ms-2">Reset</Button>

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

export default Login;