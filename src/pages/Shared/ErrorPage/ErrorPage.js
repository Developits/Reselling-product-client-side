import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex text-center items-center justify-center h-full">
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4570/4570568.png"
          alt=""
        />
        <p className="text-3xl">
          Looks like our services are currently offline !
        </p>
        <Link to='/' className="px-8 py-3 font-semibold rounded">
          Back to homepage
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
