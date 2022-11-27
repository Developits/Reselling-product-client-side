import React from "react";

const AdvertiseCard = ({ advertise }) => {
  const { img, productname } = advertise;

  return (
    <div className="text-center">
      <div className="card  lg:m-12 flex items-end bg-base-100 shadow-xl image-full">
        <figure>
          <img src={img} alt="Category" />
        </figure>
      </div>
      <h1 className="-mt-6 text-red-600 text-lg font-bold">{productname}</h1>
    </div>
  );
};

export default AdvertiseCard;
