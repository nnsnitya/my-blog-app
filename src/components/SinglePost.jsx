import { Button, Card, CardBody, CardText } from "reactstrap";

const SinglePost = ({ post = { id: -1, title: "This is default post title", content: "This is default content" } }) => {

    return (
        <Card className="shadow-sm mt-3">
            <CardBody>
                <h1>{post.title}</h1>
                <CardText>
                    {post.content.substring(0, 60)}...
                </CardText>
                <div>
                    <Button>Read More</Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default SinglePost;