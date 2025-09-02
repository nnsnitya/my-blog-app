import { useState } from "react";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";
import { loadAllPosts, deletePost as deletePostService } from "../services/post-service";
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

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(()=>{
        changePage(currentPage)
    },[currentPage])

    const changePage=(pageNumber=0, pageSize=5)=>{
        
        if(pageNumber > postContent.pageNumber && postContent.lastPage) {
            return;
        }
        if(pageNumber < postContent.pageNumber && postContent.pageNumber==0) {
            return;
        }

        loadAllPosts(pageNumber, pageSize).then(data=> {
            // setPostContent(data)
            setPostContent({
                content:[...postContent.content, ...data.content],
                totalPages:data.totalPages,
                totalElements:data.totalElements,
                pageSize:data.pageSize,
                lastPage:data.lastPage,
                pageNumber:data.pageNumber
            })
            console.log(data)
        }).catch(err=>{
            toast.error("Error in loading posts");
        })
    }

    //function to delete post
    function deletePost(post) {
        //going to delete post
        console.log(post)
        deletePostService(post.postId).then(resp=>{
            console.log(resp);
            toast.success("post is deleted");
            // loadPostData();
            let newPostContents=postContent.content.filter(p=>p.postId != post.postId);
            setPostContent({...postContent, content:newPostContents});
        }).catch(err => {
            console.log(err);
            toast.error("error in deleting post");
        })
    }

    const changePageInfinite=()=>{
        console.log("page changed..");
        setCurrentPage(currentPage+1);
    }

    return (
        <div className="container-fluid">
            <Row>
                <Col md={{ size: 12}} >
                    <h1>Blogs count {postContent?.totalElements}</h1>
                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          }
                    >
                        {
                            postContent.content.map((post)=>(
                                <Showpost deletePost={deletePost} post={post} key={post.postId} />
                            ))
                        }
                    </InfiniteScroll>
                    
                </Col>
            </Row>
        </div>
    )
}

export default Newfeed;