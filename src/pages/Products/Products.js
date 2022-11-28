import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Shared/Loader/Loader";
import ProductCard from "./ProductCard";
import BookingModal from "./BookingModal";

const Products = () => {
  const [modalData, setModalData] = useState(null);
  const idLoader = useLoaderData();
  const id = idLoader.props.params.id;
  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(
        `https://salvage-yard-server.vercel.app/products/${id}`
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
      <div className="mx-16 grid my-8 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            setModalData={setModalData}
            product={product}
          ></ProductCard>
        ))}
      </div>
      {modalData && (
        <BookingModal
          refetch={refetch}
          modalData={modalData}
          setModalData={setModalData}
        ></BookingModal>
      )}
    </div>
  );
};

export default Products;
