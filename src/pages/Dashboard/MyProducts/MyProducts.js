import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../Shared/Loader/Loader";

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const {
    data: myproducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user.displayName],
    queryFn: async () => {
      const res = await fetch(
        `https://salvage-yard-server.vercel.app/products?user=${user.displayName}`
      );
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteProduct = (id) => {
    fetch(`https://salvage-yard-server.vercel.app/products/${id}`, {
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

  const handleAdvertiseProduct = (id) => {
    fetch(`https://salvage-yard-server.vercel.app/productsadvertise/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
          toast.success("This Product will be advertised.");
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
              <th>Product image</th>
              <th>Product Name</th>
              <th>product price</th>
              <th>Posted date</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myproducts.map((product, i) => (
              <tr key={product._id}>
                <th>{i + 1}</th>
                <th>
                  <div className="avatar">
                    <div className="rounded w-12 h-12">
                      <img src={product.img} alt="" />
                    </div>
                  </div>
                </th>
                <td>{product.productname}</td>
                <td>{product.resellingprice}</td>
                <td>{product.date}</td>
                <td>{product.status}</td>
                <td>
                  {!product.advertise && product.status === "available" ? (
                    <>
                      <button
                        onClick={() => handleAdvertiseProduct(product._id)}
                        className="btn btn-primary"
                      >
                        Advertise
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td>
                  {product.status === "available" && (
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
