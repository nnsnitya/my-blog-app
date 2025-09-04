import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroute from './components/Privateroute';
import Profileinfo from './pages/user-routes/Profileinfo';
import Postpage from './pages/Postpage';
import UserProvider from './context/UserProvider';
import Categories from './pages/Categories';
import Updateblog from './pages/UpdateBlog';

function App() {
  // const [count, setCount] = useState(0)

  return (
      <UserProvider>
        <BrowserRouter>
        <ToastContainer/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/post/:postId" element={<Postpage/>} />
            <Route path='/categories/:categoryId' element={<Categories/>} />

            <Route path='/user' element={<Privateroute/>} >
              <Route path='dashboard' element={<Userdashboard/>} />
              <Route path='profile-info/:userId' element={<Profileinfo/>} />
              <Route path='update-blog/:blogId' element={<Updateblog/>} />
            </Route>

            
          </Routes>
        </BrowserRouter>
      </UserProvider>
    );
  };
      
  


export default App;
