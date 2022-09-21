import React from "react";
import axios from "axios";

const Login = () => {
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  const [auth, setAuth] = React.useState("");

  const handleSubmit = async (form) => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <form>
        <input type="text" placeholder="Enter username..." />
        <input type="password" placeholder="Enter password..." />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;
