import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "./../backend";
const StripeCheckout = ({
  reload = undefined,
  setReload = (f) => f,
  products,
}) => {
  //   const token = isAuthenticated() && isAuthenticated().token;
  //   const userId = isAuthenticated() && isAuthenticated().user._id;

  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });
  const getFinalProduct = () => {
    let amount = 0;
    products.map((p) => {
      amount += p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status); // after this we can call further methods
        cartEmpty();
        setReload;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        name="Buy Now"
        stripeKey="pk_test_51IrFvZSIDFpbdB2SQZuHl67cejKwnf9Cw7v3ZS7MRG9NUPgUYk2zxabnkfjQuosl8vxXViaXrPRiyOunTfBxHtKJ00tscmZElk"
        token={makePayment(products)}
        billingAddress
        shippingAddress
        amount={getFinalProduct() * 100}
      />
    ) : (
      <Link to="/signin">
        <button className="btn btn-success">Signin</button>
      </Link>
    );
  };
  return (
    <div>
      <h2 className="text-white">StripeCheckout {getFinalProduct()}</h2>
      {showStripeButton()}
    </div>
  );
};
export default StripeCheckout;
