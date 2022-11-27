import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductCard from "./ProductCard";
import BookingModal from "./BookingModal";

const Products = () => {
  const [modalData, setModalData] = useState(null);
  const products = useLoaderData();
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
          modalData={modalData}
          setModalData={setModalData}
        ></BookingModal>
      )}
    </div>
  );
};

export default Products;
