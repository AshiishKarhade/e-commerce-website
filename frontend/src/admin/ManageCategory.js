import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteACategory, getAllCategories } from "./helper/adminapicall";

const ManageCategory = () => {
  const { user, token } = isAuthenticated();
  const [category, setCategory] = useState([]);

  const preLoadData = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      }
      setCategory(data);
    });
  };
  useEffect(() => {
    preLoadData();
  }, []);

  const deletingTheProduct = (categoryId) => {
    deleteACategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log("Error Occured while deleting the product");
      } else {
        preLoadData();
      }
    });
  };
  return (
    <Base title="Welcome admin" description="Manage Category here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {category.length} Categories
          </h2>

          {category.map((cat, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{cat.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${cat._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deletingTheProduct(cat._id);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};
export default ManageCategory;
