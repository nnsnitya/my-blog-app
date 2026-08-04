import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../auth";

const Privateroutes = () => {

    return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />
};

export default Privateroutes;