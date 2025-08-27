import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
  const { axios, user, navigate } = useContext(AppContext);
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value, // ✅ square brackets hata diye
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-104 md:max-w-3xl mx-4 md:p-6 p-4 text-left text-sm rounded shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Add Address
        </h2>

        {/* ✅ Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            name="fullName"
            value={address.fullName}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={address.phoneNumber}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            value={address.email}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            value={address.street}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="Street"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            value={address.city}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="City"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            value={address.state}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="State"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="postalCode"
            value={address.postalCode}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="Postal Code"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            value={address.country}
            className="w-full border mt-1 border-gray-500/30 focus:border-indigo-500 outline-none rounded py-2.5 px-4"
            placeholder="Country"
            onChange={handleChange}
            required
          />
        </div>

        <button className="w-full my-3 bg-primary active:scale-95 transition py-2.5 rounded text-white">
          Add Address
        </button>
      </form>
    </div>
  );
};

export default AddAddress;
