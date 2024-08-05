import { useNavigate } from "react-router-dom";
import { formattedDate, formattedTime } from "../helpers/helper";
import { CircleCheck, Info } from "lucide-react";

const UpcomingGames = ({ userDetails, upcomingGames }) => {
  const navigate = useNavigate();

  return (
    <div className="border-2 border-white bg-secondary/30 rounded-lg w-full h-full">
      <div className="flex max-md:justify-center">
        <h1 className="text-4xl font-extrabold bebas-neue-regular p-4">
          Upcoming Matches
        </h1>
      </div>
      {userDetails && userDetails.user_team_id === null ? (
        <div className="inline-flex justify-center flex-col items-center bg-secondary/30 py-4 mx-auto  w-full sm:mt-20">
          <h1 className="text-center text-xl font-bold">
            Join or Create a Team Now!
          </h1>
          <div className="flex flex-col lg:flex-row gap-2">
            <button
              className="mt-4 bg-primary hover:bg-tertiary text-black hover:text-black text-lg font-bold py-3 px-6 rounded shadow-black/70 shadow-md"
              onClick={() => navigate("/createTeam")}
            >
              Create Team
            </button>
            <button
              className="mt-4 bg-primary hover:bg-tertiary text-black font-bold py-3 px-6 rounded hover:text-black shadow-black/70 shadow-md text-lg"
              onClick={() => navigate("/teamSearch")}
            >
              Join Team
            </button>
          </div>
        </div>
      ) : userDetails && upcomingGames.length > 0 ? (
        <div className="grid grid-rows-2 grid-cols-1">
          {/* <div className="row-span-2 px-4 pb-4 flex overflow-x-auto bebas-neue-regular max-h-80"> */}
          <div className="row-span-1 relative overflow-x-auto overflow-y-auto px-4 mb-8 bebas-neue-regular max-h-72">
            <table
              className="text-left rtl:text-right text-gray-500 dark:text-gray-400"
              style={{ width: "100%" }}
            >
              <thead className="text-text uppercase bg-accent">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-3xl max-md:text-lg max-md:px-3"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-3xl max-md:text-lg max-md:px-3"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-3xl max-md:text-lg max-md:px-3"
                  >
                    Match Up
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {upcomingGames.map((game) => (
                  <tr
                    className="bg-white border-b text-2xl hover:bg-gray-100"
                    onClick={() => navigate(`/matches/${game.id}`)}
                    key={game.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 font-medium text-gray-900 whitespace-nowrap max-md:text-lg max-md:px-3"
                    >
                      {formattedDate(game.start_datetime)}
                    </th>
                    <td className="px-6 py-5 max-md:text-lg max-md:px-3">
                      {formattedTime(game.start_datetime)}
                    </td>
                    <td className="px-6 py-5 max-md:text-lg max-md:px-3">
                      {game.opponentTeamName ? game.opponentTeamName : "TBD"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row-span-1 bg-secondary/10 p-5 mx-4 h-fit rounded-lg text-text text-lg border-4 border-secondary/10 flex flex-col shadow-2xl">
            <div className="flex flex-row items-center">
              <span className="mr-5">
                <CircleCheck size={28} className="text-primary/50" />
              </span>
              <span className="font-semibold">You're Team is All Set!</span>
            </div>
            <span className="ml-12">Click here to view match details.</span>

            <span
              onClick={() => navigate(`/matches`)}
              className="bg-primary/50 mt-5 p-2 px-3 rounded-lg ml-12 mr-auto border-2 border-secondary/40 hover:border-primary/30 hover:bg-secondary/20 shadow-xl cursor-pointer"
            >
              See All Matches
            </span>
          </div>
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
              Your team must first sign up to or create a match to see any
              upcoming games.
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
