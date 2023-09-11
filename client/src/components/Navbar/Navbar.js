import { Action } from '@remix-run/router';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { logout } from '../../redux/user_reducer';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const navigateToLogin = (to) => {
    navigate('/auth?action=login')
  }

  const navigateToRegister = (to) => {
    navigate('/auth?action=register')
  }

  const navigateToDashboard= (to) => {
    navigate('/dashboard/home')
  }

  

  const handleLogout = () => {
    
    dispatch(logout())
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link className="btn" to={'/'}>QuizLy</Link>
      </div>

      <div className='navbar_action_container'>
      {isAuthenticated ? (
        <div>
          <button onClick={navigateToDashboard}>Dashboard</button>
          <button onClick={handleLogout}>Logout</button>
          </div>
        
      ) : (<>
             <button onClick={navigateToLogin}>  Login</button>
             <button onClick={navigateToRegister}>Register</button></>
            
      )}</div>
    </nav>
  );
};

export default Navbar;
