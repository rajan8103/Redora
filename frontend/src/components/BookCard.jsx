import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const BookCard = ({ book }) => {
  const { addToCart } = useContext(AppContext);
  return (
    <div className="p-4">
      <Link to={`/book/${book._id}`}>
        <img
          src={`http://localhost:4000/images/${book.image}`}
          alt=""
          className="w-[225px] h-[350px] transition-all duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex items-center justify-between my-1">
        <div className="flex items-center gap-2 my-1">
          <img src={assets.star_icon} alt="" />
          <p>{book.rating}</p>
        </div>
        <div className="flex items-center gap-2 my-1">
          <p>{book.reviews}</p>
          <p>Reviews</p>
        </div>
      </div>
      <p>Author:{book.author}</p>
      <h3 className="text-lg font-semibold">{book.tittle}</h3>
      <div className="flex items-center gap-5 ">
        <p className="text-gray-400 line-through">Rs{book.price}</p>
        <p className="text-gray-800">Rs{book.offerPrice}</p>
      </div>
      <button
        className="bg-primary text-white rounded-full px-10 py-2 cursor-pointer mt-4"
        onClick={() => addToCart(book)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default BookCard;
