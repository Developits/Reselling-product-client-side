import React from "react";

const AdvertiseCard = ({ advertise }) => {
  const { img, name } = advertise;

  return (
    <div>
      <div className="card  lg:m-12 flex items-end bg-base-100 shadow-xl image-full">
        <figure>
          <img src={img} alt="Category" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{name}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseCard;
