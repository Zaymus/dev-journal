import React from "react";
import RegisterForm from "../components/Forms/RegisterForm";

const Register = (props) => {
  return (
    <RegisterForm onRegister={props.onRegister}/>
  );
}

export default Register;