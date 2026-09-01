import { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post-service";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import SinglePost from "./SinglePost";

const NewFeed = () => {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false
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
                    <Container className="mt-3">
                        <Pagination>
                            <PaginationItem>
                                <PaginationLink first>

                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink previous>

                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink next>

                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink last>

                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>

                </Col>
            </Row>
        </div >
    )
}

export default NewFeed;