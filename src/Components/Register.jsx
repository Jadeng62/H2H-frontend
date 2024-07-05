import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";

import "../Styles/register.css"

function Register() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  const handleClearState = () => {
    setNewUser({
      email: "",
      first_name: "",
      last_name: "",
      photo: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = newUser;
      // createUser in firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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
        <div className="register-input-container">
          <label htmlFor="first_name" className="register-label">
            First Name:{" "}
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
            Last Name:{" "}
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
            Email Address:{" "}
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

          <label htmlFor="password" className="register-label">
            Password:{" "}
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              required
              className="register-input"
            />
          </label>
        </div>
          <button type="submit" className="register-btn">
            Sign Up
          </button>
        <p className="register-p">
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
    
  );
}

export default Register;
