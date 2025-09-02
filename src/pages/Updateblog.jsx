import { useNavigate, useParams } from "react-router-dom";
import Base from "../components/Base";
import { useContext, useEffect, useState, useRef } from "react";
import userContext from "../context/userContext";
import { loadSinglePost, updatePost as updatePostService } from "../services/post-service";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { loadAllCategories } from "../services/category-service";

function Updateblog() {
    const { blogId } = useParams();
    const [categories, setCategories]=useState([]);
    const editor = useRef(null);
    const object = useContext(userContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(()=>{

        loadAllCategories().then((data)=>{
            console.log("Fetched Categories: ",data);
            setCategories(data);
        }).catch(err=>{
            console.log(err);
        });

        //load the blog from database
        loadSinglePost(blogId).then(data=>{
            setPost({...data, categoryId:data.category.categoryId})
        }).catch(err=>{
            console.log(err);
            toast.error("error in loading the blog");
        })

    },[]);

    useEffect(()=>{
        if(post) {
            if(post.user.id != object.user.data.id) {
                //if id is guessable
                toast.error("This is not your post !!");
                navigate("/");
            }
        }
    },[post])

    const handleChange=(event, fieldName)=>{
        setPost({
            ...post,
            [fieldName]: event.target.value
        })
    }
    const updatePost=(event)=>{
        event.preventDefault();
        console.log(post);
        updatePostService({...post, category: {categoryId: post.categoryId }}, post.postId).then(resp=>{
            console.log(resp);
            toast.success("Post updated");
            
        }).catch(err=>{
            console.log(err);
            toast.error("error in updating post");
        })
    }

    const updateHtml=()=>{
        return (
            <div className="wrapper">
                {/* {JSON.stringify(post)} */}
                <Card className="shadow-sm">
                    <CardBody>
                        <h3>Update post from here !!</h3>
                        <Form onSubmit={updatePost}>
                            <div className="my-3">
                                <Label for="title">Post title</Label>
                                <Input type="text" id="title" placeholder="Enter title here"
                                    onChange={(event)=>handleChange(event, 'title')} name="title" value={post.title}/>
                            </div>
                            
                            <div className="my-3">
                                <Label for="content">Post Content</Label>
                                {/* <Input type="textarea" id="content" placeholder="Enter content here"
                                    style={{height:'300px'}}
                                /> */}

                                <JoditEditor ref={editor}
                                value={post.content}
                                //  config={config}
                                    //  onChange={newContent=> setContent(newContent)}/>
                                    onChange={newContent=>setPost({...post, content: newContent})} />
                            </div>

                            {/* file field */}
                            <div className="mt-3">
                                <Label for="image">Select post banner</Label>
                                <Input type="file" id="image" onChange={''}/>
                            </div>

                            <div className="my-3">
                                <Label for="category">Post Category</Label>
                                <Input type="select" id="category" placeholder="Enter content here"
                                    name="categoryId" onChange={(event)=> handleChange(event, 'categoryId')} 
                                        value={post.categoryId}
                                    >
                                        <option disabled value={0}>--Select category--</option>
                                    {
                                        categories.map((cat) => (
                                            <option value={cat.categoryId} key={cat.categoryId}>
                                                {cat.categoryTitle}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </div>
                            <Container className="text-center">
                                <Button type="submit" color="primary">Update Post</Button>
                                <Button className="ms-2" color="danger">Reset Content</Button>
                            </Container>
                            
                        </Form>
                        {/* {content} */}
                    </CardBody>

                </Card>
            </div>
        )
    }

    return (
        <Base>
            <Container>
                {post && updateHtml()}
            </Container>
        </Base>
    )
}

export default Updateblog;