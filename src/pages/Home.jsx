import { useEffect } from "react";
import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";
import { loadAllPosts } from "../services/post-service";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const Home = () => {

    useEffect(() => {
        //load all the posts from server
    }, []);
    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2}>
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <NewFeed />
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Home;