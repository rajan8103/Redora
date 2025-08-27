import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";
  const { navigate, axios, user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const getUserOrders = async () => {
    try {
      const { data } = await axios.get("/order/user");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (user) {
      getUserOrders();
    }
  }, [user]);
  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <p className="flex justify-between items-center gap-6">
            <span>OrderId :{order._id}</span>
            <span>Total Amount</span>
          </p>

          <p className="font-medium text-base my-auto text-black/70 $">
            {order.amount}
          </p>

          <div className="flex flex-col text-sm">
            <p> Payment Method: {order.paymentType}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Status: {order.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
