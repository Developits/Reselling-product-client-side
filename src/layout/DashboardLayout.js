import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../pages/Shared/Loader/Loader";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const { data: currentUser = [], isLoading } = useQuery({
    queryKey: ["users", user.email],
    queryFn: async () => {
      const res = await fetch(
        `https://salvage-yard-server.vercel.app/users?email=${user.email}`
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
      <Navbar></Navbar>
      <div className="drawer  drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content ">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-200 text-base-content">
            {currentUser.accountType === "buyer" && (
              <li>
                <Link to="/dashboard/myorders">My orders</Link>
              </li>
            )}
            {currentUser.accountType === "seller" && (
              <>
                <li>
                  <Link to="/dashboard/myproducts">My products</Link>
                </li>
                <li>
                  <Link to="/dashboard/mybuyers">My buyers</Link>
                </li>
                <li>
                  <Link to="/dashboard/addproduct">Add product</Link>
                </li>
              </>
            )}

            {currentUser.accountType === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/allsellers">All sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/allbuyers">All buyers</Link>
                </li>
                <li>
                  <Link to="/dashboard/reporteditems">Reported items</Link>
                </li>
              </>
            )}

            {/* {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/allusers">All users</Link>
                </li>
                <li>
                  <Link to="/dashboard/adddoctor">Add A Doctor</Link>
                </li>
                <li>
                  <Link to="/dashboard/managedoctors">Manage Doctors</Link>
                </li>
              </>
            )} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
