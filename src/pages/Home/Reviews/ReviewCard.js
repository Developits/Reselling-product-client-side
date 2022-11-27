import React from "react";
import { FaStar } from "react-icons/fa";
import ReviewModal from "./ReviewModal";

const ReviewCard = ({ card }) => {
  const { img, location, name, description } = card;
  return (
    <div className="card lg:m-8 bg-base-300 shadow-xl">
      <div className="card-body">
        <div className="flex  justify-between items-center">
          <div>
            <h1 className="card-title">{name}</h1>
            <span>{location}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-16 rounded-full">
                <img src={img} alt="" />
              </div>
            </div>
            <p className="flex">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </p>
          </div>
        </div>
        <div>
          {description.length > 70 ? (
            <>
              {description.slice(0, 70) + "..."}
              <label htmlFor="my-modal-3">
                <span className="text-blue-400">read more</span>
              </label>
              {<ReviewModal card={card}></ReviewModal>}
            </>
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
