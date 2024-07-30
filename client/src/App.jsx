import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './pages/SignUp'
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import LogIn from './pages/LogIn';
import Profile from './pages/Profile';
import LogOut from './pages/LogOut';
import FooterCom from './components/FooterCom';
import UpdateEmployee from './components/UpdateEmployee';
import SingleEmployeeDetails from './components/SingleEmployeeDetails';
import PrivateRoute from './components/PrivateRoute';
import Employees from './components/Employees';
function App() {
  

  return (
    <>
      <BrowserRouter>
        {/* header */}
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/log-in' element={<LogIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route element={<PrivateRoute />}>
            <Route path='/employees' element={<Employees />} />
            <Route path='/edit/:id' element={<UpdateEmployee />} />
            <Route path='/details/:id' element={<SingleEmployeeDetails />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/log-out' element={<LogOut />} />
          </Route>
        </Routes>
        <FooterCom />
      </BrowserRouter>
    </>
  )
}

export default App
