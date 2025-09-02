import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUserDetail, isLoggedIn } from "../auth/auth";
import userContext from "../context/userContext";

function Showpost({post={id: -1, title:"This is default post title", content:"This is default content"}, deletePost}) {

    const userContextData=useContext(userContext);
    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(null);

    useEffect(()=>{
        const user = getCurrentUserDetail();
        console.log(user);
        setUser(user);
        setLogin(isLoggedIn())
    },[])

    return (
        <Card className="border-0 shadow-sm mt-3">
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{__html: post.content.length > 200 ? post.content.substring(0,200)+"..." : post.content}}>
                    {/* {post.content.substring(0,80)}... */}
                </CardText>

                <div>
                    <Link className="btn btn-secondary" to={'/post/'+post.postId} >Read More</Link>
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button onClick={(event)=>deletePost(post)} color='danger' className='ms-2' >Delete</Button> : '')}
                    {userContextData.user.login && (user && user.id === post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.postId}`} color='warning' className='ms-2' >Update</Button> : '')}
                    {post.postId}
                </div>
            </CardBody>
        </Card>        
    )
};

export default Showpost;