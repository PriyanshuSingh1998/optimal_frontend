import { useState, useEffect } from "react";
import axios from "axios";

function Admin() {

  const [food, setFood] = useState({
    name: "",
    price: "",
    category: "Veg",
    image: "",
    description: "",
  });
  const [foods, setFoods] = useState([]);

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const addFood = async () => {
    try {
        console.log("Food Data:", food);
      const response = await axios.post(
        "https://optimal-backend-jzts.onrender.com/api/food/add",
        food
      );

      alert(response.data.message);
      getFoods();

      setFood({
        name: "",
        price: "",
        category: "Veg",
        image: "",
        description: "",
      });

    } catch (error) {
      console.log(error);
      alert("Failed to Add Food");
    }
  };

  const getFoods = async () => {
  try {
    const response = await axios.get(
      "https://optimal-backend-jzts.onrender.com/api/food"
    );

    setFoods(response.data);

  } catch (error) {
    console.log(error);
  }
};

const deleteFood = async (id) => {
  try {

    await axios.delete(
      `https://optimal-backend-jzts.onrender.com/api/food/${id}`
    );

    alert("Food Deleted");

    getFoods();

  } catch (error) {

    console.log(error);

  }
};
// Update food
const updateFood = async () => {
  try {

    const response = await axios.put(
      `https://optimal-backend-jzts.onrender.com/api/food/${editId}`,
      food
    );

    alert(response.data.message);

    getFoods();

    setEditId(null);

    setFood({
      name: "",
      price: "",
      category: "Veg",
      image: "",
      description: "",
    });

  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
    getFoods();
}, []);
  return (
    <div style={{ padding: "30px" }}>

      <h1>Admin Panel</h1>

      <input
        type="text"
        name="name"
        placeholder="Food Name"
        value={food.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={food.price}
        onChange={handleChange}
      />
      <br /><br />

      <select
        name="category"
        value={food.category}
        onChange={handleChange}
      >
        <option>Veg</option>
        <option>Non-Veg</option>
        <option>Snacks</option>
        <option>Drinks</option>
      </select>
      <br /><br />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={food.image}
        onChange={handleChange}
      />
      <br /><br />

      <textarea
        name="description"
        placeholder="Description"
        value={food.description}
        onChange={handleChange}
      />
      <br /><br />

      <button
  onClick={editId ? updateFood : addFood}
>
  {editId ? "Update Food" : "Add Food"}
</button>
      <hr />

<h2>All Foods</h2>

{foods.map((item) => (
  <div
    key={item._id}
    style={{
      border: "1px solid gray",
      padding: "15px",
      marginTop: "15px",
    }}
  >
    <h3>{item.name}</h3>

    <p>₹{item.price}</p>

    <p>{item.category}</p>

    {/*Edit Button */}
    <button
  onClick={() => {
    setEditId(item._id);

    setFood({
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
      description: item.description,
    });
  }}
>
  Edit
</button>

    <button
      onClick={() => deleteFood(item._id)}
    >
      Delete
    </button>

  </div>
))}

    </div>
  );
}

export default Admin;