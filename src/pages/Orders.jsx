import { useState, useEffect } from "react";
import axios from "axios";
function Orders() {
    const [orders, setOrders] = useState([]);
    // getOrders() function
    const getOrders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/api/orders",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setOrders(response.data);

    console.log(response.data);

  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getOrders();
}, []);
  return (
    <div>
      <h1>📦 My Orders</h1>
      {orders.map((order) => (
  <div
    key={order._id}
    style={{
      border: "1px solid black",
      padding: "15px",
      margin: "10px",
    }}
  >
    <h3>Order ID: {order._id}</h3>

    <p>Total Price: ₹{order.totalPrice}</p>

    <p>
  Status:
  <span
    style={{
      color:
        order.status === "Pending"
          ? "orange"
          : order.status === "Preparing"
          ? "blue"
          : order.status === "Completed"
          ? "green"
          : "red",
      fontWeight: "bold",
      marginLeft: "8px",
    }}
  >
    {order.status}
  </span>
</p>

    <h4>Items:</h4>

    {order.items.map((item, index) => (
      <div key={index}>
        <p>{item.food?.name}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    ))}
  </div>
))}
    </div>
  );
}

export default Orders;