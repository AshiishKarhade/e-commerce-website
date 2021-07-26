import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  getAllCategories,
  getAProduct,
  updateAProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  // match is provided by the React to extract the things from the URL
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    description: "",
    price: "",
    stock: "",
    name: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    description,
    price,
    stock,
    name,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  // const getAProductId = () => {
  //   getAProduct();
  // };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, getaRedirect: true });

    updateAProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            getaRedirect: false,
            createdProduct: values.name,
          });
          console.log("VALUES----->", values);
        }
      }
    );
  };

  const successMessage = () => (
    <div
      className="alert alert-success"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h4>{createdProduct} Updated Successfully</h4>
    </div>
  );
  const redirectingTo = () => {
    setTimeout(() => {
      <Redirect
        to={{
          pathname: "/admin/dashboard",
        }}
      />;
    }, 2000);
  };
  const warningMessage = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      <h4> Problem with {createdProduct}, product is not created </h4>
    </div>
  );

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;

    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };
  const preLoadCategories = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ categories: data, formData: new FormData() });
      }
    });
  };
  const preloadData = (productId) => {
    getAProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preLoadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
      }
    });
  };
  useEffect(() => {
    // console.log("MATCH", match);
    // console.log("productID", match.params.productId);
    preloadData(match.params.productId);
  }, []);

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group mt-3 ">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mt-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mt-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mt-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mt-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {/* {categories &&
            categories.map((cate) => (
              <option key={cate._id}>{cate.name}</option>
            ))} */}
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mt-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mt-3 mb-3"
      >
        Update Product
      </button>
    </form>
  );
  return (
    <Base
      title="Update a Product here!"
      description="Welcome to product Updation Section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {createProductForm()}
          {getaRedirect ? redirectingTo() : ""}
        </div>
      </div>
    </Base>
  );
};
export default UpdateProduct;
