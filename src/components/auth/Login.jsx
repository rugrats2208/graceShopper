import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate, logout } from '../../reducers/Auth/authReducer';

const Login = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(authenticate(userName, password, 'login'));
  }

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
  }

  const [auth, setAuth] = React.useState('');

  return (
    <div className="container">
      <form>
        <input
          type="text"
          placeholder="Enter username..."
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Log In</button>
      </form>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Login;
