import { myAxios } from "./helper"

export const userSignup = (user) => {
    return myAxios
        .post('/auth/register', user)
        .then((resp) => resp.data.data);
}

export const userSignin = (loginDetail) => {
    return myAxios
        .post('/auth/login', loginDetail).then((resp) => resp.data.data);
}