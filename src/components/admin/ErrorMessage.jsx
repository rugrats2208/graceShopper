import React from "react";
import { useSelector } from "react-redux";
import "./css/style.css";

const ErrorMessage = () => {
  const error = useSelector((state) => state.admin.error);
  return <div className="formError">{error?.message}</div>;
};

export default ErrorMessage;
