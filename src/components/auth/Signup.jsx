import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticate, logout } from '../../reducers/Auth/authReducer';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

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

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //login vs register state
  const [loginRegisterActive, setLoginRegisterActive] = React.useState('login');

  //login form values
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  //auth info gets set here
  const [auth, setAuth] = React.useState('');

  //login vs register button handler
  function handleLoginRegisterClick(e) {
    setLoginRegisterActive(e);
  }

  //login submit handler
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(authenticate('login', username, password));
    navigate('/');
  }

  //logout handler
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  }

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
        //using Yup to cast the validated inputs so we can send that to the db
        const castValues = SignupSchema.cast(values);
        //dispatch our authentication thunk
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
      <div>
        <MDBTabs pills justify className='mb-3'>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleLoginRegisterClick('login')}
              active={loginRegisterActive === 'login'}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleLoginRegisterClick('register')}
              active={loginRegisterActive === 'register'}
            >
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={loginRegisterActive === 'login'}>
            <form>
              <div className='text-center mb-3'>
                <p>Sign up with:</p>

                <MDBBtn floating className='mx-1'>
                  <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                  <MDBIcon fab icon='google' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                  <MDBIcon fab icon='twitter' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                  <MDBIcon fab icon='github' />
                </MDBBtn>
              </div>

              <p className='text-center'>or:</p>

              <MDBInput
                className='mb-4'
                type='text'
                id='form7Example1'
                label='username'
                onChange={(e) => setUsername(e.target.value)}
              />
              <MDBInput
                className='mb-4'
                type='password'
                id='form7Example2'
                label='Password'
                onChange={(e) => setPassword(e.target.value)}
              />

              <MDBRow className='mb-4'>
                <MDBCol className='d-flex justify-content-center'>
                  <MDBCheckbox
                    id='form7Example3'
                    label='Remember me'
                    defaultChecked
                  />
                </MDBCol>
                <MDBCol>
                  <a href='#!'>Forgot password?</a>
                </MDBCol>
              </MDBRow>

              <MDBBtn
                type='submit'
                className='mb-4'
                block
                onClick={handleSubmit}
              >
                Sign in
              </MDBBtn>
              <MDBBtn
                type='submit'
                className='mb-4'
                block
                onClick={handleLogout}
              >
                Logout
              </MDBBtn>

              <div className='text-center'>
                <p>
                  Not a member? <a href='#!'>Register</a>
                </p>
              </div>
            </form>
          </MDBTabsPane>
          <MDBTabsPane show={loginRegisterActive === 'register'}>
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
                //using Yup to cast the validated inputs so we can send that to the db
                const castValues = SignupSchema.cast(values);
                //dispatch our authentication thunk
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
                  <div className='text-center mb-3'>
                    <p>Sign up with:</p>

                    <MDBBtn floating className='mx-1'>
                      <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn floating className='mx-1'>
                      <MDBIcon fab icon='google' />
                    </MDBBtn>

                    <MDBBtn floating className='mx-1'>
                      <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn floating className='mx-1'>
                      <MDBIcon fab icon='github' />
                    </MDBBtn>
                  </div>

                  <p className='text-center'>or:</p>
                  {/* first name */}
                  <Form.Group controlId='formFirstName' className='mb-4'>
                    <Form.Control
                      type='text'
                      name='fName'
                      placeholder='first name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fName}
                      className={
                        touched.firstName && errors.firstName ? 'error' : null
                      }
                    />
                    {errors.fName && touched.fName ? (
                      <div className='error-message'>{errors.fName}</div>
                    ) : null}
                  </Form.Group>
                  {/* last name */}
                  <Form.Group controlId='formLastName' className='mb-4'>
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
                  {/* email */}
                  <Form.Group controlId='formEmail' className='mb-4'>
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
                  {/* username */}
                  <Form.Group controlId='formUsername' className='mb-4'>
                    <Form.Control
                      type='text'
                      name='username'
                      placeholder='username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      autoComplete='username'
                      className={
                        touched.username && errors.username ? 'error' : null
                      }
                    />
                    {errors.username && touched.username ? (
                      <div className='error-message'>{errors.username}</div>
                    ) : null}
                  </Form.Group>
                  {/* password */}
                  <Form.Group controlId='formPassword' className='mb-4'>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder='password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      autoComplete='new-password'
                      className={
                        touched.password && errors.password ? 'error' : null
                      }
                    />
                    {errors.password && touched.password ? (
                      <div className='error-message'>{errors.password}</div>
                    ) : null}
                  </Form.Group>
                  {/* buttons */}
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
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </Formik>
  );
}
