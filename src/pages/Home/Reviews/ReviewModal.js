import React from "react";

const ReviewModal = ({ card }) => {
  const { img, location, name, description } = card;
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
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
                <p>*****</p>
              </div>
            </div>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
