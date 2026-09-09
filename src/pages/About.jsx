import Base from "../components/Base";
import userContext from "../context/userContext";
const About = () => {

    return (
        <userContext.Consumer>
            {(user) => (
                <Base>
                    <div>
                        <h1>This is About page</h1>
                        <p>Welcome to About page</p>
                        <h1>Welcome, {user.name}</h1>
                    </div>
                </Base>
            )}
        </userContext.Consumer>
    );
};

export default About;