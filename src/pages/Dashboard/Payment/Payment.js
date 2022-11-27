import React from "react";
import { useLoaderData } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.React_APP_STRIPE_PK);

const Payment = () => {
  const booked = useLoaderData();
  const { productname, resellingprice } = booked;
  return (
    <div>
      <h3 className="text-3xl">Payment for {productname}</h3>
      <p className="text-xl">
        Please pay <strong>${resellingprice}</strong> for this product.
      </p>
      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckOutForm booked={booked}></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
