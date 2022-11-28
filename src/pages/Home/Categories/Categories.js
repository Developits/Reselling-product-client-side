import React from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryCard from "./CategoryCard";
import Loader from "../../Shared/Loader/Loader";

const Categories = () => {
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
  return (
    <div>
      <h1 className="text-2xl lg:ml-28 mt-10 font-bold">Categories to Buy</h1>
      <div className=" mx-16 grid mt-8 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category}></CategoryCard>
        ))}
      </div>
    </div>
  );
};

export default Categories;
