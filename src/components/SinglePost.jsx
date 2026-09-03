import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText } from "reactstrap";

const SinglePost = ({ post = { id: -1, title: "This is default post title", content: "This is default content" } }) => {

    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{post.title}</h1>
                <CardText dangerouslySetInnerHTML={{ __html: post.content.substring(0, 60) + "..." }}>

                </CardText>
                <div>
                    <Link className="btn btn-secondary" to="/feed">Read More</Link>
                </div>
            </CardBody>
        </Card>
    );
}

export default SinglePost;