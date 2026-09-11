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

export const createComment = (comment, postId) => {
    return privateAxios.post(`/comments/post/${postId}/user/1`, comment);
};

//upload post banner image
export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image);
    return privateAxios.post(`/posts/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((resp) => resp.data.data);
};