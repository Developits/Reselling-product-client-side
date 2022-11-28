import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../Shared/Loader/Loader";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const today = new Date(),
    date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await fetch(
        "https://salvage-yard-server.vercel.app/category"
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleAddProduct = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const product = {
            categoryid: data.categoryid,
            productname: data.productname,
            img: imgData.data.url,
            sellername: user.displayName,
            location: data.location,
            resellingprice: data.resellingprice,
            originalprice: data.originalprice,
            usedtime: data.usedtime,
            date: date,
            status: "available",
          };

          fetch("https://salvage-yard-server.vercel.app/products", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged === true) {
                reset();
                toast.success("Product is added successfully");
                navigate("/dashboard/myproducts");
              }
            });
        }
      });
  };
  return (
    <div className="m-2">
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="grid mt-4 grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="product name"
              {...register("productname", {
                required: "product name is Required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="location"
              {...register("location", {
                required: "location is Required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="original price"
              {...register("originalprice", {
                required: "original price is Required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="reselling price"
              {...register("resellingprice", {
                required: "reselling price is Required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="used time"
              {...register("usedtime", {
                required: "used time is Required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Product Condition"
              {...register("condition", {
                required: "Product condition is Required",
              })}
              className="input input-bordered w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <input
              type="file"
              {...register("img", {
                // required: "Photo is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
          </div>
          <select
            {...register("categoryid")}
            className="select input-bordered w-full max-w-xs"
          >
            {categories.map((category, i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <input className="btn mt-4" type="submit" value="Place Your Order" />
      </form>
    </div>
  );
};

export default AddProduct;
