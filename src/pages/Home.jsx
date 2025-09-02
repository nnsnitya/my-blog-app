import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Base from "../components/Base";
import CategorySideMenu from "../components/CategorySideMenu";
import Newfeed from "../components/Newfeed";

const Home=() => {

    useEffect(()=>{
        //load all the posts from server
    },[]);

    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2} className="pt-5">
                        <CategorySideMenu/>
                    </Col>
                    <Col md={10}>
                        <Newfeed/>
                    </Col>
                </Row>
            </Container>
        </Base>
        
    );
};

export default Home;