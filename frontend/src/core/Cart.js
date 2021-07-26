import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import { getAllProducts } from "./helper/coreapicalls";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadProducts = () => {
    return (
      <div>
        <h1>Products Section</h1>
        {products.map((product, index) => (
          <Card
            key={index}
            addToCart={false}
            removeFromCart={true}
            product={product}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return <h1>Checkout Section</h1>;
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Cart Page" description="Welcome to our Store">
      <div className="row">
        <div className="col-6">{loadProducts()}</div>
        <div className="col-6">
          <StripeCheckout
            products={products}
            setReload={setReload}
            reload={reload}
          />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
