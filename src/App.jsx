import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Base from './components/Base';

function App() {

  return (
    <Base>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element = {<Signup />}/>
        </Routes>
      </BrowserRouter>
    </Base>
  )
}

export default App
