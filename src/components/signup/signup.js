import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { register, AUTH_SUCCESS } from "../../actions/actions";
import Spinner from "../Spinner/Spinner";
import classes from "./signup.module.css";
import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/lock.svg";
import userIcon from "../../assets/user.svg";
import { Link } from "react-router-dom";

const Signup = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const formSubmitHandler = event => {
    event.preventDefault();
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const pwd = document.querySelector("#password").value;
    if (regex.test(pwd)) {
      const history = props.history;
      props.register(name, email, password, history);
    } else {
      document.querySelector(".password").style.display = "block";
    }
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
        <div className={classes.title}>REGISTER</div>

        <div className={classes.text}>
          <input
            autoFocus={true}
            autoComplete="off"
            type="text"
            className={classes.input}
            placeholder="Username"
            name="username"
            value={name}
            onChange={e => setName(e.target.value.trim())}
            required
          />
          <div className={classes.icon}>
            <img src={userIcon} alt="" />
          </div>
        </div>
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

        <center>
          <div
            className={[classes.error, "password"].join(" ")}
            style={{ fontSize: "12px", fontWeight: "bold", display: "none" }}
          >
            Password must contain atleast one symbol,number,char
          </div>
        </center>

        <>
          <button>Register</button>
          <p className={classes.register}>
            Already have an account?
            <Link to="/">
              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  margin: "0 5px"
                }}
              >
                Login here
              </span>
            </Link>
          </p>
        </>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  register: (name, email, password, history) =>
    dispatch(register(name, email, password, history)),
  logged: data => dispatch({ type: AUTH_SUCCESS, data: data })
});
const mapStateToProps = state => ({
  loading: state.loading,
  loginStatus: state.loginStatus
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
