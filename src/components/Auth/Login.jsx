import React from "react";

const Login = () => {
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
