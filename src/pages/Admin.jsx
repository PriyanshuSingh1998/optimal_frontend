import { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";
import AdminNavbar from "../components/AdminNavbar";

function Admin() {



  const [food, setFood] = useState({
    name: "",
    price: "",
    category: "Veg",
    image: "",
    description: "",
  });
  const [foods, setFoods] = useState([]);

  const [responses, setResponses] = useState([]);

  const [editId, setEditId] = useState(null);
  const [day, setDay] = useState("Monday");

const [menu, setMenu] = useState({
  breakfast: "",
  lunch: "",
  dinner: "",
});
const [weeklyMenus, setWeeklyMenus] = useState([]);

  const countMeal = (mealType, status) => {
  return responses.filter(
    (item) => item[mealType] === status
  ).length;
};

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
const getWeeklyMenu = async () => {
  const response = await axios.get(
    "https://optimal-backend-jzts.onrender.com/api/menu"
  );

  setWeeklyMenus(response.data);
};

const getResponses = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "https://optimal-backend-jzts.onrender.com/api/meal-response/all",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setResponses(response.data);

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
const saveMenu = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      "https://optimal-backend-jzts.onrender.com/api/menu",
      {
        day,
        breakfast: [{ name: menu.breakfast, image: "" }],
        lunch: [{ name: menu.lunch, image: "" }],
        dinner: [{ name: menu.dinner, image: "" }],
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert(response.data.message);
    getWeeklyMenu();

  } catch (error) {
    console.log(error);
    alert("Failed to Save Menu");
  }
};
  useEffect(() => {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    alert("Access Denied");
    window.location.href = "/";
  }
  
    getFoods();
    getWeeklyMenu();
    getResponses();


}, []);


 return (
  <>
  <AdminNavbar />
  <div className="dashboard">

     <h1 className="heading">
       🍽 Smart Mess Admin Dashboard
     </h1>

     <hr />

     <h2>📅 Weekly Menu</h2>

     <select
       value={day}
       onChange={(e) => setDay(e.target.value)}
     >
       <option>Monday</option>
       <option>Tuesday</option>
       <option>Wednesday</option>
       <option>Thursday</option>
       <option>Friday</option>
       <option>Saturday</option>
       <option>Sunday</option>
     </select>

     <br /><br />

     <input
       type="text"
       placeholder="Breakfast"
       value={menu.breakfast}
       onChange={(e) => setMenu({
         ...menu,
         breakfast: e.target.value,
       })} />

     <br /><br />

     <input
       type="text"
       placeholder="Lunch"
       value={menu.lunch}
       onChange={(e) => setMenu({
         ...menu,
         lunch: e.target.value,
       })} />

     <br /><br />

     <input
       type="text"
       placeholder="Dinner"
       value={menu.dinner}
       onChange={(e) => setMenu({
         ...menu,
         dinner: e.target.value,
       })} />

     <br /><br />

     <button onClick={saveMenu}>
       Save Weekly Menu
     </button>
     <h2>Saved Weekly Menu</h2>

     {weeklyMenus.map((item) => (
       <div key={item._id}>
         <h3>{item.day}</h3>
         <p>Breakfast: {item.breakfast[0]?.name}</p>
         <p>Lunch: {item.lunch[0]?.name}</p>
         <p>Dinner: {item.dinner[0]?.name}</p>
       </div>
     ))}

     <hr />

     <input
       type="text"
       name="name"
       placeholder="Food Name"
       value={food.name}
       onChange={handleChange} />

     <input
       type="text"
       name="name"
       placeholder="Food Name"
       value={food.name}
       onChange={handleChange} />
     <br /><br />

     <input
       type="number"
       name="price"
       placeholder="Price"
       value={food.price}
       onChange={handleChange} />
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
       onChange={handleChange} />
     <br /><br />

     <textarea
       name="description"
       placeholder="Description"
       value={food.description}
       onChange={handleChange} />
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
           } }
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
     <hr />
     <hr />

     <h2>Today's Summary</h2>

     <p><b>Total Students:</b> {responses.length}</p>

     <h3>🍳 Breakfast</h3>
     <p>
       Eat: {countMeal("breakfast", "Eat")} |
       Skip: {countMeal("breakfast", "Skip")} |
       Leave: {countMeal("breakfast", "Leave")}
     </p>

     <h3>🍛 Lunch</h3>
     <p>
       Eat: {countMeal("lunch", "Eat")} |
       Skip: {countMeal("lunch", "Skip")} |
       Leave: {countMeal("lunch", "Leave")}
     </p>

     <h3>🍽 Dinner</h3>
     <p>
       Eat: {countMeal("dinner", "Eat")} |
       Skip: {countMeal("dinner", "Skip")} |
       Leave: {countMeal("dinner", "Leave")}
     </p>
     <h2>Today's Meal Responses</h2>

     <table border="1" cellPadding="10">

       <thead>

         <tr>
           <th>Name</th>
           <th>Email</th>
           <th>Breakfast</th>
           <th>Lunch</th>
           <th>Dinner</th>
         </tr>

       </thead>

       <tbody>

         {responses.map((item) => (

           <tr key={item._id}>

             <td>{item.user.name}</td>

             <td>{item.user.email}</td>

             <td>{item.breakfast}</td>

             <td>{item.lunch}</td>

             <td>{item.dinner}</td>

           </tr>

         ))}

       </tbody>

     </table>
   </div></>
  );
}

export default Admin;