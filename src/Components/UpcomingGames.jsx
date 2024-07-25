import { useNavigate } from "react-router-dom";
import { formattedDate, formattedTime } from "../helpers/helper";
import { Info } from "lucide-react";

const UpcomingGames = ({ userDetails, upcomingGames }) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-white bg-secondary/30 rounded-lg w-full h-full mb-10">
      <div className="align-middle flex">
        <h1 className="text-4xl font-extrabold bebas-neue-regular p-4">
          Upcoming Matches
        </h1>
      </div>
      {userDetails && userDetails.user_team_id === null ? (
        <div className="inline-flex justify-center flex-col items-center bg-secondary/30 py-4 mx-auto w-full sm:mt-20">
          <h1 className="text-center text-xl font-bold">
            Join or Create a Team Now!
          </h1>
          <button
            className="mt-4 bg-primary hover:bg-accent text-black font-bold py-2 px-4 rounded"
            onClick={() => navigate("/createTeam")}
          >
            +
          </button>
        </div>
      ) : userDetails && upcomingGames.length > 0 ? (
        <div className="px-4 pb-4 flex overflow-x-auto">
          <table className="w-full h-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-text uppercase bg-accent">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Date
                </th>
                <th scope="col" className="px-6 py-4">
                  Time
                </th>
                <th scope="col" className="px-6 py-4">
                  Match Up
                </th>
              </tr>
            </thead>
            <tbody className="">
              {upcomingGames.map((game) => (
                <tr
                  className="bg-white border-b hover:bg-gray-100"
                  onClick={() => navigate(`/matches/${game.id}`)}
                  key={game.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {formattedDate(game.start_datetime)}
                  </th>
                  <td className="px-6 py-5">
                    {formattedTime(game.start_datetime)}
                  </td>
                  <td className="px-6 py-5">{game.opponentTeamName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="inline-flex justify-center items-center bg-secondary/30 py-5 mx-auto w-full">
            <h1 className="text-center text-xl font-bold">
              Your Team Has No Upcoming Matches
            </h1>
            {/* <h1 className="text-center text-xl font-bold my-4">
              Click Here to Join or Create A Match
            </h1>
            <button
              className=" bg-primary hover:bg-accent text-black font-bold py-2 px-24 rounded"
              onClick={() => navigate("/matches")}
            >
              +
            </button> */}
          </div>
          <div className="bg-secondary/10 p-5 mt-10 mb-10 mx-10 lg:mb-10 rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col shadow-2xl">
            <div className="flex flex-row items-center mb-2">
              <span className="mr-5">
                <Info size={28} className="text-primary/50" />
              </span>
              <span className="font-semibold">Not Enough Data</span>
            </div>
            <span className="ml-12">
              A team must first sign up to or create a match to see any upcoming
              games.
            </span>

            <span
              onClick={() => navigate(`/matches`)}
              className="bg-primary/50 mt-5 p-2 px-3 rounded-lg ml-12 mr-auto border-2 border-secondary/40 hover:border-primary/30 hover:bg-secondary/20 shadow-xl cursor-pointer"
            >
              Go to Matches
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default UpcomingGames;
