import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { user, token } = isAuthenticated();

  const adminHome = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
    </div>
  );
  const onHandleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const successMessage = () => {
    if (success) {
      return (
        <div className="bg-success mt-3 p-2 rounded text-center">
          <h4 className="text-white">Category Created Successfully</h4>
        </div>
      );
    }
  };
  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create Category</h4>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    console.log("Came Here");
    createCategory(user._id, token, { name }).then((data) => {
      if (data.errors) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          className="form-control my-3"
          type="text"
          autoFocus
          value={name}
          onChange={onHandleChange}
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Add Category"
      description="Add the type of category you want"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()} {adminHome()}
        </div>
      </div>
    </Base>
  );
};
export default AddCategory;
