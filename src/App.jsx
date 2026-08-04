import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Base from './components/Base';
import Postpage from './pages/Postpage';
import About from './pages/About';
import Services from './pages/Services';
import Contactus from './pages/Contactus';
import { ToastContainer } from 'react-toastify';
import Userdashboard from './pages/user-routes/Userdashboard';
import Privateroutes from './components/Privateroutes';
import Profileinfo from './pages/user-routes/Profileinfo';

function App() {

  return (
    <BrowserRouter>
      <ToastContainer position='bottom-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Signup />} />
        <Route path='/feeds' element={<Postpage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contactus' element={<Contactus />} />
        {/* <Route path='/profile' element={<Profile />} /> */}

        <Route path='/user' element={<Privateroutes />}>
          <Route path='dashboard' element={<Userdashboard />} />
          <Route path='profile-info' element={<Profileinfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
