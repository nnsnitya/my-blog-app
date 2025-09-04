import { useContext, useEffect, useState } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";
import { data, useParams } from "react-router-dom";
import { getUserService } from "../../services/user-service";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";

function Profileinfo() {
    const object = useContext(userContext)
    const [user, setUser] = useState(null);
    const {userId} = useParams();
    // console.log(userId)
    useEffect(()=>{
        console.log("userId: ", userId)
        getUserService(userId).then(data=>{
            console.log(data)
            setUser({...data});
        }).catch(err=>{
            console.log("error in loading user data")
        })
    },[])

    const userView = ()=>{
        return (
            <Row>
                <Col md={{ size: 8, offset: 2}}>
                    <Card className="mt-2 border-0 rounded-0 shadow-sm">
                        <CardBody>
                            <h3 className="text-uppercase">User Information</h3>
                            <Container className="text-center">
                                <img style={{maxWidth:'200px', maxHeight:'200px'}} src="/images/default_profile.jpg" alt="user profile picture" className="img-fluid rounded-circle" />
                            </Container>
{/* {console.log(JSON.stringify(user))} */}
                            <Table responsive striped hover bordered={true} className="center mt-5">
                                <tbody>
                                    <tr>
                                        <td>BLOGS ID</td>
                                        <td>NSS{user.id}</td>
                                    </tr>
                                    <tr>
                                        <td>USER NAME</td>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <td>USER EMAIL</td>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <td>ABOUT</td>
                                        <td>{user.about}</td>
                                    </tr>
                                    <tr>
                                        <td>ROLE</td>
                                        <td>{user.roles.map((role)=>{
                                            return (
                                                <div key={role.id}>{role.name}</div>
                                            )
                                        })}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
    return (
        <Base>
            { user ? userView() : 'Loading user data..'}
        </Base>
    )
};

export default Profileinfo;