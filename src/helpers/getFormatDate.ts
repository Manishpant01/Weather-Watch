export const formateDate = (): string => {
  const date = new Date();
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
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

  const weekday = weekdays[date.getDay()]; // Get the weekday name
  const month = months[date.getMonth()]; // Get the month name
  const day = date.getDate(); // Get the day of the month
  const year = date.getFullYear(); // Get the full year

  const formattedDate = `${weekday}, ${month} ${day}, ${year}`;

  return formattedDate;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
