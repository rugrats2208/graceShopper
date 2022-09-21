import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate, logout } from '../../reducers/Auth/authReducer';

const Signup = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [fName, setFName] = React.useState('');
  const [lName, setLName] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(authenticate(userName, password, 'signup', email, fName, lName));
  }

  const [auth, setAuth] = React.useState('');

  return (
    <div className='container'>
      <form>
        <input
          type='text'
          placeholder='Enter username...'
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type='password'
          placeholder='Enter password...'
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type='email'
          placeholder='Enter email...'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='fName'
          placeholder='Enter first name...'
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          type='lName'
          placeholder='Enter last name...'
          onChange={(e) => setLName(e.target.value)}
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
