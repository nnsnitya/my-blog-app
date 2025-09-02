import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardBody, CardText, Col, Container, Input, Row, Button } from "reactstrap";
import { isLoggedIn } from "../auth/auth";
import Base from "../components/Base";
import { BASE_URL } from "../services/helper";
import { createComment, loadSinglePost } from "../services/post-service";

const Postpage = ()=>{

    const {postId}=useParams();
    const [post, setPost]=useState(null)
    const [comment, setComment]=useState({
        content:''
    })
    useEffect(()=>{
        //load post of postId
        loadSinglePost(postId).then(data=>{
            // console.log("--------"+data+"---------"+data.post+"-------"+postId);
            setPost(data);
        }).catch(err=>{
            console.log(err);
            toast.error("Error in loading post !!");
        })
    },[])

    const printDate=(numbers)=>{
        return new Date(numbers).toLocaleDateString();
    }
    const submitPost=()=>{
        if(!isLoggedIn){
            toast.error("Please login first !!");
            return;
        }
        if(comment.content.trim()===''){
            return;
        }
        createComment(comment, post.postId)
        .then((data)=> {
            console.log(data)
            toast.success("Comment added..")
            setPost({
                ...post, comments:[...post.comments, data.data.data]
            })
            setComment({
                content:''
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    return (

        <Base>
            <Container>
                <Link to="/">Home</Link> / {post && (<Link to="" >{post.title}</Link>)}
                <Row>
                    <Col md={{
                        size:12
                    }}>
                        <Card className="mt-3">
                            {
                                (post) && (
                                    <CardBody>
                                        <CardText>Posted By <b>{post.user.name}</b> on <b>{printDate(post.addedDate)}</b></CardText>
                                        <CardText>
                                            <span className="text-muted">{post.category.categoryTitle}</span>
                                        </CardText>
                                        <div className="divider" style={{
                                            width:'100%',
                                            height:'1px',
                                            background:'#e2e2e2'
                                        }}></div>
                                        <CardText className="mt-3" >
                                            <h1>{post.title}</h1>
                                        </CardText>
                                        <div className="image-container mt-4 text-center" style={{maxWidth:'50%'}}>
                                            <img className="img-fluid" src={BASE_URL+'/posts/image/'+post.imageName} alt="" />
                                        </div>
                                        <CardText className="mt-5" dangerouslySetInnerHTML={{__html:post.content}} ></CardText>
                                    </CardBody>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
                <Row className="my-4">
                    <Col md={{
                        size:9,
                        offset:1
                    }}>
                        <h3>Comments ({post ? post.comments.length : 0})</h3>
                        {
                            post && post.comments.map((c, index) => (
                                <Card className="mt-4 border-0" key={index}>
                                    <CardBody>
                                        <CardText>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }
                        <Card className="mt-4 border-0">
                            <CardBody>
                                <Input type="textarea" placeholder="Enter comment here.."
                                    onChange={(event)=> setComment({content:event.target.value})}
                                    value={comment.content}
                                />
                                <Button onClick={submitPost} className="mt-2" color="primary" >Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
        
    );
};

export default Postpage;