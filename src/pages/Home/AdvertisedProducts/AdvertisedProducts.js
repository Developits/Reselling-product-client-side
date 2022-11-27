import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";
import AdvertiseCard from "./AdvertiseCard";

const AdvertisedProducts = () => {
  const { data: advProduct = [], isLoading } = useQuery({
    queryKey: ["advertiseproduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/advertiseproduct");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    advProduct.length > 0 && (
      <>
        <div>
          <h1 className="text-2xl lg:ml-28 mt-10 font-bold">Offers</h1>
          <div className=" mx-16 grid mt-8 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {advProduct.map((advertise) => (
              <AdvertiseCard
                key={advertise._id}
                advertise={advertise}
              ></AdvertiseCard>
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default AdvertisedProducts;
