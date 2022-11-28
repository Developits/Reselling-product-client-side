import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/AuthContext";
import Loader from "../../Shared/Loader/Loader";

const MyBuyers = () => {
  const { user } = useContext(AuthContext);

  const { data: mybuyers = [], isLoading } = useQuery({
    queryKey: ["bookedbuyer", user.displayName],
    queryFn: async () => {
      const res = await fetch(
        `https://salvage-yard-server.vercel.app/bookedbuyer?user=${user.displayName}`
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
              <th>Buyer Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Meeting Location</th>
            </tr>
          </thead>
          <tbody>
            {mybuyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.productname}</td>
                <td>{buyer.buyername}</td>
                <td>{buyer.buyeremail}</td>
                <td>{buyer.phone}</td>
                <td>{buyer.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;
