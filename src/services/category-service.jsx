import { myAxios } from "./helper";

export const loadAllCategories=()=>{
    return myAxios
        .get('/categories/')
        .then((resp) => {
            return resp.data.data;
        });
}
