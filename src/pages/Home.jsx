import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard";

function Home() {

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

  // Get All Foods
  const getFoods = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/food"
      );

      setFoods(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  // Add To Cart
  const addToCart = async (foodId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          food: foodId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message);

    } catch (error) {
  console.log(error);

  if (error.response) {
    console.log(error.response.data);
    alert(error.response.data.message);
  } else {
    alert(error.message);
  }
}
};

  // Page Load
  useEffect(() => {
    getFoods();
  }, []);

  return (
    <div className="home">

      <h1>Our Menu</h1>

      <input
        type="text"
        className="search-box"
        placeholder="Search Food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="food-container">

        {foods
          .filter((food) =>
            food.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((food) => (
            <FoodCard
              key={food._id}
              id={food._id}
              name={food.name}
              category={food.category}
              price={food.price}
              image={food.image}
              addToCart={addToCart}
            />
          ))}

      </div>

    </div>
  );
}

export default Home;