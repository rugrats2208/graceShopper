import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoggedInUser,
  editLoggedInUser,
} from '../../reducers/signedInUserReducer';
import * as yup from 'yup';
import { useFormik } from 'formik';

function LoggedInEdit() {
  const user = useSelector((state) => state.signedInUser);
  const dispatch = useDispatch();

  const editUserSchema = yup.object().shape({
    fName: yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!'),
    lName: yup.string().trim().min(2, 'Too Short!').max(50, 'Too Long!'),
    username: yup
      .string()
      .trim()
      .min(5, 'Too Short!')
      .max(25, 'Too Long!')
      .test(
        'Unique Username',
        'Username already in use', // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            axios.get(`/api/auth/userExists/${value}`).then((res) => {
              if (!res.data && String(value) !== String(user.username)) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
          });
        }
      ),
    email: yup
      .string()
      .trim()
      .email('Invalid email')
      .required('Required')
      .test(
        'Unique Email',
        'Email address already in use', // <- key, message
        function (value) {
          return new Promise((resolve, reject) => {
            axios.get(`/api/auth/emailExists/${value}`).then((res) => {
              if (!res.data && String(value) !== String(user.email)) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
          });
        }
      ),
    password: yup.string().trim().min(7, 'Too Short!').max(50, 'Too Long!'),
  });

  const onSubmit = async (values, actions) => {
    await dispatch(editLoggedInUser(values));
    await dispatch(getLoggedInUser());
  };
  const formik = useFormik({
    initialValues: user,
    validationSchema: editUserSchema,
    onSubmit,
  });

  return (
    <form
      id="logged-in-form"
      className="row g-3"
      onSubmit={formik.handleSubmit}
    >
      <h1>Profile</h1>
      <div className="col-8">
        <label htmlFor="fName" className="form-label">
          First Name
        </label>
        <input
          id="fName"
          className="form-control"
          name="fName"
          value={formik.values.fName || ''}
          placeholder="First Name"
          onChange={formik.handleChange}
        />
        {formik.errors.fName && formik.touched.fName && (
          <p>{formik.errors.fName}</p>
        )}
      </div>
      <div className="col-8">
        <label htmlFor="lName" className="form-label">
          Last Name
        </label>
        <input
          id="lName"
          className="form-control"
          name="lName"
          value={formik.values.lName || ''}
          placeholder="Last Name"
          onChange={formik.handleChange}
        />
        {formik.errors.lName && formik.touched.lName && (
          <p>{formik.errors.lName}</p>
        )}
      </div>
      <div className="col-8">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          id="email"
          className="form-control"
          name="email"
          value={formik.values.email || ''}
          placeholder="Email"
          onChange={formik.handleChange}
        />
        {formik.errors.email && formik.touched.email && (
          <p>{formik.errors.email}</p>
        )}
      </div>
      <div className="col-8">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          id="username"
          className="form-control"
          name="username"
          value={formik.values.username || ''}
          placeholder="Username"
          onChange={formik.handleChange}
        />
        {formik.errors.username && formik.touched.username && (
          <p>{formik.errors.username}</p>
        )}
      </div>
      <div className="col-8">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          id="password"
          className="form-control"
          name="password"
          value={formik.values.password || ''}
          placeholder="**********"
          onChange={formik.handleChange}
        />
        {formik.errors.password && formik.touched.password && (
          <p>{formik.errors.password}</p>
        )}
        <br></br>
        <button type="submit" className="btn btn-primary">
          Edit
        </button>
      </div>
    </form>
  );
}

export default LoggedInEdit;
