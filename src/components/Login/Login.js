import React, { useState, useReducer, useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../stores/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';

const reducer = (prevState, action) => {


  return { value: action.value, isValid: action.value.includes('@') }
}

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const ctx = useContext(AuthContext);
  const [emailState, emailDispatcher] = useReducer(reducer, { value: '', isValid: null })
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const emailHandler = (event) => {
    // setEnteredEmail(event.target.value);

    emailDispatcher({ value: event.target.value });
    console.log(emailState);

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.isValid
    );
  };

  // const validateEmailHandler = () => {
  //   setEmailIsValid(emailState.isValid);
  // };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.value, enteredPassword);
    }
    else if (!emailState.isValid) {
      emailRef.current.focus();
    }
    else {
      passRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <Label
            ref={emailRef}
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailHandler}
            onBlur={emailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <Label
            ref={passRef}
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
