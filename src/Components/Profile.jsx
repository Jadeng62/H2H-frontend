// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// import { getUserData } from "../helpers/getUserData";
// import { logout } from "../helpers/logout";

// import placeholderImage from "../assets/placeholder.png";

// function Profile() {
//   const navigate = useNavigate();

//   const [userDetails, setUserDetails] = useState(null);

//   async function handleLogout() {
//     try {
//       //call function to log out of firebase, no need to call backend
//       await logout();
//       toast.success("User logged out successfully!", {
//         position: "top-center",
//       });
//       navigate("/login");
//       console.log("User logged out successfully!");
//     } catch (error) {
//       toast.error(error.message, {
//         position: "bottom-center",
//       });

//       console.error("Error logging out:", error.message);
//     }
//   }

//   useEffect(() => {
//     async function getUser() {
//       // this is a helper function that will check the state of the current user in firebase and fetch the user using the JWT token from localstorage and the uid
//       const user = await getUserData();
//       // console.log(`Get user:`,user)
//       if (user) setUserDetails(user);
//     }

//     getUser();
//   }, []);

//   if (!userDetails) return alert(`Error with backend fetch data lost`);

//   return (
//     <div
//       style={{ textAlign: "center" }}
//       className="profile-container text-text"
//     >
//       {console.log(userDetails)}
//       {userDetails ? (
//         <>
//           <img
//             src={userDetails.photo || placeholderImage}
//             alt={userDetails.first_name}
//             className="profile-img"
//             style={{
//               marginTop: 100,
//               marginBottom: 20,
//               borderRadius: "50%",
//               width: 150,
//               height: 150,
//             }}
//           />

//           <h1 className="profile-h1">
//             {userDetails.first_name}'s Profile Page
//           </h1>

//           <p>Email: {userDetails.email}</p>
//           <p>First Name: {userDetails.first_name}</p>
//           <p>
//             Last Name:{" "}
//             {userDetails.last_name ? userDetails.last_name : "Unknown"}
//           </p>

//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <>
//           <h2>Loading...</h2>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       )}
//     </div>
//   );
// }

// export default Profile;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getUserData } from "../helpers/getUserData";
import { logout } from "../helpers/logout";

import placeholderImage from "../assets/placeholder.png";
import { fakeUser } from "../helpers/fakeInfo";
import UpcomingGames from "./UpcomingGames";

function Profile() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState(null);

  async function handleLogout() {
    try {
      //call function to log out of firebase, no need to call backend
      await logout();
      toast.success("User logged out successfully!", {
        position: "top-center",
      });
      navigate("/login");
      console.log("User logged out successfully!");
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });

      console.error("Error logging out:", error.message);
    }
  }

  useEffect(() => {
    async function getUser() {
      // this is a helper function that will check the state of the current user in firebase and fetch the user using the JWT token from localstorage and the uid
      const user = await getUserData();
      // console.log(`Get user:`,user)
      if (user) setUserDetails(user);
    }

    getUser();
  }, []);

  // if (!userDetails) return alert(`Error with backend fetch data lost`);

  return (
    <div className="text-text h-screen">
      {fakeUser ? (
        <div className="grid grid-cols-3 p-8">
          <div className="col-span-1">
            <div className="flex justify-center items-center bg-gray-500 w-3/4 rounded-lg">
              <div className="min-w-fit p-4">
                <div className="flex flex-row items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-shield-half mr-2"
                  >
                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                    <path d="M12 22V2" />
                  </svg>
                  <p className="text-3xl font-bold">{`${fakeUser.first_name} ${fakeUser.last_name}`}</p>
                </div>

                <p className="font-bold mb-2">Win/Loss Record:</p>
                <div className="flex">
                  <div className="flex gap-1">
                    <p>{fakeUser.user_wins}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-crown"
                    >
                      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                      <path d="M5 21h14" />
                    </svg>
                  </div>
                  <div className="flex gap-1 mx-2">
                    <p>{fakeUser.user_losses}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-circle-x"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img src={placeholderImage} className="w-1/3" alt="" />
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <UpcomingGames />
          </div>
        </div>
      ) : (
        <>
          <h2>Loading...</h2>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Profile;
