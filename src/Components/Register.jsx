import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import placeholder from "../assets/placeholder.png";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";

import "../Styles/register.css";
import UploadWidget from "./UploadWidget";

function Register() {
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [newUser, setNewUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    dob: "",
    position: "",
    password: "",
    photo: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setNewUser({
      ...newUser,
      position: e.target.value,
    });
  };

  const handleClearState = () => {
    setNewUser({
      email: "",
      first_name: "",
      last_name: "",
      photo: "",
      username: "",
      dob: "",
      position: "",
      password: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { email, password, photo } = newUser;
      // createUser in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the profile with photo URL
      await updateProfile(userCredential.user, {
        photoURL: cloudinaryURL ? cloudinaryURL : placeholder,
      });

      // you need the JWT token to authenticate protected routes on the backend
      const token = await userCredential.user.getIdToken();
      localStorage.setItem("token", token);

      const { uid, photoURL } = auth.currentUser;

      if (uid) {
        //register first
        const retrievedUser = await register(newUser, photoURL, uid);
        // no sign in the new user with signInWithEmailAndPassword
        if (retrievedUser.uid) {
          await signInWithEmailAndPassword(auth, email, password);

          handleClearState();
          toast.success("User Registered Successfully!!", {
            position: "top-center",
          });
          navigate("/profile");
        } else {
          toast.error("User Not Found", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleRegister}>
        <h3 className="register-h3">Sign Up</h3>
        <label htmlFor="first_name" className="register-label">
          <div className="mb-1">First Name </div>
          <input
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First name"
            value={newUser.first_name}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>

        <label htmlFor="last_name" className="register-label">
          <div className="mb-1">Last Name </div>{" "}
          <input
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last name"
            value={newUser.last_name}
            onChange={handleChange}
            className="register-input"
          />
        </label>
        <label htmlFor="email" className="register-label">
          <div className="mb-1">Email Address </div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={newUser.email}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>
        <label htmlFor="username" className="register-label">
          <div className="mb-1">Username </div>
          <input
            type="username"
            placeholder="Enter username"
            id="username"
            name="username"
            value={newUser.username}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>
        <label htmlFor="password" className="register-label">
          <div className="mb-1">Password </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={newUser.password}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>
        
        <label htmlFor="dob" className="register-label">
          <div className="mb-1">Date of Birth </div>
          <input
            type="date"
            id="dob"
            name="dob"
            value={newUser.dob}
            onChange={handleChange}
            required
            className="register-input"
          />
        </label>
        {/* put radio btns on opposite side and left align */}
        <div className="register-radio font-sans">
          <h4 className="register-h4">Select Your Team Position</h4>
          <label htmlFor="position1" className="register-label flex items-center gap-2">
            <input
              type="radio"
              id="position1"
              name="position"
              value="point guard"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
            Point Guard{" "}
          </label>

          <label htmlFor="position2" className="register-label flex items-center gap-2">
            <input
              type="radio"
              id="position2"
              name="position"
              value="shooting guard"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
            Shooting Guard{" "}
          </label>

          <label htmlFor="position3" className="register-label flex items-center gap-2">
            <input
              type="radio"
              id="position3"
              name="position"
              value="small forward"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
            Small Forward{" "}
          </label>

          <label htmlFor="position4" className="register-label flex items-center gap-2">
            <input
              type="radio"
              id="position4"
              name="position"
              value="power forward"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
            Power Forward{" "}
          </label>

          <label htmlFor="position5" className="register-label flex items-center gap-2">
            <input
              type="radio"
              id="position5"
              name="position"
              value="center"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
            Center{" "}
          </label>
        </div>
        <UploadWidget
          cloudinaryURL={cloudinaryURL}
          setCloudinaryURL={setCloudinaryURL}
        />
        <button type="submit" className="register-btn font-bold">
          Sign Up
        </button>
        <p className="register-p text-center pl-10 hover:text-blue-800">
          Already registered?{" "}
          <Link to="/login">
            <span className="register-span hover:text-black">Login</span>
          </Link>
        </p>
      </form>
      {console.log(newUser)}
    </div>
  );
}

export default Register;
