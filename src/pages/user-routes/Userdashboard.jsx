import { Container } from "reactstrap";
import AddPost from "../../components/AddPost";
import Base from "../../components/Base";
import NewFeed from "../../components/NewFeed";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../../auth";
import { deletePostService, loadPostUserWise } from "../../services/post-service";
import { toast } from "react-toastify";
import { Post } from "../../components/Post";

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
    const deletePost = (post => {
        //confirm msg
        //going to delete post
        deletePostService(post.postId).then(resp => {
            console.log(resp);
            toast.success("post is deleted..");
            loadPostData();
        }).catch(err => {
            console.log(err);
            toast.error("error in deleting post");
        })
    })
    return (
        <Base>
            <Container>

                <AddPost />
                <h1 className="mt-3">Posts Count ({posts.length})</h1>
                {posts.map(post => {
                    return (
                        <Post post={post} key={post.postId} deletePost={deletePost} />
                    )
                })}
            </Container>
        </Base>

    )
};

export default Userdashboard;