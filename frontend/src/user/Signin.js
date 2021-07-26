import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";

import { signin, authenticate, isAuthenticated, isAdmin } from "../auth/helper";
const Signin = () => {
  const [values, setValues] = useState({
    email: "ironman@mail.com",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, error, password, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("Signin failed"));
  };

  const onHandleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) return <Redirect to="/admin/dashboard" />;
      else return <Redirect to="/user/dashboard" />;
    }

    // this line of code is used to protect the user to go to Admin
    if (isAuthenticated()) {
      console.log("Came here");
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-2  offset-sm-4 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  const SigninForm = () => {
    return (
      <div className="row">
        <div className="col-md-4 offset-sm-4 text-left">
          <form>
            <div className="form-group  py-3">
              <label className="text-light">Email</label>
              <input
                value={email}
                onChange={onHandleChange("email")}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group py-3">
              <label className="text-light">Password</label>
              <input
                value={password}
                onChange={onHandleChange("password")}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  return (
    <Base title="Signin page" description="Signin page!">
      {loadingMessage()}
      {errorMessage()}
      {SigninForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;
