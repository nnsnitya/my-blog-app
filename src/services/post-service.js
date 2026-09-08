import { myAxios, privateAxios } from "./helper";

//create post function
export const createPost = (postData) => {
    console.log(postData);
    return privateAxios.post(`/posts/user/${postData.userId}/category/${postData.categoryId}`, postData)
        .then((resp) => resp.data.data);
};


//get all posts
export const loadAllPosts = (pageNumber, pageSize) => {

    return myAxios.get(`/posts/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .then(resp => resp.data.data);
}

//load single post of given id
export const loadPost = (postId) => {
    return myAxios.get("/posts/" + postId)
        .then(resp => resp.data.data);
}