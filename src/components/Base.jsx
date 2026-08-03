import CustomNavbar from "./CustomNavbar";
import bgImage from "../assets/hero.png";
import "../assets/css/Base.css"


const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div className="base-page" style={{
            backgroundImage: `url(${bgImage})`
        }}>

            <CustomNavbar />

            <main className="page-content">
                {children}
            </main>

            <footer className="footer mt-5">
                <h1>This is footer</h1>
            </footer>
        </div>
    );
};

export default Base;