import { useContext } from "react";
import Base from "../../components/Base";
import userContext from "../../context/userContext";

function Profileinfo() {
    const user = useContext(userContext)
    return (
        <Base>
            <div>Prifile info</div>
            <h1>Welcome {user.name}</h1>
        </Base>
    )
};

export default Profileinfo;