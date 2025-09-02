import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Container } from "reactstrap";
import { getCurrentUserDetail } from "../../auth/auth";
import Base from "../../components/Base";
import Newpost from "../../components/Newpost";
import Showpost from "../../components/Showpost";
import { loadPostUserWise, deletePost as deletePostService } from "../../services/post-service";

const Userdashboard = ()=>{
    const [user, setUser]=useState({})
    const [posts, setPosts]=useState([]);
    useEffect(()=>{
        const user = getCurrentUserDetail();
        // console.log("======user:==",user);
        setUser(user);
        loadPostData(user.id);
    },[])

    function loadPostData(userId) {
        loadPostUserWise(userId).then(data=> {
            // console.log([data])
            setPosts([...data].reverse());
        }).catch(err=>{
            console.log(err);
            toast.error("error in loading !!");
        })
    }

    //function to delete post
    function deletePost(post) {
        console.log(post)
        //going to delete post
        deletePostService(post.postId).then(resp=>{
            console.log(resp);
            toast.success("post is deleted");
            // loadPostData();
            let newPosts=posts.filter(p=>p.postId != post.postId);
            setPosts([...newPosts]);
        }).catch(err => {
            console.log(err);
            toast.error("error in deleting post");
        })
    }
    return (
        <Base>
            <Container>

                <Newpost/>
                <h1 className="my-3">Posts Count : ({posts.length})</h1>
                {posts.map((post, index)=>{
                    return (
                        <Showpost deletePost={deletePost} post={post} key={index} />
                    )
                })}
                
            </Container>
            
            {/* <div>
                <h1>Welcome to user dashboard</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum pariatur voluptas dicta, maxime rerum numquam itaque debitis distinctio eaque, accusantium iste neque architecto odit aliquam libero vel veritatis amet. Omnis sunt numquam voluptatum asperiores dolore dignissimos a? Quis, cumque enim earum dignissimos, eius blanditiis sit sed optio, labore non sapiente?</p>
            </div> */}
        </Base>
    )
};

export default Userdashboard;