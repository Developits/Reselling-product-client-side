import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../Shared/Loader/Loader";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: myorders = [], isLoading } = useQuery({
    queryKey: ["myorders", user.displayName],
    queryFn: async () => {
      const res = await fetch(
        `https://salvage-yard-server.vercel.app/myorders?user=${user.displayName}`
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
              <th>Product Image</th>
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
                <td>
                  <div className="avatar">
                    <div className="rounded w-12 h-12">
                      <img src={order.img} alt="" />
                    </div>
                  </div>
                </td>
                <td>{order.productname}</td>
                <td>{order.sellername}</td>
                <td>{order.meetinglocation}</td>
                <td>
                  {order.status === "booked" ? (
                    <Link to={`/dashboard/payment/${order._id}`}>
                      <button className="btn btn-primary ">Pay now</button>
                    </Link>
                  ) : (
                    <span className="text-green-500">Paid</span>
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

export default MyOrders;
