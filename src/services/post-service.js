import { myAxios, privateAxios } from "./helper";

//create post function
export const createPost = (postData) => {
    console.log(postData);
    return privateAxios.post(`/posts/user/${postData.userId}/category/${postData.categoryId}`, postData)
        .then((resp) => resp.data.data);
};


//get all posts
export const loadAllPosts = () => {

    return myAxios.get(`/posts/`)
        .then(resp => resp.data.data);
}