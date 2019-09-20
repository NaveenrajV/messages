import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import { login, register, AUTH_SUCCESS } from "../../actions/actions";
import Spinner from "./Spinner";
import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/lock.svg";
import userIcon from "../../assets/user.svg";
const Login = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (isLogin) {
      props.authLogin(email, password);
    } else {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      const pwd = document.querySelector("#password").value;
      if (regex.test(pwd)) {
        props.register(name, email, password);
        setTimeout(() => {
          setIsLogin(true);
          reset();
        }, 2000);
      } else {
        document.querySelector(".password").style.display = "block";
      }
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
        <div className={classes.title}>{isLogin ? "LOGIN" : "REGISTER"}</div>
        {isLogin ? null : (
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
        )}
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
        {isLogin ? null : (
          <center>
            <div
              className={[classes.error, "password"].join(" ")}
              style={{ fontSize: "12px", fontWeight: "bold", display: "none" }}
            >
              Password must contain atleast one symbol,number,char
            </div>
          </center>
        )}

        {isLogin ? (
          <>
            {props.loginStatus === "error" ? (
              <center>
                <div className={classes.error}>Invalid credentials</div>
              </center>
            ) : null}
            <button>Login</button>
            <p className={classes.register}>
              Not registered ?
              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  margin: "0 5px"
                }}
                onClick={() => {
                  setIsLogin(false);
                  reset();
                }}
              >
                Create an account
              </span>
            </p>
          </>
        ) : (
          <>
            <button>Register</button>
            <p className={classes.register}>
              Already have an account?
              <span
                style={{
                  fontWeight: "bold",
                  cursor: "pointer",
                  margin: "0 5px"
                }}
                onClick={() => {
                  setIsLogin(true);
                  reset();
                }}
              >
                Login here
              </span>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  authLogin: (email, password) => dispatch(login(email, password)),
  register: (name, email, password) =>
    dispatch(register(name, email, password)),
  logged: data => dispatch({ type: AUTH_SUCCESS, data: data })
});
const mapStateToProps = state => ({
  loading: state.loading,
  loginStatus: state.loginStatus
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
