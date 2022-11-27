import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { _id, img, name } = category;
  const navigate = useNavigate();

  const handleCategory = () => {
    navigate(`/category/${_id}`);
  };

  return (
    <div>
      <div
        onClick={handleCategory}
        className="card  lg:m-12 flex items-end bg-base-100 shadow-xl image-full"
      >
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

export default CategoryCard;
