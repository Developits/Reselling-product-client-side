import React, { useContext } from "react";
import { FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthContext";
import Loader from "../Shared/Loader/Loader";

const ProductCard = ({ product, setModalData }) => {
  const { user } = useContext(AuthContext);
  const {
    _id,
    img,
    productname,
    location,
    sellername,
    resellingprice,
    originalprice,
    usedtime,
    date,
  } = product;

  const { data: currentUser = [], isLoading } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users?email=${user.email}`
      );
      const data = await res.json();
      return data;
    },
  });

  const { data: sellerData = [] } = useQuery({
    queryKey: ["users", sellername],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/sellerdata?name=${sellername}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handelReportItem = () => {
    fetch(`http://localhost:5000/reportproduct/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Product reported Successfully.");
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={img} alt="" />
      </figure>
      <div className="p-4 ">
        <h2 className="text-2xl text-center font-bold">{productname}</h2>
        <div className="flex mb-4 justify-end">
          <button onClick={handelReportItem}>
            <FaExclamationTriangle />
          </button>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <div>
              Original price:
              <span className="text-orange-400 font-bold">
                {" "}
                {originalprice}
              </span>
              ৳
            </div>
            <div>Use time: {usedtime} years</div>
            <div>Location: {location}</div>
          </div>
          <div>
            <div>
              Reselling price:
              <span className="text-red-600 font-bold"> {resellingprice}</span>৳
            </div>
            <div>Post time: {date}</div>
            <div>
              Seller Name:
              <div className="indicator">
                <span className="indicator-item indicator-top indicator-end rounded-full badge-success">
                  {sellerData.verified && <FiCheckCircle />}
                </span>
                <div>{sellername}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {currentUser.accountType === "buyer" ? (
        <>
          <label
            htmlFor="booking-modal"
            className="btn btn-primary"
            onClick={() => setModalData(product)}
          >
            Book now
          </label>
        </>
      ) : (
        <>
          <label className="btn btn-disabled btn-primary">Book now</label>
        </>
      )}
    </div>
  );
};

export default ProductCard;
