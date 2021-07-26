import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const loadAllProducts = () => {
    getAllProducts().then((data) => {
      // console.log("ERRORSSSSSSS->>>", data?.error);
      if (data?.error) {
        setError(data.error);
      } else {
        // console.log("PRODUCTSSSSSS", data);
        setProducts(data);
      }
    });
  };
  useEffect(() => {
    loadAllProducts();
  }, []);
  return (
    <Base title="Home Page" description="Welcome to our Store">
      <div className="row text-center">
        <h1 className="text-white">All the Products</h1>
        <div className="row">
          {products.map((product, index) => (
            <div key={index} className="col-4 mb-4">
              {console.log("Testing Index", index)}
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
}
