import React, { useEffect,useState } from "react";

const StudentDashboard = () => {

  const [meal, setMeal] = useState({
    breakfast: "Eat",
    lunch: "Eat",
    dinner: "Eat",
  });
  
  const [todayMenu, setTodayMenu] = useState(null);

 useEffect(() => {

  const getTodayMenu = async () => {

    try {

      const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });

      const res = await fetch(
        `http://localhost:5000/api/menu/${today}`
      );

      const data = await res.json();

      setTodayMenu(data);

    } catch (error) {

      console.log(error);

    }

  };

  getTodayMenu();

}, []);

  const handleChange = (mealType, value) => {
    setMeal({
      ...meal,
      [mealType]: value,
    });
  };

const handleSubmit = async () => {

  try {

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/meal-response", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },

      body: JSON.stringify({
        date: "2026-08-01",
        breakfast: meal.breakfast,
        lunch: meal.lunch,
        dinner: meal.dinner,
      }),

    });

    const data = await res.json();

    alert("Preference Saved Successfully ✅");

    console.log(data);

  } catch (error) {

    console.log(error);

  }

};
const currentHour = new Date().getHours();

const breakfastClosed = currentHour >= 9;
const lunchClosed = currentHour >= 14;
const dinnerClosed = currentHour >= 20;

  return (
    <div className="container">

      <h1>Today's Menu</h1>

      <div>

        <h2>🍳 Breakfast</h2>
        <p>{todayMenu?.breakfast[0]?.name}</p>

       <select
  value={meal.breakfast}
  onChange={(e) => handleChange("breakfast", e.target.value)}
  disabled={breakfastClosed}
>
  {breakfastClosed && (
  <p style={{ color: "red" }}>
    ⛔ Breakfast booking closed
  </p>
)}
          <option>Eat</option>
          <option>Skip</option>
          <option>Leave</option>
        </select>

      </div>

      <hr />

      <div>

        <h2>🍛 Lunch</h2>
        <p>{todayMenu?.lunch[0]?.name}</p>

        <select
  value={meal.lunch}
  onChange={(e) => handleChange("lunch", e.target.value)}
  disabled={lunchClosed}
>
  {lunchClosed && (
  <p style={{ color: "red" }}>
    ⛔ Lunch booking closed
  </p>
)}
          <option>Eat</option>
          <option>Skip</option>
          <option>Leave</option>
        </select>

      </div>

      <hr />

      <div>

        <h2>🍽 Dinner</h2>
        <p>{todayMenu?.dinner[0]?.name}</p>

        <select
  value={meal.dinner}
  onChange={(e) => handleChange("dinner", e.target.value)}
  disabled={dinnerClosed}
>
  {dinnerClosed && (
  <p style={{ color: "red" }}>
    ⛔ Dinner booking closed
  </p>
)}
          <option>Eat</option>
          <option>Skip</option>
          <option>Leave</option>
        </select>

      </div>

      <br />

      <button onClick={handleSubmit}>
        Submit Preference
      </button>

    </div>
  );
};

export default StudentDashboard;