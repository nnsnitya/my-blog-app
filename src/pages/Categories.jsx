import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deletePostService, loadPostCategoryWise } from "../services/post-service";
import { toast } from "react-toastify";
import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";
import { Post } from "../components/Post";
import CategorySideMenu from "../components/CategorySideMenu";

const Categories = () => {
    const [posts, setPosts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        console.log(categoryId);
        loadPostCategoryWise(categoryId).then(resp => {
            console.log("CategoryWise post: ", resp.data.posts);
            setPosts([...resp.data.posts]);
        }).catch(err => {
            console.log(err);
            toast.error("error in loading posts");
        })
    }, [categoryId]);

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
                    <Col md={2}>
                        <CategorySideMenu />
                    </Col>
                    <Col md={10}>
                        <h1>Post Count ({posts.length})</h1>
                        {
                            posts && posts.map((post) => {
                                return (
                                    <Post deletePost={deletePost} post={post} key={post.postId} />
                                )
                            })
                        }
                        {
                            posts.length <= 0 ? <h1>No posts in this category</h1> : ''
                        }
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Categories;