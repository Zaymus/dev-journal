import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from './form.module.css';

const LoginForm = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    }, 500);

    return () => {
      clearTimeout(identifier);
    }
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin({ email: enteredEmail, password: enteredPassword });
  };

  return (
    <div className={classes.container}>
      <Card className={classes.form}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!formIsValid}>
              Login
            </Button>
          </div>
        </form>
        <div className={classes.formlinks}>
          <Link className={classes.link} to='/forgot-password' >Forgot Password?</Link>
          <Link className={classes.link} to='/register' >Don't have an account?</Link>
        </div>
      </Card>
    </div>
  )
}

export default LoginForm;