import React from "react";
import { useSelector } from "react-redux";
import "./css/style.css";

const ErrorMessage = () => {
  const [state, setState] = React.useState(false);
  const error = useSelector((state) => state.admin.error);
  if (error?.message) {
    setState(!state);
    setTimeout(() => {
      setState(!state);
    }, 100);
  }

  return state ? <div className="error">{error?.message}</div> : "";
};

export default ErrorMessage;
