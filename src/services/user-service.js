import { myAxios } from "./helper"

export const userSignup = (user) => {
    return myAxios
        .post('/api/v1/auth/register', user)
        .then((resp) => resp.data.data);
}