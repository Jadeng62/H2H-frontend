import React from "react";
import "../Styles/Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-background/30 mt-16">
      <hr className="border-white" />
      <div className="flex flex-row my-10 items-center">
        <div className="text-white text-3xl ">
          <span className="flex flex-row justify-start">
            <h3
              onClick={() => navigate("/")}
              className=" cursor-pointer text-white mx-10 md:mr-24"
            >
              H2H
            </h3>
          </span>
        </div>
        <div className="flex flex-grow text-white items-center">
          <div className="flex flex-grow justify-between items-center">
            <p className="hover:underline cursor-pointer">About</p>
            <div className="">
              <a href="https://github.com/Jadeng62/H2H-frontend" target="blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github hover:animate-pulse"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex flex-grow justify-end items-center mx-10">
            <p>© 2024 Head2Head, Inc.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
