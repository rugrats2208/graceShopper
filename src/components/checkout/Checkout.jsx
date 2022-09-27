import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  getOrders,
  deleteOrderItem,
  changeQty,
} from "../../reducers/orders/ordersReducer";
import styles from "./form-validation.module.css";

//country and state data for form fill
import { Country, State, City } from "country-state-city";
const countries = Country.getAllCountries();
const states = State.getStatesOfCountry("US");

//define the Yup validation schema for checkout
const CheckoutSchema = Yup.object().shape({
  fName: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lName: Yup.string()
    .trim()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  username: Yup.string()
    .trim()
    .min(5, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  email: Yup.string().trim().email("Invalid email").required("Required"),
  address: Yup.string().trim().required("Required"),
  address2: Yup.string().trim().max(20, "Too long!"),
  country: Yup.string().trim().required("Required"),
  state: Yup.string().trim().required("Required"),
  zip: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, "Must be exactly 5 digits")
    .max(5, "Must be exactly 5 digits"),
});

export default function Checkout() {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //grab our user data
  const userData = useSelector((state) => state.auth);

  //return only the active order lineItems or empty array
  const activeOrder = useSelector((state) =>
    state.orders.find((order) => !order.complete)
  ) || { lineItems: [] };
  const { lineItems } = activeOrder;

  //set all the orders when user logs in
  useEffect(() => {
    dispatch(getOrders(userData.id));
  }, [userData.id]);

  //set total price when lineItems changes
  useEffect(() => {
    setTotal(
      lineItems.reduce((agg, item) => agg + item.product.price * item.qty, 0)
    );
  }, [lineItems]);

  return (
    <div className={styles.container_checkout}>
      {/* HEADER */}
      <div className="py-5 text-center">
        <h2>Checkout</h2>
        <p className="lead">
          Thank you for shopping at Grace Shopper Records! Please review your
          order before submitting.
        </p>
      </div>
      {/* CART */}
      <div className="row g-3">
        <div className="col-md-10 col-lg-10">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">
              {lineItems.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {lineItems.map((item) => {
              return (
                <li
                  key={item.product.id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div>
                    <h6 className="my-0">{item.product.name}</h6>
                    <small className="text-muted">
                      {item.product.artist.name}
                    </small>
                  </div>

                  <div className="d-flex justify-content-flex-end align-items-center">
                    <div className="text-muted mx-4">
                      <ButtonGroup size="sm">
                        <Button
                          onClick={() =>
                            dispatch(changeQty(item.id, item.qty - 1))
                          }
                        >
                          -
                        </Button>

                        <Button disabled>{item.qty}</Button>

                        <Button
                          onClick={() =>
                            dispatch(changeQty(item.id, item.qty + 1))
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                    <span className="text-muted">
                      ${item.product.price / 100}
                    </span>
                    <span
                      className={styles.trashcan}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${item.product.name}" from your cart?`
                          )
                        )
                          dispatch(deleteOrderItem(item.id));
                      }}
                    >
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </span>
                  </div>
                </li>
              );
            })}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${total / 100}</strong>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-4" />
      {/* FORM */}
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <div className="row g-3">
          <Formik
            initialValues={{
              username: "",
              email: "",
              fName: "",
              lName: "",
              address: "",
              address2: "",
              country: "",
              state: "",
              zip: "",
            }}
            validationSchema={CheckoutSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              //using Yup to cast the validated inputs so we can send that to the db
              const castValues = SignupSchema.cast(values);

              resetForm();
              setSubmitting(false);
              props.onHide();
              navigate("/");
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
              <div className="row g-3">
                <Form onSubmit={handleSubmit}>
                  {/* first name */}
                  <div className="col-sm-8">
                    <label htmlFor="fName" className="form-label">
                      First name
                    </label>
                    <Form.Group controlId="formFirstName" className="mb-4">
                      <Form.Control
                        type="text"
                        name="fName"
                        placeholder="first name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fName}
                        className={
                          touched.firstName && errors.firstName ? "error" : null
                        }
                      />
                      {errors.fName && touched.fName ? (
                        <div className="error-message">{errors.fName}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* last name */}
                  <div className="col-sm-8">
                    <label htmlFor="lName" className="form-label">
                      Last name
                    </label>
                    <Form.Group controlId="formLastName" className="mb-4">
                      <Form.Control
                        type="text"
                        name="lName"
                        placeholder="last name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lName}
                        className={
                          touched.lName && errors.lName ? "error" : null
                        }
                      />
                      {errors.lName && touched.lName ? (
                        <div className="error-message">{errors.lName}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* email */}
                  <div className="col-sm-8">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <Form.Group controlId="formEmail" className="mb-4">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className={
                          touched.email && errors.email ? "error" : null
                        }
                      />
                      {errors.email && touched.email ? (
                        <div className="error-message">{errors.email}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* username */}
                  <div className="col-sm-8">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <Form.Group
                      controlId="formUsernameRegister"
                      className="mb-4"
                    >
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        autoComplete="username"
                        className={
                          touched.username && errors.username ? "error" : null
                        }
                      />
                      {errors.username && touched.username ? (
                        <div className="error-message">{errors.username}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* address */}
                  <div className="col-sm-8">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <Form.Group
                      controlId="formAddressRegister"
                      className="mb-4"
                    >
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="123 Main St"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className={
                          touched.address && errors.address ? "error" : null
                        }
                      />
                      {errors.address && touched.address ? (
                        <div className="error-message">{errors.address}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* address2 */}
                  <div className="col-sm-8">
                    <label htmlFor="address2" className="form-label">
                      Address 2 (Optional)
                    </label>
                    <Form.Group
                      controlId="formAddress2Register"
                      className="mb-4"
                    >
                      <Form.Control
                        type="text"
                        name="address2"
                        placeholder="Apartment or suite"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address2}
                        className={
                          touched.address2 && errors.address2 ? "error" : null
                        }
                      />
                      {errors.address2 && touched.address2 ? (
                        <div className="error-message">{errors.address2}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* country */}
                  <div className="col-md-4">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <Form.Group
                      controlId="formCountry"
                      className="mt-2 mb-2 ms-2"
                    >
                      <Form.Select
                        name="country"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        className={
                          touched.country && errors.country ? "error" : null
                        }
                      >
                        <option value={0}>Choose a country</option>
                        {countries?.map((country) => (
                          <option
                            key={country.isoCode}
                            value={country.countryCode}
                          >
                            {country.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.country && touched.country ? (
                        <div className="error-message">{errors.country}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* state */}
                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <Form.Group
                      controlId="formState"
                      className="mt-2 mb-2 ms-2"
                    >
                      <Form.Select
                        name="state"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.state}
                        className={
                          touched.state && errors.state ? "error" : null
                        }
                      >
                        <option value={0}>Choose a state</option>
                        {states?.map((state) => (
                          <option key={state.isoCode} value={state.stateCode}>
                            {state.name}
                          </option>
                        ))}
                      </Form.Select>
                      {errors.state && touched.state ? (
                        <div className="error-message">{errors.state}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* zip */}
                  <div className="col-md-4">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <Form.Group controlId="formFirstName" className="mb-4">
                      <Form.Control
                        type="number"
                        name="zip"
                        placeholder="10036"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.zip}
                        className={touched.zip && errors.zip ? "error" : null}
                      />
                      {errors.zip && touched.zip ? (
                        <div className="error-message">{errors.zip}</div>
                      ) : null}
                    </Form.Group>
                  </div>
                  {/* checkboxes */}
                  <div className="col-md-7 col-lg-8">
                    <hr className="my-4" />

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="same-address"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="same-address"
                      >
                        Shipping address is the same as my billing address
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="save-info"
                      />
                      <label className="form-check-label" htmlFor="save-info">
                        Save this information for next time
                      </label>
                    </div>
                  </div>
                  {/* buttons */}
                  <hr className="my-4" />
                  <Form.Group controlId="submit" className="col-12">
                    <MDBBtn
                      type="submit"
                      className="mb-4"
                      block
                      disabled={isSubmitting}
                    >
                      CONTINUE TO CHECKOUT
                    </MDBBtn>
                  </Form.Group>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>

      {/* <footer className="my-5 pt-5 text-muted text-center text-small">
        <p className="mb-1">&copy; 2017–2022 Grace shopper Records Ltd.</p>
        <ul className="list-inline">
          <li className="list-inline-item">
            <a href="#">Privacy</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Terms</a>
          </li>
          <li className="list-inline-item">
            <a href="#">Support</a>
          </li>
        </ul>
      </footer> */}
    </div>
  );
}
