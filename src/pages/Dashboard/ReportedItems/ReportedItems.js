import React from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../Shared/Loader/Loader";

const ReportedItems = () => {
  const {
    data: reportedProduct = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedproduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/reportedproduct");
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Product deleted successfully`);
        }
      });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  return (
    <div className="m-2">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product name</th>
              <th>Seller name</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {reportedProduct.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <td>{product.productname}</td>
                <td>{product.sellername}</td>

                <td>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="btn btn-xs btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportedItems;
