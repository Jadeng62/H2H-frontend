// state for current saying
export const [currentSaying, setCurrentSaying] = useState("");
// array of sayings for when a user still needs a full team to play
export const sayings = [
  "The game requires a full team lineup; assemble your squad!",
  "Complete your team roster before stepping onto the field of play.",
  "Remember, a complete team is essential for game participation.",
  "No substitutions for a full team; gather your players!",
  "Team up! You need a full squad to hit the field.",
  "Game on! Ensure your team is complete for match day.",
  "Can't play solo; recruit your team for match participation.",
  "Don't leave gaps on the roster; a full team is required.",
  "Check your lineup; a complete team is necessary for gameplay.",
  "There's no I and team. You need a full team to play in matches.",
];

// function to cycle through sayings to encourage user to get a full team in order to play matches
export const selectRandomSaying = () => {
  const randomIndex = Math.floor(Math.random() * sayings.length);
  setCurrentSaying(sayings[randomIndex]);
};
