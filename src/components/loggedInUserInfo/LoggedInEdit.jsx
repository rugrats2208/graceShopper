import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInUser,
  editLoggedInUser,
} from '../../reducers/signedInUserReducer';

function LoggedInEdit() {
  const user = useSelector((state) => state.signedInUser);
  const dispatch = useDispatch();
  const [formInputs, setFormInputs] = useState(user);

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  useEffect(() => {
    setFormInputs(user);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await dispatch(editLoggedInUser(formInputs));
    await dispatch(getLoggedInUser());
  };

  const handleChange = (event) => {
    setFormInputs({ ...formInputs, [event.target.name]: event.target.value });
  };
  return (
    <form id="update-user" onSubmit={handleSubmit}>
      <h2>Update User</h2>
      <label htmlFor="fName">First Name</label>
      <input
        id="fName"
        name="fName"
        value={formInputs.fName || ''}
        placeholder="First Name"
        onChange={handleChange}
      />
      <label htmlFor="lName">Last Name</label>
      <input
        id="lName"
        name="lName"
        value={formInputs.lName || ''}
        placeholder="Last Name"
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        value={formInputs.email || ''}
        placeholder="Email"
        onChange={handleChange}
      />
      <label htmlFor="username">Username</label>
      <input
        id="username"
        name="username"
        value={formInputs.username || ''}
        placeholder="Username"
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        value={formInputs.password || ''}
        placeholder="Password"
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default LoggedInEdit;
