import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { loadAllPosts } from "../services/post-service";
import Showpost from "./Showpost";

const Newfeed=()=>{
    
    const [postContent,setPostContent]=useState({
        content:[],
        totalPages:'',
        totalElements:'',
        pageSize:'',
        lastPage:false,
        pageNumber:''
    });

    useEffect(()=>{
        //load all post from server
        loadAllPosts(0,5).then((data)=>{
            console.log(data);
            setPostContent(data)
        }).catch(err=>{
            console.log(err);
            toast.error("Error in loading posts");
        })
    },[])

    const changePage=(pageNumber=0, pageSize=5)=>{
        
        if(pageNumber > postContent.pageNumber && postContent.lastPage) {
            return;
        }
        if(pageNumber < postContent.pageNumber && postContent.pageNumber==0) {
            return;
        }

        loadAllPosts(pageNumber, pageSize).then(data=> {
            setPostContent(data)
            console.log(data)
        }).catch(err=>{
            toast.error("Error in loading posts");
        })
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size: 10, offset: 1}} >
                    <h1>Blogs count {postContent?.totalElements}</h1>
                    {
                        postContent.content.map((post)=>(
                            <Showpost post={post} key={post.postId} />
                        ))
                    }

                    <Container className="mt-3">
                        <Pagination size="lg">
                            <PaginationItem onClick={()=>changePage(postContent.pageNumber-1)} disabled={postContent.pageNumber==0} >
                                <PaginationLink previous>Previous</PaginationLink>
                            </PaginationItem>

                            {
                                [...Array(postContent.totalPages)].map((item, index)=>(

                                    <PaginationItem onClick={() => changePage(index)} active={index==postContent.pageNumber} key={index}>
                                        <PaginationLink>{index+1}</PaginationLink>
                                    </PaginationItem>
                                ))
                            }
                                                    
                            <PaginationItem>
                                <PaginationLink onClick={()=>changePage(postContent.pageNumber+1)} disabled={postContent.lastPage} next>Next</PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>
                    
                    
                </Col>
            </Row>
        </div>
    )
}

// export default Newfeed;