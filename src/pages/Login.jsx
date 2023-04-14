import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const Login = (props) => {
  return (
    <LoginForm onLogin={props.onLogin}/>
  );
}

export default Login;