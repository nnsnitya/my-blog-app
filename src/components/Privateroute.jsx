import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { isLoggedIn } from "../auth/auth";

const Privateroute=()=>{

    return isLoggedIn() ? <Outlet/> : <Navigate to={"/login"}/>
};

export default Privateroute;