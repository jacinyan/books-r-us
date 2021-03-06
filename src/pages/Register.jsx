import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { register } from "../redux/actions/userActions";

import Loader from "../components/Loader";

const Register = ({ history, location }) => {
  const dispatch = useDispatch();
  
  const userRegister = useSelector((state) => state.userRegister);
  const { loading } = userRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "";

  useEffect(() => {
    if (userInfo) {
      history.push(`/${redirect}`);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register(username, email, password));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="hero is-primary is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container is-max-desktop has-text-centered">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <h3 className="title has-text-white">Welcome to BooksRUS</h3>
                  <hr className="login-hr" />
                  <p className="subtitle has-text-white">
                    Pick your fav books today!
                  </p>
                  <div className="box has-shadow">
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input "
                            type="text"
                            placeholder="Username"
                            autoFocus=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            autoFocus=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input "
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                      </div>
                      <button className="button is-rounded is-block is-primary is-fullwidth is-rounded">
                        <strong>Sign Up</strong>
                      </button>
                    </form>
                  </div>
                  <p>
                    Have an account?{"  "}
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : "/login"}
                      className="has-text-white"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
