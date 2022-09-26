import React, { useState, useEffect } from 'react';
import { LoggedInInfo, OrderHistory, LoggedInEdit } from '../index';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggedInUser } from '../../reducers/signedInUserReducer';

function UserInfoPage() {
  const [infoRetrieved, setInfoRetrieved] = useState(false);
  const userInfo = useSelector((state) => state.signedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  useEffect(() => {
    if (userInfo !== {}) {
      setInfoRetrieved(!infoRetrieved);
    }
  }, [userInfo]);

  return (
    <div className="user-info-page">
      {infoRetrieved ? (
        <div className="guest-attempt">
          <h2>You must be signed in to view your information</h2>
          <Link to="/">Back to home</Link>
        </div>
      ) : (
        <div className="successful-login">
          <div className="logged-in-edit">{<LoggedInEdit />}</div>
          <div className="order-history"> {<OrderHistory />}</div>
        </div>
      )}
    </div>
  );
}

export default UserInfoPage;
