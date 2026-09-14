import Base from "../components/Base";
import userContext from "../context/userContext";
const MyServices = () => {

    return (
        <userContext.Consumer>
            {(ctx) => (
                <Base>
                    <div>
                        <h1>This is My Services page</h1>
                        <p>Welcome, {ctx.user.login ? ctx.user.data.name : "Guest"}</p>
                    </div>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default MyServices;