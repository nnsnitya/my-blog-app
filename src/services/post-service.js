import { privateAxios } from "./helper";

//create post function
export const createPost = (postData) => {
    console.log(postData);
    return privateAxios.post(`/posts/user/${postData.userId}/category/${postData.categoryId}`, postData)
        .then((resp) => resp.data.data);
};
