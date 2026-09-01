import { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post-service";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import SinglePost from "./SinglePost";
import { toast } from "react-toastify";

const NewFeed = () => {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    });

    useEffect(() => {
        //load all posts from server
        changePage(0);
    }, [])

    const changePage = (pageNumber = 0, pageSize = 2) => {
        //load all posts from server
        if ((pageNumber > postContent.pageNumber && postContent.lastPage)
            || (pageNumber < postContent.pageNumber && postContent.pageNumber == 0)) {
            return;
        }

        loadAllPosts(pageNumber, pageSize).then((data) => {
            console.log(data)
            setPostContent(data);
            window.scroll(0, 0);
        }).catch(err => {
            toast.error("Error in loading posts");
        })
    }

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
                        <Pagination size="sm">
                            <PaginationItem disabled={postContent.pageNumber == 0}>
                                <PaginationLink first>

                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem onClick={() => changePage(postContent.pageNumber - 1)} disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous>

                                </PaginationLink>
                            </PaginationItem>
                            {
                                [...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                            <PaginationItem disabled={postContent.lastPage} onClick={() => changePage(postContent.pageNumber + 1)}>
                                <PaginationLink next>

                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={postContent.lastPage}>
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