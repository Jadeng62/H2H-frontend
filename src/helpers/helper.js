export function formattedDate(iso) {
  const date = new Date(iso);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthNames[month]} ${day}, ${year}`;
}

export function formattedTime(iso) {
  const date = new Date(iso);
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  let period = "AM";

  let formattedHour = hour;
  if (hour >= 12) {
    formattedHour = hour === 12 ? 12 : hour - 12;
    period = "PM";
  }
  if (formattedHour === 0) {
    formattedHour = 12;
  }
  const formattedMinute = minute < 10 ? `0${minute}` : minute;

  return `${formattedHour}:${formattedMinute} ${period}`;
}

export function formatPositionSpelling(position) {
  if (position.includes(" ")) {
    const [firstWord, secondWord] = position.split(" ");

    const firstChar = firstWord[0].toUpperCase();
    const formattedFirstWord = `${firstChar}${firstWord.slice(1)}`;

    const secondChar = secondWord[0].toUpperCase();
    const formattedSecondWord = `${secondChar}${secondWord.slice(1)}`;

    return `${formattedFirstWord} ${formattedSecondWord}`;
  } else {
    const firstChar = position[0].toUpperCase();
    return `${firstChar}${position.slice(1)}`;
  }
}

// function renderJoinButton(userDetails, selectedTeam) {
//   const positionKeyWord = `${userDetails.position.replace(" ", "_")}_id`;

//   if (
//     selectedTeam[positionKeyWord] === null &&
//     userDetails.user_team_id === null
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// }

// console.log(
//   joinTeamIfEligibe(
//     { position: "shooting guard" },
//     {
//       captain_id: 17,
//       center_id: null,
//       created_at: "2024-07-19T16:05:43.464Z",
//       id: 5,
//       logo: "team_e_logo.jpg",
//       matches_played: 0,
//       point_guard_id: 17,
//       power_forward_id: null,
//       shooting_guard_id: null,
//       small_forward_id: null,
//       team_loss: 0,
//       team_name: "Team E",
//       team_pic: "team_e_pic.jpg",
//       team_wins: 0,
//       updated_at: "2024-07-19T16:05:43.464Z",
//     }
//   )
// );

// console.log(formatPositionSpelling("forward"));
