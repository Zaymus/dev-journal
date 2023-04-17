import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from './form.module.css';

const RegisterForm = (props) => {
  const [state, setState] = useState({
    enteredEmail: '',
    emailIsValid: null,
    enteredPassword: '',
    passwordIsValid: null,
    enteredConfPassword: '',
    passwordsMatch: true,
    formIsValid: false,
  });


  useEffect(() => {
    const identifier = setTimeout(() => {
      const isValid = state.enteredEmail.includes('@') && state.enteredPassword.trim().length > 6 && state.passwordsMatch && state.enteredConfPassword.trim().length > 6
      setState((prevState) => {
        return {
          ...prevState,
          formIsValid: isValid,
        }
      })
    }, 500);

    return () => {
      clearTimeout(identifier);
    }
  }, [state]);

  const emailChangeHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        enteredEmail: event.target.value,
      }
    });
  };

  const passwordChangeHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        enteredPassword: event.target.value,
      }
    });
  };

  const confPasswordChangeHandler = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        enteredConfPassword: event.target.value,
        passwordsMatch: state.enteredPassword === event.target.value,
      }
    });
  }

  const validateEmailHandler = () => {
    setState((prevState) => {
      return {
        ...prevState,
        emailIsValid: state.enteredEmail.includes('@'),
      }
    });
  };

  const validatePasswordHandler = () => {
    setState((prevState) => {
      return {
        ...prevState,
        passwordIsValid: state.enteredPassword.trim().length > 6,
        passwordsMatch: state.enteredPassword === state.enteredConfPassword,
      }
    })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onRegister({ email: state.enteredEmail, password: state.enteredPassword });
  };

  return (
    <div className={classes.container}>
      <Card className={classes.form}>
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${state.emailIsValid === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={state.enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${state.passwordIsValid === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={state.enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
            <span>Password must be between 6 and 16 characters, contain an uppercase letter, a number, and a symbol</span>
          </div>
          <div
            className={`${classes.control} ${state.passwordsMatch === false ? classes.invalid : ''
              }`}
          >
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={state.enteredConfPassword}
              onChange={confPasswordChangeHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!state.formIsValid}>
              Register
            </Button>
          </div>
        </form>
        <div className={classes.formlinks}>
          <Link className={classes.link} to='/login' >Already have an account?</Link>
        </div>
      </Card>
    </div>
  )
}

export default RegisterForm;