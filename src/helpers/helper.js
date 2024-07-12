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
