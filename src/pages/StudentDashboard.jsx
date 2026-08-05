import React, { useEffect, useState } from "react";
import StudentNavbar from "../components/StudentNavbar";

const StudentDashboard = () => {
  const [meal, setMeal] = useState({
    breakfast: "Eat",
    lunch: "Eat",
    dinner: "Eat",
  });

  const [todayMenu, setTodayMenu] = useState(null);
  const [history, setHistory] = useState([]);

  // Get Today's Menu
  const getTodayMenu = async () => {
    try {
      const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
      });

      const res = await fetch(
        `https://optimal-backend-jzts.onrender.com/api/menu/${today}`
      );

      const data = await res.json();

      setTodayMenu(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Meal History
  const getHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://optimal-backend-jzts.onrender.com/api/meal-response/my",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();

      setHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodayMenu();
    getHistory();
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

      const res = await fetch(
        "https://optimal-backend-jzts.onrender.com/api/meal-response",
        {
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
        }
      );

      const data = await res.json();

      alert(data.message || "Preference Saved Successfully ✅");

      getHistory();

    } catch (error) {
      console.log(error);
    }
  };

  const currentHour = new Date().getHours();

  const breakfastClosed = currentHour >= 9;
  const lunchClosed = currentHour >= 14;
  const dinnerClosed = currentHour >= 20;

  return (
    <StudentNavbar />>
    <div className="container">

      <h1>Today's Menu</h1>

      {/* Breakfast */}
      <div>

        <h2>🍳 Breakfast</h2>

        <p>{todayMenu?.breakfast?.[0]?.name}</p>

        <select
          value={meal.breakfast}
          onChange={(e) =>
            handleChange("breakfast", e.target.value)
          }
          disabled={breakfastClosed}
        >
          <option>Eat</option>
          <option>Skip</option>
          <option>Leave</option>
        </select>

        {breakfastClosed && (
          <p style={{ color: "red" }}>
            ⛔ Breakfast booking closed
          </p>
        )}

      </div>

      <hr />

      {/* Lunch */}
      <div>

        <h2>🍛 Lunch</h2>

        <p>{todayMenu?.lunch?.[0]?.name}</p>

        <select
          value={meal.lunch}
          onChange={(e) =>
            handleChange("lunch", e.target.value)
          }
          disabled={lunchClosed}
        >
          <option>Eat</option>
          <option>Skip</option>
          <option>Leave</option>
        </select>

        {lunchClosed && (
          <p style={{ color: "red" }}>
            ⛔ Lunch booking closed
          </p>
        )}

      </div>

      <hr />

      {/* Dinner */}
      <div>

        <h2>🍽 Dinner</h2>

        <p>{todayMenu?.dinner?.[0]?.name}</p>

        <select
          value={meal.dinner}
          onChange={(e) =>
            handleChange("dinner", e.target.value)
          }
          disabled={dinnerClosed}
        >
          <option>Eat</option>
          <option>Skip</option>
          <option>Leave</option>
        </select>

        {dinnerClosed && (
          <p style={{ color: "red" }}>
            ⛔ Dinner booking closed
          </p>
        )}

      </div>

      <br />

      <button onClick={handleSubmit}>
        Submit Preference
      </button>

      <hr />

      <h2>My Meal History</h2>

      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>Date</th>
            <th>Breakfast</th>
            <th>Lunch</th>
            <th>Dinner</th>
          </tr>

        </thead>

        <tbody>

          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item.breakfast}</td>
              <td>{item.lunch}</td>
              <td>{item.dinner}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default StudentDashboard;