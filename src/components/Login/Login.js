import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login, register, AUTH_SUCCESS } from "../../actions/actions";
import Spinner from "../Spinner/Spinner";
import classes from "./Login.module.css";
import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/lock.svg";
import { Link } from "react-router-dom";

const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = event => {
    event.preventDefault();
    const history = props.history;
    props.authLogin(email, password, history);
  };
  /*eslint-disable */

  useEffect(() => {
    if (localStorage.getItem("isLogged")) {
      const data = JSON.parse(localStorage.getItem("data"));
      props.logged(data);
    }
  }, []);

  /*eslint-enable */
  return props.loading ? (
    <Spinner />
  ) : (
    <div className={classes.page}>
      <form
        className={classes.Login}
        onSubmit={event => formSubmitHandler(event)}
      >
        <div className={classes.title}> LOGIN</div>
        <div className={classes.text}>
          <input
            className={classes.input}
            autoFocus={true}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value.trim())}
            required
          />
          <div className={classes.icon}>
            <img src={emailIcon} alt="" />
          </div>
        </div>
        <div className={classes.text}>
          <input
            className={classes.input}
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className={classes.icon}>
            <img src={passwordIcon} alt="" />
          </div>
        </div>

        <>
          {props.loginStatus === "error" ? (
            <center>
              <div className={classes.error}>Invalid credentials</div>
            </center>
          ) : null}
          <button>Login</button>
          <p className={classes.register}>
            Not registered ?
            <Link to="/signup">
              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  margin: "0 5px"
                }}
              >
                Create an account
              </span>
            </Link>
          </p>
        </>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  authLogin: (email, password, history) =>
    dispatch(login(email, password, history)),
  register: (name, email, password) =>
    dispatch(register(name, email, password)),
  logged: data => dispatch({ type: AUTH_SUCCESS, data: data })
});
const mapStateToProps = state => ({
  loading: state.loading,
  loginStatus: state.loginStatus,
  isLogged: state.isLogged
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
