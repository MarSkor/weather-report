import {
  Snowflake,
  CloudRain,
  CloudLightning,
  Wind,
  Waves,
  ThermometerSnowflake,
  ThermometerSun,
  CloudFog,
  Tornado,
  CloudHail,
  Factory,
  Flame,
  Ship,
  MountainSnow,
} from "lucide-react";

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

// https://docs.openweather.co.uk/openweather-alerts
export const ALERT_TAG = {
  snow_ice: { icon: Snowflake, color: "blue" },
  "snow/ice": { icon: Snowflake, color: "blue" },
  rain: { icon: CloudRain, color: "blue" },
  thunderstorm: { icon: CloudLightning, color: "yellow" },
  wind: { icon: Wind, color: "gray" },
  flood: { icon: Waves, color: "cyan" },
  extreme_low_temperature: { icon: ThermometerSnowflake, color: "blue" },
  extreme_high_temperature: { icon: ThermometerSun, color: "orange" },
  fog: { icon: CloudFog, color: "gray" },
  tornado: { icon: Tornado, color: "red" },
  hail: { icon: CloudHail, color: "blue" },
  fire_warning: { icon: Flame, color: "orange" },
  air_quality: { icon: Factory, color: "gray" },
  coastal_event: { icon: Ship, color: "blue" },
  marine_event: { icon: Ship, color: "blue" },
  avalanches: { icon: MountainSnow, color: "blue" },
};

export const degToDir = (degree) => {
  const val = Math.floor(degree / 22.5 + 0.5);
  return WIND_DIRECTIONS[val % 16];
};

export const formatWindSpeed = (speed, unitSymbol, deg, gust, degToDir) => {
  const unitLabel = unitSymbol === "metric" ? "m/s" : "mph";
  const direction = degToDir(deg);
  const roundedSpeed = Math.round(speed);
  const gustPart = gust ? ` (${Math.round(gust)})` : "";

  return `${roundedSpeed} ${unitLabel} ${direction}${gustPart}`;
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
