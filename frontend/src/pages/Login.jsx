import React, { useContext, useState } from "react";
import { SiProtonmail } from "react-icons/si";
import { TbPasswordFingerprint } from "react-icons/tb";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Login = () => {
  const { user, setUser, navigate, axios } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/login", formData);
      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-primary">
      <form
        onSubmit={handleSubmit}
        className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">Login</h1>
        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <SiProtonmail className="w-5 h-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <TbPasswordFingerprint className="w-5 h-5" />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        <button className="mt-2 w-full h-11 rounded-full text-white bg-primary hover:opacity-90 transition-opacity">
          Login
        </button>
        <p className="text-gray-500 text-sm mt-3 mb-11">
          Don’t have an account?{" "}
          <Link to={"/signup"} className="text-indigo-500">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
