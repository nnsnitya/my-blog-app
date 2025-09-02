import { useState, useEffect } from "react";
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap";
import { loadAllCategories } from "../services/category-service";
import { useRef } from "react";
import JoditEditor from "jodit-react";
import { createPost as submitPostToServer, uploadPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth/auth";
import { toast } from "react-toastify";

const Newpost=()=>{

    const editor = useRef(null);
    // const [content, setContent] = useState('');
    const [categories, setCategories]=useState([]);
    // const config = { //create by useMemo, the editor focus will not loose
    //     placeholder: "Start typing..."
    // }
    const [user, setUser]=useState(undefined);
    const [post,setPost]=useState({
        title:'',
        content:'',
        categoryId:'',

    })
    const [image, setImage]=useState(null);

    useEffect(()=>{
        setUser(getCurrentUserDetail());
        loadAllCategories().then((data)=>{
            console.log("Fetched Categories: ",data);
            setCategories(data);
        }).catch(err=>{
            console.log(err);
        });
    },[]);

    const fieldChanged=(event)=>{
        // console.log(event);
        setPost({...post, [event.target.name]:event.target.value});
    }

    const contentFieldChanged=(data)=>{
        setPost({...post, 'content':data});
    }

    const createPost=(event)=>{
        event.preventDefault();
        // console.log(post);

        //validation
        if(post.title.trim===''){
            toast.error("post title is required !!");
            return;
        }
        if(post.content.trim===''){
            toast.error("post content is required !!");
            return;
        }
        if(post.categoryId.trim===''){
            toast.error("select the category !!");
            return;
        }

        //submit the form to server
        post['userId'] = user.username;
        submitPostToServer(post).then(data=>{

            uploadPostImage(image, data.postId).then(data1=>{
                toast.success("Image uploaded !!");
            }).catch(err=>{
                toast.error("Error in uploading image");
                console.log(err);
            })

            toast.success("Post Created !!");
            // console.log(post);
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
        }).catch(err => {
            toast.error("Post not created due to some error !!");
            // console.log(err);
        })
    }

    const handleFileChange=(event)=>{
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    return (
        <div className="wrapper">
            <Card className="shadow-sm">
                <CardBody>
                    <h3>What going in your mind ?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title">Post title</Label>
                            <Input type="text" id="title" placeholder="Enter title here"
                                onChange={fieldChanged} name="title"/>
                        </div>
                        
                        <div className="my-3">
                            <Label for="content">Post Content</Label>
                            {/* <Input type="textarea" id="content" placeholder="Enter content here"
                                style={{height:'300px'}}
                            /> */}

                            <JoditEditor ref={editor} value={post.content}
                            //  config={config}
                                //  onChange={newContent=> setContent(newContent)}/>
                                onChange={contentFieldChanged} />
                        </div>

                        {/* file field */}
                        <div className="mt-3">
                            <Label for="image">Select post banner</Label>
                            <Input type="file" id="image" onChange={handleFileChange}/>
                        </div>

                        <div className="my-3">
                            <Label for="category">Post Category</Label>
                            <Input type="select" id="category" placeholder="Enter content here"
                                name="categoryId" onChange={fieldChanged} defaultValue={0} >
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
                            <Button type="submit" color="primary">Create Post</Button>
                            <Button className="ms-2" color="danger">Reset Content</Button>
                        </Container>
                        
                    </Form>
                    {/* {content} */}
                </CardBody>

            </Card>

        </div>
    )
};

export default Newpost;