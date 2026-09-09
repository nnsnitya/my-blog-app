import React, { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

function Profileinfo() {

    const user = useContext(userContext);

    return (
        <Base>
            <div>
                <div>profile-info</div>
                <h1>Welcome, {user.name}</h1>
            </div>
        </Base>

    )
};

export default Profileinfo;