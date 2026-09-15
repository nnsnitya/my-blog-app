import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import NewFeed from "../../components/NewFeed";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import { Post } from "../../components/Post";
import CategorySideMenu from "../../components/CategorySideMenu";
// import "../../assets/css/Fixedbars.css";

const Userdashboard = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setUser(getCurrentUser());
        console.log(getCurrentUser());
        loadPostData();
    }, []);

    const loadPostData = () => {
        loadPostUserWise(getCurrentUser().id).then(resp => {
            // console.log(resp.data);
            setPosts(resp.data.posts);
        })
            .catch(err => {
                console.log(err);
                toast.error("error in loading user posts");
            })
    }
    //function to delete post
    const deletePost = (post) => {
        //confirm msg
        //going to delete post
        deletePostService(post.postId).then(resp => {
            console.log(resp);
            toast.success("post is deleted..");
            let newPosts = posts.filter(p => p.postId != post.postId);
            setPosts([...newPosts]);
        }).catch(err => {
            console.log(err);
            toast.error("error in deleting post");
        })
    };
    return (
        <Base>
            <Container className="mt-3">
                <Row>
                    <Col md={2} className="fixed-sidebar">
                        <CategorySideMenu />
                    </Col>
                    <Col md={7}>
                        <AddPost />
                        <Card color="info" className="mt-3">
                            <CardBody className="text-end">
                                <h1 style={{ fontSize: 25 }}>Posts Count ({posts.length})</h1>
                            </CardBody>
                        </Card>
                        {posts.map(post => {
                            return (
                                <Post post={post} key={post.postId} deletePost={deletePost} />
                            )
                        })}
                    </Col>
                    <Col md={3} className="fixed-sidebar">
                        <CategorySideMenu />
                    </Col>
                </Row>

            </Container>
        </Base>

    )
};

export default Userdashboard;