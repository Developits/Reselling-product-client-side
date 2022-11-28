import React from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "./ReviewCard";
import Loader from "../../Shared/Loader/Loader";

const InfoCards = () => {
  const { data: reviewsData = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await fetch("https://salvage-yard-server.vercel.app/reviews");
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div>
      <h1 className="text-2xl lg:ml-28 mt-10 font-bold">Customer Reviews</h1>
      <div className=" mx-16 grid my-8 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviewsData.map((card, i) => (
          <ReviewCard key={i} card={card}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default InfoCards;
