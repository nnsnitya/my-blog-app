//isLoggedIn =>
export const isLoggedIn=()=>{
    let data = localStorage.getItem("data");
    if(data==null){
        return false;
    } else {
        return true;
    }
};

//doLogin => data => set to local storage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data));
    next();
};

//doLogout => remove from local storage
export const doLogout =(next)=>{
    localStorage.removeItem("data");
    next()
};

//getCurrentUser
export const getCurrentUserDetail=()=>{
    if(isLoggedIn()){
        return JSON.parse(localStorage.getItem("data"));
    } else {
        return undefined;
    }
};
//getToken
export const getToken=()=>{
    if(isLoggedIn()){
        const user = getCurrentUserDetail();
        return user?.token;
    } else {
        return null;
    }
};