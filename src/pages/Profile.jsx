import { useEffect, useState } from "react";
import axios from "axios";
import StudentNavbar from "../components/StudentNavbar";

function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    rollNumber: "",
    hostel: "",
    roomNumber: "",
    course: "",
    year: "",
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://optimal-backend-jzts.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setProfile(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        "https://optimal-backend-jzts.onrender.com/api/users/profile",
        profile,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <StudentNavbar />

      <div style={{ padding: "30px" }}>

        <h1>My Profile</h1>

        <input
          name="name"
          placeholder="Name"
          value={profile.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          value={profile.email}
          disabled
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={profile.phone}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="rollNumber"
          placeholder="Roll Number"
          value={profile.rollNumber}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="hostel"
          placeholder="Hostel"
          value={profile.hostel}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="roomNumber"
          placeholder="Room Number"
          value={profile.roomNumber}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="course"
          placeholder="Course"
          value={profile.course}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="year"
          placeholder="Year"
          value={profile.year}
          onChange={handleChange}
        />
        <br /><br />

        <button onClick={updateProfile}>
          Update Profile
        </button>

      </div>
    </>
  );
}

export default Profile;