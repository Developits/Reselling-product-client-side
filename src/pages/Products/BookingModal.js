import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const BookingModal = ({ modalData, setModalData, refetch }) => {
  const { user } = useContext(AuthContext);
  const { _id, productname, resellingprice } = modalData;

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const phone = form.phone.value;
    const location = form.location.value;

    const bookedProduct = {
      buyername: user.displayName,
      buyeremail: user.email,
      productname,
      phone,
      location,
    };

    fetch(`https://salvage-yard-server.vercel.app/products/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(bookedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
          toast.success("Product booked Successfully.");
        }
      });

    setModalData("");
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{productname}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-10"
          >
            <input
              type="text"
              disabled
              defaultValue={user.displayName}
              className="input w-full input-bordered "
            />
            <input
              type="email"
              disabled
              defaultValue={user.email}
              className="input w-full input-bordered "
            />
            <input
              type="text"
              disabled
              defaultValue={productname}
              className="input w-full input-bordered "
            />
            <input
              type="text"
              defaultValue={resellingprice}
              disabled
              className="input w-full input-bordered"
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone Number"
              className="input w-full input-bordered"
            />
            <input
              name="location"
              type="text"
              placeholder="meeting location"
              className="input w-full input-bordered "
            />
            <br />
            <input
              className="btn btn-accent w-full"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
