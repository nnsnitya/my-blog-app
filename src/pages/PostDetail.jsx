import { Link, useParams } from "react-router-dom";
import Base from "../components/Base";
import { Card, CardBody, CardText, Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { loadPost } from "../services/post-service";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/helper";

const PostDetail = () => {

    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        //load post of postId
        loadPost(postId).then(data => {
            console.log(data);
            setPost(data);
        }).catch(err => {
            console.log(err);
            toast.error("Error in loading post");
        })
    }, []);

    const printDate = (numbers) => {

        return new Date(numbers).toLocaleString();
    }

    return (
        <Base>
            <Container className="mt-4">
                <Link to={"/"}>Home</Link > / {post && (<Link to=" ">{post.title}</Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        <Card className="mt-3 ps-2 shadow-sm">
                            {
                                (post) && (
                                    <CardBody>
                                        <CardText>Posted By <b>{post?.userName}</b> on {printDate(post?.postDate)}</CardText>
                                        <CardText>
                                            <span className="text-muted">{post.category.categoryTitle}</span>
                                        </CardText>
                                        <div className="divider" style={{ width: '100%', height: '1px', background: '#e2e2e2' }}>

                                        </div>
                                        <CardText className="mt-3">
                                            <h2>{post.title}</h2>
                                        </CardText>
                                        <div className="image-container container mt-4 shadow" style={{ maxWidth: '50%' }}>
                                            <img className="img-fluid" src={BASE_URL + '/posts/image/' + post.imageName} alt="" />
                                        </div>
                                        <CardText className="mt-4" dangerouslySetInnerHTML={{ __html: post.content }}></CardText>
                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>

        </Base>
    );
};

export default PostDetail;