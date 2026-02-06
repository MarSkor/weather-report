export const tempMathRound = (temp) => Math.round(temp).toString();

const WIND_DIRECTIONS = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export const degToDir = (degree) => {
  const val = Math.floor(degree / 22.5 + 0.5);
  return WIND_DIRECTIONS[val % 16];
};

export const convertTimeStamp = (dt) => {
  return new Date(dt * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const convertTimeStampToDay = (dt) => {
  return new Date(dt * 1000).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
  });
};

export const convertTimeStampToFullDay = (dt) => {
  return new Date(dt * 1000).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getUVCategory = (uvi) => {
  if (uvi <= 2) return "Low";
  if (uvi <= 5) return "Moderate";
  if (uvi <= 7) return "High";
  if (uvi <= 10) return "Very High";
  return "Extreme";
};
