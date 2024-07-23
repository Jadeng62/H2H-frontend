import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../helpers/firebase";
import { register } from "../helpers/register";

import "../Styles/register.css";

function Register() {
  const [newUser, setNewUser] = useState({
      email: "",
      first_name: "",
      last_name: "",
      username:"",
      dob:"",
      position:"",
      password:"",
      photo: ""
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

          <label htmlFor="photo" className="register-label">
            Photo Url{" "}
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter img URL"
              value={newUser.photo}
              onChange={handleChange}
              className="register-input"
            />
          </label>

         <div className="register-radio">
         <h4 className="register-h4">Select Your Team Position</h4>
          <label htmlFor="position1" className="register-label">
            Point Guard{" "}
            <input
              type="radio"
              id="position1"
              name="position"
              value="point guard"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
          </label>

          <label htmlFor="position2" className="register-label">
            Shooting Guard{" "}
            <input
              type="radio"
              id="position2"
              name="position"
              value="shooting guard"
              // checked={newUser.position === "Shooting Guard"}
              onChange={handleRadioChange}
              className="register-radio-input"
            />
          </label>

          <label htmlFor="position3" className="register-label">
            Small Forward{" "}
            <input
              type="radio"
              id="position3"
              name="position"
              value="small forward"
              // checked={newUser.position === "Small Forward"}
              onChange={handleRadioChange}
              className="register-radio-input"
            />
          </label>

          <label htmlFor="position4" className="register-label">
            Power Forward{" "}
            <input
              type="radio"
              id="position4"
              name="position"
              value="power forward"
              // checked={newUser.position === "Power Forward"}
              onChange={handleRadioChange}
              className="register-radio-input"
            />
          </label>

          <label htmlFor="position5" className="register-label">
            Center{" "}
            <input
              type="radio"
              id="position5"
              name="position"
              value="center"
              onChange={handleRadioChange}
              className="register-radio-input"
            />
          </label>
        </div>
        <button type="submit" className="register-btn">
          Sign Up
        </button>
        <p className="register-p">
          Already registered{" "}
          <Link to="/login">
            <span className="register-span">Login</span>
          </Link>
        </p>
      </form>
      {console.log(newUser)}
    </div>
  );
}

export default Register;
