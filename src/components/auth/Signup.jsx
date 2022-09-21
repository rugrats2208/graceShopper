import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../reducers/Auth/authReducer';

//define the Yup validation schema
const SignupSchema = Yup.object().shape({
  fName: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lName: Yup.string()
    .trim()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  username: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Required'),
  email: Yup.string().trim().email('Invalid email').required('Required'),
  password: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const Signup = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState('');

  return (
    <Formik
      initialValues={{
        password: '',
        username: '',
        email: '',
        fName: '',
        lName: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const castValues = SignupSchema.cast(values);
        dispatch(
          authenticate(
            'signup',
            castValues.username,
            castValues.password,
            castValues.email,
            castValues.fName,
            castValues.lName
          )
        );
        resetForm();
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form onSubmit={handleSubmit} className='row g-3'>
          <Form.Group controlId='formFirstName' className='col-md-4'>
            <Form.Control
              type='text'
              name='fName'
              placeholder='first name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fName}
              className={touched.firstName && errors.firstName ? 'error' : null}
            />
            {errors.fName && touched.fName ? (
              <div className='error-message'>{errors.fName}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId='formLastName' className='col-md-4'>
            <Form.Control
              type='text'
              name='lName'
              placeholder='last name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lName}
              className={touched.lName && errors.lName ? 'error' : null}
            />
            {errors.lName && touched.lName ? (
              <div className='error-message'>{errors.lName}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId='formEmail' className='col-md-4'>
            <Form.Control
              type='email'
              name='email'
              placeholder='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              className={touched.email && errors.email ? 'error' : null}
            />
            {errors.email && touched.email ? (
              <div className='error-message'>{errors.email}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId='formUsername' className='col-md-4'>
            <Form.Control
              type='text'
              name='username'
              placeholder='username'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
              autoComplete='username'
              className={touched.username && errors.username ? 'error' : null}
            />
            {errors.username && touched.username ? (
              <div className='error-message'>{errors.username}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId='formPassword' className='col-md-4'>
            <Form.Control
              type='password'
              name='password'
              placeholder='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              autoComplete='new-password'
              className={touched.password && errors.password ? 'error' : null}
            />
            {errors.password && touched.password ? (
              <div className='error-message'>{errors.password}</div>
            ) : null}
          </Form.Group>
          <Form.Group controlId='submit' className='col-12'>
            <Button
              variant='primary'
              type='submit'
              size='sm'
              disabled={isSubmitting}
            >
              Sign Up
            </Button>
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
};

export default Signup;
