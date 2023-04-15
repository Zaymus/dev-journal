import React from "react";
import LoginForm from "../components/Forms/LoginForm";

const Login = (props) => {
  return (
    <LoginForm onLogin={props.onLogin}/>
  );
}

export default Login;