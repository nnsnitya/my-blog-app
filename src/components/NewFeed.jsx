import { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post-service";
import { Col, Row } from "reactstrap";
import SinglePost from "./SinglePost";

const NewFeed = () => {

    const [postContent, setPostContent] = useState({
        content: [],
    });

    useEffect(() => {
        //load all posts from server
        loadAllPosts().then((data) => {
            setPostContent(data);
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className="container">
            <Row>
                <Col md={{
                    size: 12
                }}>
                    <h1>Blog Count {postContent?.totalElements}</h1>
                    {
                        postContent?.posts?.map((post) => (
                            <SinglePost post={post} key={post.postId} />
                        ))
                    }
                </Col>
            </Row>
        </div >
    )
}

export default NewFeed;