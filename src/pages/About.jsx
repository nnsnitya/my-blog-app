import Base from "../components/Base";
import userContext from "../context/userContext";
const About = () => {

    return (
        <userContext.Consumer>
            {(ctxObj) => (
                <Base>
                    <div>
                        <h1>This is About page</h1>
                        <p>Welcome to About page</p>

                        <h1>Welcome, {ctxObj.user.login ? ctxObj.user.data.name : "Guest"}</h1>
                    </div>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default About;