import React, { useState } from 'react';
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { authenticate, logout } from '../../reducers/Auth/authReducer';

const Signup = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState('');

  const [formValue, setFormValue] = useState({
    fname: 'Mark',
    lname: 'Otto',
    email: '',
    city: '',
    state: '',
    zip: '',
  });

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(authenticate(userName, password, 'signup', email, fName, lName));
  }

  return (
    <MDBValidation className='row g-3'>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.fName}
          name='fName'
          onChange={onChange}
          id='validationCustom01'
          required
          label='First name'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.lName}
          name='lName'
          onChange={onChange}
          id='validationCustom02'
          required
          label='Last name'
        />
      </MDBValidationItem>
      <MDBValidationItem
        feedback='Please choose a username.'
        invalid
        className='col-md-4'
      >
        <MDBInputGroup textBefore='@'>
          <input
            value={formValue.username}
            name='username'
            type='text'
            className='form-control'
            id='validationCustomUsername'
            placeholder='Username'
            required
          />
        </MDBInputGroup>
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.email}
          name='email'
          onChange={onChange}
          id='validationCustom03'
          required
          label='email'
        />
      </MDBValidationItem>
      <MDBValidationItem className='col-md-4'>
        <MDBInput
          value={formValue.password}
          name='password'
          onChange={onChange}
          id='validationCustom04'
          required
          label='password'
        />
      </MDBValidationItem>
      <MDBValidationItem
        className='col-12'
        feedback='You must agree before submitting.'
        invalid
      >
        <MDBCheckbox
          label='Agree to terms and conditions'
          id='invalidCheck'
          required
        />
      </MDBValidationItem>
      <div className='col-12'>
        <MDBBtn type='submit'>Submit form</MDBBtn>
        <MDBBtn type='reset'>Reset form</MDBBtn>
      </div>
    </MDBValidation>
  );
};

export default Signup;
