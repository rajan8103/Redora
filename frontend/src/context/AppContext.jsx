import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { books } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);

  const [booksData, setBooksData] = useState([]);
  const fetchAdmin = async () => {
    try {
      const { data } = await axios.get("/admin/is-auth");
      if (data.success) {
        setIsAdmin(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/user/is-auth");
      if (data.success) {
        setUser(true);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/book/get-books");
      if (data.success) {
        setBooksData(data.books);
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const addToCart = (book) => {
    const existingBook = cart.find((item) => item._id === book._id);

    if (existingBook) {
      // Agar pehle se hai to quantity badhao
      const updatedCart = cart.map((item) =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      // Agar pehli baar add ho rahi hai
      setCart([...cart, { ...book, quantity: 1 }]);
    }

    toast.success("Added to cart");
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cart
      .map((item) =>
        item._id === bookId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    toast.success("Removed From Cart");
  };

  const updateCart = (productId, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQty } : item
      )
    );
    toast.success("quantity Updated Successfully");
  };
  const cartCount = cart?.reduce((total, item) => total + item.quantity, 0);
  const totalCartPrice = cart?.reduce(
    (total, item) => total + item.quantity * item.offerPrice,
    0
  );

  useEffect(() => {
    fetchBooks();
    if (isAdmin) {
      fetchAdmin();
    }
    if (user) {
      fetchUser();
    }
  }, []);
  const value = {
    cart,
    setCart,
    user,
    setUser,
    navigate,
    addToCart,
    booksData,
    searchQuery,
    removeFromCart,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    updateCart,
    isAdmin,
    setIsAdmin,
    cartCount,
    totalCartPrice,
    axios,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
