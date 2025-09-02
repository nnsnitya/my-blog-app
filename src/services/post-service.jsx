import { myAxios, privateAxios } from "./helper"


//create post function
export const createPost=(postData)=>{
    return privateAxios.post(`/posts/user/${postData.userId}/category/${postData.categoryId}`,postData).then((resp)=>resp.data.data);
};

//get all posts
export const loadAllPosts=(pageNumber, pageSize)=>{
    return myAxios.get(`/posts/?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`).then(resp=> resp.data.data);
};

//load single post of given postId
export const loadSinglePost=(postId)=>{
    return myAxios.get(`/posts/`+postId).then(resp=>resp.data.data);
};

//
export const createComment=(comment, postId)=>{
    return privateAxios.post(`/post/${postId}/comments`,comment)
};

//upload post banner image
export const uploadPostImage=(image, postId)=>{
    let formData=new FormData();
    formData.append("image", image);
    return privateAxios.post(`/posts/image/upload/${postId}`, formData, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then((resp)=> resp.data.data);
};

//get category wise post
export function loadPostCategoryWise(categoryId) {
    return privateAxios.get(`/posts/category/${categoryId}`).then(resp=> resp.data.data);
};

//
export function loadPostUserWise(userId) {
    return privateAxios.get(`/posts/user/${userId}`).then(resp=>resp.data.data);
};

//delete a post
export function deletePost(postId) {
    return privateAxios.delete(`/posts/${postId}`).then(resp=>resp.data.data);
};

//update post
export function updatePost(post, postId) {
    console.log(post);
    return privateAxios.put(`/posts/${postId}`,post).then((resp)=> resp.data.data);
}