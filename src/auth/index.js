//isLoggedIn =>
export const isLoggedIn = () => {
    let data = localStorage.getItem("data");
    if (data == null) {
        return false;
    } else {
        return true;
    }
};


//doLogin => data => set to localStorage
export const doLogin = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
}


//doLogout => remove from localStorage
export const doLogout = () => {
    localStorage.removeItem("data");
}

//getCurrentUser
export const getCurrentUser = () => {
    if (isLoggedIn) {
        return JSON.parse(localStorage.getItem(data));
    } else {
        return false;
    }
}
