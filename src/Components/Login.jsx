import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

import SignInWithGoogle from "./SignInWithGoogle";
import { auth } from "../helpers/firebase";

import "../Styles/login.css";

function Login() {
  const navigate = useNavigate();

  const [demo, setDemo] = useState({password:"Johndoe1", email:"johndoe@mail.com"})
  const [loginUser, setLoginNewUser] = useState({ password: "", email: "" });

  const handleChange = (e) => {
    setLoginNewUser({ ...loginUser, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginUser;

    try {
      const loggedUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("demo logged in to Firebase Successfully");

      // store the JWT token so that you know the user is logged in.
      const token = await loggedUser.user.getIdToken();
      localStorage.setItem("token", token);

      setLoginNewUser({ password: "", email: "" });
      toast.success("User logged in Successfully", {
        position: "top-center",
      });

      // you do not have to create a login in the backend because firebase is handling it.
      // when you navigate to profile, you will see a fetch for the user.
      navigate("/profile");
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };


  return (
    <div className="login-container my-16 md:my-24 ">
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <h3 className="login-h3 ">Login</h3>
           <button onClick={handleDemo} className="login-btn demo">Demo(Dev use only!)</button>
          <label htmlFor="email" className="login-label">
            Email Address{" "}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={loginUser.email}
              onChange={handleChange}
              className="login-input"
              required
            />
          </label>

          <label htmlFor="password" className="login-label">
            Password{" "}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={loginUser.password}
              onChange={handleChange}
              className="login-input"
              required
            />
          </label>

          <button type="submit" className="login-btn">
            Submit
          </button>
        </form>
      </div>
      <div className="login-switch">
        New user <Link to="/register">Register Here</Link>
      </div>
      <div className="flex flex-col justify-center ">
        <p className="login-p">--Or continue with--</p>
        <div className="pl-28 pb-10">
          <SignInWithGoogle />
        </div>
      </div>
    </div>
  );
}

export default Login;
