import React from "react";
import { useSelector, useDispatch } from "react-redux";

//BOOTSTRAP
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

//TOAST
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//ACTIONS
import { setFormMethod, addUser, editUser } from "../../reducers/adminReducer";

//HELPERS
import { checkUsername, checkEmail } from "./helperFuncs";

function UserForm() {
  const dispatch = useDispatch();
  const { formMethod, user } = useSelector((state) => state.admin);
  const [form, setForm] = React.useState({
    fName: "",
    lName: "",
    username: "",
    password: "",
    email: "",
    isAdmin: "",
  });

  const inputUnavailable = (str) =>
    toast.error(str, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });

  const inputAvailable = () =>
    toast.success("Success!", {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 2000,
    });

  const renderForm = (sel) => {
    switch (sel) {
      case "add":
        setForm({
          fName: "",
          lName: "",
          username: "",
          password: "",
          email: "",
          isAdmin: "",
        });
        return;
      case "edit":
        setForm({
          fName: user.fName,
          lName: user.lName,
          username: user.username,
          password: "",
          email: user.email,
          isAdmin: user.isAdmin,
        });
        return;
      default:
        return;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const nameAvailability = await checkUsername(evt.target[2].value);
    const emailAvailability = await checkEmail(evt.target[4].value);
    let isAdmin = evt.target[5].value;
    if (!isAdmin) {
      if (isAdmin === "") {
        inputUnavailable("Please select user privilege");
        return;
      }
    }
    isAdmin === "true" ? (isAdmin = true) : (isAdmin = false);

    if (user.username !== form.username && !nameAvailability) {
      inputUnavailable("Username is already in use.");
      return;
    }
    if (user.email !== form.email && !emailAvailability) {
      inputUnavailable("Email is already in use");
      return;
    }

    inputAvailable();
    switch (formMethod) {
      case "add":
        dispatch(addUser({ ...form, isAdmin }));
        setForm({
          fName: "",
          lName: "",
          username: "",
          password: "",
          email: "",
          isAdmin: "",
        });
        dispatch(setFormMethod(""));
        return;
      case "edit":
        dispatch(editUser(user.id, { ...form, isAdmin }));
        setForm({
          fName: "",
          lName: "",
          username: "",
          password: "",
          email: "",
          isAdmin: "",
        });
        dispatch(setFormMethod(""));
        return;
      default:
        return;
    }
  };

  React.useEffect(() => {
    renderForm(formMethod);
  }, [formMethod]);

  return (
    <Form className="adminForm" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <label htmlFor="first-name">First Name</label>
          <Form.Control
            required
            type="text"
            onChange={(evt) => setForm({ ...form, fName: evt.target.value })}
            placeholder="Enter First Name"
            value={form.fName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="last-name">Last Name</label>
          <Form.Control
            required
            type="text"
            onChange={(evt) => setForm({ ...form, lName: evt.target.value })}
            placeholder="Enter Last Name"
            value={form.lName}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="username">Username</label>
          <small htmlFor="username"> </small>
          <Form.Control
            required
            type="text"
            onChange={(evt) => {
              setForm({ ...form, username: evt.target.value });
            }}
            placeholder="Enter Username"
            value={form.username}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="password">Password</label>
          {formMethod === "edit" ? (
            <Form.Control
              type="password"
              onChange={(evt) =>
                setForm({ ...form, password: evt.target.value })
              }
              placeholder="Enter Password"
              value={form.password}
            />
          ) : (
            <Form.Control
              required
              type="text"
              onChange={(evt) =>
                setForm({ ...form, password: evt.target.value })
              }
              placeholder="Enter Password"
              value={form.password}
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="email">Email</label>
          <Form.Control
            required
            type="email"
            onChange={(evt) => {
              setForm({ ...form, email: evt.target.value.toLowerCase() });
            }}
            placeholder="Enter Email Address"
            value={form.email}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label htmlFor="privileges">Admin Privileges</label>
          <Form.Select size="sm">
            <option value={""}>Select Privileges</option>
            <option value={false}>User</option>
            <option value={true}>Administrator</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Button type="submit" variant="outline-success">
          Submit
        </Button>

        <Button
          onClick={() => dispatch(setFormMethod(""))}
          type="reset"
          variant="outline-success"
        >
          Cancel
        </Button>
      </Row>
    </Form>
  );
}

export default UserForm;
