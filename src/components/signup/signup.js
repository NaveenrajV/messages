import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/actionCreators";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import emailIcon from "../../assets/email.svg";
import passwordIcon from "../../assets/lock.svg";
import userIcon from "../../assets/user.svg";
import classes from "./signup.module.css";

const Signup = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const formSubmitHandler = event => {
    event.preventDefault();
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (regex.test(password)) {
      props.register(name, email, password, props.history);
      setError(false);
    } else {
      setError(true);
    }
  };

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
          {error ? (
            <div className={classes.error}>
              Password must contain atleast one symbol,number,char
            </div>
          ) : null}
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
    dispatch(register(name, email, password, history))
});
const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
