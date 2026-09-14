import { useEffect, useRef, useState } from "react";
import { deletePostService, loadAllPosts } from "../services/post-service";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
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
    const loadedPages = useRef(new Set());
    const loadingPages = useRef(new Set());

    useEffect(() => {
        //load all posts from server
        changePage(currentPage);

    }, [currentPage])

    const changePage = async (pageNumber = 0, pageSize = 3) => {
        if (loadedPages.current.has(pageNumber) || loadingPages.current.has(pageNumber)
        ) {
            console.log("Skipping page:", pageNumber);
            return;
        }
        loadingPages.current.add(pageNumber);
        console.log("Loading page:", pageNumber);
        try {
            const data = await loadAllPosts(pageNumber, pageSize);
            loadedPages.current.add(pageNumber);
            setPostContent(prev => ({
                ...prev,
                content: [...prev.content, ...data.posts],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            }));
            console.log(data);
        } catch (err) {
            console.error(err);
            toast.error("Error in loading posts");
        } finally {
            loadingPages.current.delete(pageNumber);
        }
    };

    const deletePost = (post) => {
        //confirm msg
        //going to delete post
        deletePostService(post.postId).then(resp => {
            console.log(resp);
            toast.success("post is deleted..");

            let newPostContents = postContent.content.filter(p => p.postId != post.postId);
            setPostContent({ ...postContent, content: newPostContents })
        }).catch(err => {
            console.log(err);
            toast.error("error in deleting post");
        })
    }

    const changePageInfinite = () => {
        console.log("page changed..");
        setCurrentPage(prev => prev + 1);
    };

    return (
        <div>
            <Row>
                <Col md={{ size: 12 }}>
                    <Card color="info">
                        <CardBody className="text-end">
                            <h1 style={{ fontSize: 25 }}>Posts Count ({postContent?.totalElements})</h1>
                        </CardBody>
                    </Card>

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
                                <SinglePost deletePost={deletePost} post={post} key={post.postId} />
                            ))
                        }
                    </InfiniteScroll>
                </Col>
            </Row>
        </div >
    )
}

export default NewFeed;