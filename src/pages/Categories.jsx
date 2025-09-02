import React from 'react'
import { useEffect } from 'react';
import { Col, Container, Row } from "reactstrap";
import { useParams } from 'react-router-dom';
import Base from '../components/Base'
import CategorySideMenu from '../components/CategorySideMenu';
import { loadPostCategoryWise, deletePost as deletePostService } from '../services/post-service';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Showpost from '../components/Showpost';

function Categories() {
    const [posts, setPosts] =  useState([]);

    const {categoryId}=useParams()
    useEffect(()=>{
        console.log(categoryId)
        loadPostCategoryWise(categoryId).then(data=>{
            setPosts([...data]);
        }).catch(err=>{
            console.log(err);
            toast.error("error in loading..");
        })
    },[categoryId])

    //function to delete post
    function deletePost(post) {
        //going to delete post
        deletePostService(post.postId).then(resp=>{
            console.log(resp);
            toast.success("post is deleted");
            // loadPostData();
            let newPosts=posts.filter(p=>p.postId != post.postId);
            setPosts([...newPosts]);
        }).catch(err => {
            console.log(err);
            toast.error("error in deleting post");
        })
    }

  return (
    <Base>
        <Container className="mt-3">
            <Row>
                <Col md={2} className="pt-5">
                    <CategorySideMenu/>
                </Col>
                <Col md={10}>
                    <h1>Blog count ( {posts.length} )</h1>
                    {
                        posts && posts.map((post, index) =>{
                            return (
                                <Showpost deletePost={deletePost} key={index} post={post} />
                            )
                        })
                    }
                    { posts.length<=0 ? <h1>No posts in this category</h1> : '' }
                </Col>
            </Row>
        </Container>
    </Base>
  )
}

export default Categories;