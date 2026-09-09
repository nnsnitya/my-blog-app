import { useEffect, useState } from "react";
import { loadAllPosts } from "../services/post-service";
import { Col, Container, Row } from "reactstrap";
import { Post as SinglePost } from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = () => {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    });

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        //load all posts from server
        changePage(currentPage);
    }, [currentPage])

    const changePage = (pageNumber = 0, pageSize = 5) => {
        //load all posts from server
        if ((pageNumber > postContent.pageNumber && postContent.lastPage)
            || (pageNumber < postContent.pageNumber && postContent.pageNumber == 0)) {
            return;
        }

        loadAllPosts(pageNumber, pageSize).then(data => {
            // setPostContent(data)
            setPostContent({
                content: [...postContent.content, ...data.posts],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })
            console.log("Page Number: ", pageNumber)
            // window.scroll(0, 0);
        }).catch(err => {
            toast.error("Error in loading posts");
        })
    }

    const changePageInfinite = () => {
        console.log("page changed..");
        setCurrentPage(currentPage + 1);
    }

    return (
        <div className="container">
            <Row>
                <Col md={{
                    size: 12
                }}>
                    <h1>Blog Count {postContent?.totalElements}</h1>
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            postContent.content?.map((post) => (
                                <SinglePost post={post} key={post.postId} />
                            ))
                        }
                    </InfiniteScroll>
                </Col>
            </Row>
        </div >
    )
}

export default NewFeed;