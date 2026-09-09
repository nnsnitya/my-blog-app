import Base from "../components/Base";
import userContext from "../context/userContext";
const MyServices = () => {

    return (
        <userContext.Consumer>
            {(user) => (
                <Base>
                    <div>
                        <h1>This is My Services page</h1>
                        <p>Welcome, {user.name}</p>
                    </div>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default MyServices;