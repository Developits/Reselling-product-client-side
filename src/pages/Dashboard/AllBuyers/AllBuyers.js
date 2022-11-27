import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Shared/Loader/Loader";

const AllBuyers = () => {
  const { data: allBuyers = [], isLoading } = useQuery({
    queryKey: ["allbuyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/allbuyers");
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
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allBuyers.map((buyer, i) => (
              <tr key={buyer._id}>
                <th>{i + 1}</th>
                <td>{buyer.name}</td>
                <td>{buyer.email}</td>
                <td>
                  <button className="btn btn-xs btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;
