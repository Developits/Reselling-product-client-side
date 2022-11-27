import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../Shared/Loader/Loader";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: myorders = [], isLoading } = useQuery({
    queryKey: ["myorders", user.displayName],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/myorders?user=${user.displayName}`
      );
      const data = await res.json();
      return data;
    },
  });
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
              <th>Product Name</th>
              <th>Seller Name</th>
              <th>Meeting Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {myorders.map((order, i) => (
              <tr key={order._id}>
                <th>{i + 1}</th>
                <td>{order.productname}</td>
                <td>{order.sellername}</td>
                <td>{order.location}</td>
                <td>
                  <button className="btn btn-primary">
                    {order.status === "booked" ? "Pay now" : "Paid"}
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

export default MyOrders;