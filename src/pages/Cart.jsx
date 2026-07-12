import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Get Cart
  const getCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/cart",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Increase Quantity
  const increaseQuantity = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/cart/increase/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Decrease Quantity
  const decreaseQuantity = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/cart/decrease/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Remove Item
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/cart/remove/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Place Order
  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/orders/place",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message);

      getCart();
    } catch (error) {
      console.log(error);
      alert("Failed to place order");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h1>🛒 My Cart</h1>

        <h2 style={{ textAlign: "center", marginTop: "100px" }}>
          Your Cart is Empty 😔
        </h2>

        <p style={{ textAlign: "center" }}>
          Add some delicious food 🍕🍔
        </p>
      </div>
    );
  }

  // Total Price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + item.food.price * item.quantity;
  }, 0);

  return (
    <div className="cart">
      <h1>🛒 My Cart</h1>

      {cartItems.map((item) => (
        <div key={item._id} className="cart-card">

          <img
            src={item.food.image}
            alt={item.food.name}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />

          <h2>{item.food.name}</h2>

          <p>Price: ₹{item.food.price}</p>

          <div className="quantity-box">
            <button onClick={() => decreaseQuantity(item._id)}>
              -
            </button>

            <h3>{item.quantity}</h3>

            <button onClick={() => increaseQuantity(item._id)}>
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item._id)}
            style={{
              marginTop: "15px",
              background: "red",
              color: "white",
              border: "none",
              padding: "8px 15px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            🗑 Remove
          </button>

        </div>
      ))}

      <div className="total-box">
        <h2>Total Price: ₹{totalPrice}</h2>

        <button
          className="order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>

    </div>
  );
}

export default Cart;