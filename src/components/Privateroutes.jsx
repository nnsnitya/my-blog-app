import { Outlet } from "react-router-dom";

const Privateroutes = () => {

    let loggedIn = false;
    if (loggedIn) {
        return <Outlet />
    } else {
        return "User is not logged in";
    }

    return (
        <>
            <div>Privateroute: this is private route</div>
            <Outlet />
        </>
    )
};

export default Privateroutes;