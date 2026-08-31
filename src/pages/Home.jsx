import { useEffect } from "react";
import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";
import { loadAllPosts } from "../services/post-service";
import NewFeed from "../components/NewFeed";

const Home = () => {

    useEffect(() => {
        //load all the posts from server
    }, []);
    return (
        <Base>
            <Container className="mt-3">
                <NewFeed />
            </Container>
        </Base>
    );
};

export default Home;