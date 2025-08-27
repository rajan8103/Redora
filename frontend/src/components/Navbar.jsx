import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoBookSharp } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { navigate, user, setUser, cartCount } = useContext(AppContext);
  const logout = async () => {
    setUser(false);
    toast.success("Logout successfully");
    navigate("/");
  };
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <div className="flex items-center  ">
          <IoBookSharp className="text-3xl m-2" />
          <span
            className="text-3xl text-primary
           font-extrabold"
          >
            R
          </span>
          <span className="  mt-2 font-medium">EADORA</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/books"}>Books</Link>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <BsCart4 className="text-xl" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {cartCount ? cartCount : 0}
          </button>
        </div>
        {user ? (
          <div className="flex gap-5 items-center">
            {" "}
            <button
              className="cursor-pointer px-8 py-2 bg-primary text-white rounded-full"
              onClick={() => {
                navigate("/my-orders");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              My Orders
            </button>
            <p onClick={logout} className="cursor-pointer hover:underline">
              Logout
            </p>
          </div>
        ) : (
          <button
            className="cursor-pointer px-8 py-2 bg-primary text-white rounded-full"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden cursor-pointer"
      >
        {/* Menu Icon SVG */}
        <svg
          width="21"
          height="15"
          viewBox="0 0 21 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="21" height="1.5" rx=".75" fill="#426287" />
          <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
          <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"}>Home</Link>
        <Link to={"/books"}>Books</Link>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <BsCart4 className="text-xl" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {cartCount ? cartCount : 0}
          </button>
        </div>
        {user ? (
          <div className="flex gap-5 items-center">
            {" "}
            <button
              className="cursor-pointer px-8 py-2 bg-primary text-white rounded-full"
              onClick={() => {
                navigate("/my-orders");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              My Orders
            </button>
            <p onClick={logout} className="cursor-pointer hover:underline">
              Logout
            </p>
          </div>
        ) : (
          <button
            className="cursor-pointer px-8 py-2 bg-primary text-white rounded-full"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
