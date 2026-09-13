import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { getCurrentUser, isLoggedIn } from "../auth";
import { useEffect, useState } from "react";

export const Post = ({ post = { postId: -1, title: "This is default post title", content: "This is default content" }, deletePost }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(getCurrentUser);
    }, []);

    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h3>{post.title}</h3>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 60) + "..." }}>

                </CardText>
                <div>
                    <Link className="btn btn-secondary" to={'/posts/' + post.postId}>Read More</Link>
                    {
                        isLoggedIn && (user && user.id === post.userId ?
                            <Button onClick={() => deletePost(post)} color="danger" className="ms-2" >Delete</Button> : '')
                    }
                </div>
            </CardBody>
        </Card>
    );
}

// export default Post;