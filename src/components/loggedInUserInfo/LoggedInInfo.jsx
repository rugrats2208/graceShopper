import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../../reducers/signedInUserReducer';

function LoggedInInfo() {
  const userInfo = useSelector((state) => state.signedInUser);

  return (
    <div>
      <div>
        <h1>User Information:</h1>
        <h4>
          Name: {userInfo.fName} {userInfo.lName}
        </h4>
        <h4>Email: {userInfo.email}</h4>
        <h4>Username: {userInfo.username}</h4>
        <Link to="/loggedInEdit">Edit Info</Link>
      </div>
    </div>
  );
}

export default LoggedInInfo;
