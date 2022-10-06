import axios from 'axios';
import { Formik } from 'formik';
import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBIcon,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { authenticate } from '../../reducers/Auth/authReducer';

//define the Yup validation schema for SIGNUP
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
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .matches(
      /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm,
      'Alphanumeric, dot, underscore, and dash only'
    )
    .required('Required')
    .test(
      'Unique Username',
      'Username already in use', // <- key, message
      function (value) {
        return new Promise((resolve, reject) => {
          axios.get(`/api/auth/userExists/${value}`).then((res) => {
            if (res.data) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      }
    ),
  email: Yup.string()
    .trim()
    .email('Invalid email')
    .required('Required')
    .test(
      'Unique Email',
      'Email address already in use', // <- key, message
      function (value) {
        return new Promise((resolve, reject) => {
          axios.get(`/api/auth/emailExists/${value}`).then((res) => {
            if (res.data) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        });
      }
    ),
  password: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  changepassword: Yup.string().when('password', {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Both password need to be the same'
    ),
  }),
});

//define the Yup validation schema for LOGIN
const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(5, 'Too Short!')
    .max(30, 'Too Long!')
    .matches(
      /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/gm,
      'Alphanumeric and dot, underscore, and dash'
    )
    .required('Required'),
  password: Yup.string()
    .trim()
    .min(7, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function Signup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //login vs register state
  const [loginRegisterActive, setLoginRegisterActive] = React.useState('login');

  //login vs register button handler
  function handleLoginRegisterClick(e) {
    setLoginRegisterActive(e);
  }

  return (
    <div>
      {/* forms render as a MODAL */}
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Login/Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBTabs pills justify className="mb-3">
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
              {/* LOGIN FORM */}
              <Formik
                initialValues={{
                  password: '',
                  username: '',
                }}
                validationSchema={LoginSchema}
                validateOnChange={false}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true);
                  //using Yup to cast the validated inputs so we can send that to the db
                  const castValues = SignupSchema.cast(values);
                  //dispatch our authentication thunk
                  dispatch(
                    authenticate(
                      'login',
                      castValues.username,
                      castValues.password
                    )
                  );
                  resetForm();
                  setSubmitting(false);
                  props.onHide();
                  props.closeNav();
                  navigate('/');
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
                  <Form onSubmit={handleSubmit} className="row g-3">
                    {/* username */}
                    <Form.Group controlId="formUsername" className="mb-0">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="username"
                        autoFocus
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        autoComplete="username"
                        autoCapitalize="off"
                        className={
                          touched.username && errors.username ? 'error' : null
                        }
                      />
                      {errors.username && touched.username ? (
                        <div className="error-message">{errors.username}</div>
                      ) : null}
                    </Form.Group>
                    {/* password */}
                    <Form.Group controlId="formPassword" className="mb-0">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        autoComplete="current-password"
                        autoCapitalize="off"
                        className={
                          touched.password && errors.password ? 'error' : null
                        }
                      />
                      {errors.password && touched.password ? (
                        <div className="error-message">{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    {/* buttons */}
                    <Form.Group controlId="submit" className="col-12">
                      <MDBBtn
                        type="submit"
                        className="mb-4"
                        block
                        disabled={isSubmitting}
                      >
                        Sign In
                      </MDBBtn>
                    </Form.Group>
                  </Form>
                )}
              </Formik>

              <MDBRow className="mb-4">
                {/* <MDBCol className="d-flex justify-content-center">
                  <MDBCheckbox
                    id="form7Example3"
                    label="Remember me"
                    defaultChecked
                  />
                </MDBCol> */}
                <MDBCol className="d-flex justify-content-center">
                  <a href="#!">Forgot password?</a>
                </MDBCol>
              </MDBRow>

              <div className="text-center">
                <p>
                  Not a member?{' '}
                  <a
                    href="#!"
                    onClick={() => handleLoginRegisterClick('register')}
                  >
                    Register
                  </a>
                </p>
              </div>
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === 'register'}>
              {/* SIGNUP FORM */}
              <Formik
                initialValues={{
                  password: '',
                  changepassword: '',
                  username: '',
                  email: '',
                  fName: '',
                  lName: '',
                }}
                validationSchema={SignupSchema}
                validateOnChange={false}
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
                  props.onHide();
                  props.closeNav();
                  navigate('/');
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
                  <Form onSubmit={handleSubmit} className="row g-3">
                    {/* first name */}
                    <Form.Group controlId="formFirstName" className="mb-0">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fName"
                        placeholder="first name"
                        autoComplete="given-name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fName}
                        className={
                          touched.firstName && errors.firstName ? 'error' : null
                        }
                      />
                      {errors.fName && touched.fName ? (
                        <div className="error-message">{errors.fName}</div>
                      ) : null}
                    </Form.Group>
                    {/* last name */}
                    <Form.Group controlId="formLastName" className="mb-0">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lName"
                        placeholder="last name"
                        autoComplete="family-name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lName}
                        className={
                          touched.lName && errors.lName ? 'error' : null
                        }
                      />
                      {errors.lName && touched.lName ? (
                        <div className="error-message">{errors.lName}</div>
                      ) : null}
                    </Form.Group>
                    {/* email */}
                    <Form.Group controlId="formEmail" className="mb-0">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="email"
                        autoComplete="email"
                        autoCapitalize="off"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={
                          touched.email && errors.email ? 'error' : null
                        }
                      />
                      {errors.email && touched.email ? (
                        <div className="error-message">{errors.email}</div>
                      ) : null}
                    </Form.Group>
                    {/* username */}
                    <Form.Group
                      controlId="formUsernameRegister"
                      className="mb-0"
                    >
                      <Form.Label>Username</Form.Label>

                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        autoComplete="username"
                        autoCapitalize="off"
                        className={
                          touched.username && errors.username ? 'error' : null
                        }
                      />
                      {errors.username && touched.username ? (
                        <div className="error-message">{errors.username}</div>
                      ) : null}
                    </Form.Group>
                    {/* password */}
                    <Form.Group
                      controlId="formPasswordRegister"
                      className="mb-0"
                    >
                      <Form.Label>Password</Form.Label>

                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        autoComplete="new-password"
                        className={
                          touched.password && errors.password ? 'error' : null
                        }
                      />
                      {errors.password && touched.password ? (
                        <div className="error-message">{errors.password}</div>
                      ) : null}
                    </Form.Group>
                    {/* changepassword */}
                    <Form.Group
                      controlId="formChangePasswordRegister"
                      className="mb-0"
                    >
                      <Form.Label>Confirm Password</Form.Label>

                      <Form.Control
                        type="password"
                        name="changepassword"
                        placeholder="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.changepassword}
                        autoComplete="off"
                        className={
                          touched.changepassword && errors.changepassword
                            ? 'error'
                            : null
                        }
                      />
                      {errors.changepassword && touched.changepassword ? (
                        <div className="error-message">
                          {errors.changepassword}
                        </div>
                      ) : null}
                    </Form.Group>
                    {/* buttons */}
                    <Form.Group controlId="submit" className="col-12">
                      <MDBBtn
                        type="submit"
                        className="mb-4"
                        block
                        disabled={isSubmitting}
                      >
                        Sign Up
                      </MDBBtn>
                    </Form.Group>
                  </Form>
                )}
              </Formik>
            </MDBTabsPane>
          </MDBTabsContent>
        </Modal.Body>
      </Modal>
    </div>
  );
}
