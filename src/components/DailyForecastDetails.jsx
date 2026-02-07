import { Stack, Group, Title, Text, Divider, SimpleGrid } from "@mantine/core";
import {
  CloudRain,
  CloudSnow,
  Droplets,
  Wind,
  SunDim,
  ThermometerSun,
  ThermometerSnowflake,
  Sunrise,
  Sunset,
} from "lucide-react";
import WeatherIcon from "@/components/WeatherIcon";
import {
  tempMathRound,
  degToDir,
  convertTimeStamp,
  getUVCategory,
  formatWindSpeed,
} from "@/utils/weatherHelpers";
import WeatherDetail from "./WeatherDetail";

const DailyForecastDetail = ({ day, unitSymbol, weatherUnit }) => {
  const rain = day.rain || 0;
  const snow = day.snow || 0;
  const precipIcon = snow > 0 ? CloudSnow : CloudRain;

  let precipValue = "0 mm";
  if (rain > 0 && snow > 0) {
    precipValue = `R: ${rain} / S: ${snow} mm`;
  } else if (rain > 0) {
    precipValue = `${rain} mm`;
  } else if (snow > 0) {
    precipValue = `${snow} mm`;
  }

  return (
    <Stack gap="lg">
      <Group justify="space-between" align="center" wrap="nowrap">
        <Stack gap={8}>
          <Title order={1} size="3.5rem" c="white" lh={1}>
            {tempMathRound(day.temp.max)}
            {unitSymbol}
          </Title>
          <Text size="sm" c="gray.5" mt={4}>
            Feels like {tempMathRound(day.feels_like.day)}
            {unitSymbol}
          </Text>
        </Stack>
        <WeatherIcon size={100} code={day.weather[0].icon} />
      </Group>

      <Text ta="center" size="xl" fw={500} style={{ textTransform: "initial" }}>
        {day.summary || day.weather[0].description}
      </Text>

      <Divider
        label="Weather Conditions"
        labelPosition="center"
        color="indigo.1"
        opacity={0.8}
        styles={{
          label: {
            color: "var(--mantine-color-indigo-1)",
          },
        }}
      />

      <SimpleGrid cols={2} spacing="sm" verticalSpacing={"xl"}>
        <WeatherDetail
          icon={ThermometerSun}
          title="High"
          value={`${tempMathRound(day.temp.max)}${unitSymbol}`}
          colorIcon="orange.5"
          ariaLabel={`High temperature: ${tempMathRound(day.temp.max)}${unitSymbol}`}
        />
        <WeatherDetail
          icon={ThermometerSnowflake}
          title="Low"
          value={`${tempMathRound(day.temp.min)}${unitSymbol}`}
          colorIcon="cyan.4"
          ariaLabel={`Low temperature: ${tempMathRound(day.temp.min)}${unitSymbol}`}
        />
        <WeatherDetail
          icon={precipIcon}
          title="Precipitation"
          value={precipValue}
          colorIcon="blue.5"
          ariaLabel={`Precipitation: ${precipValue}`}
        />
        <WeatherDetail
          icon={Droplets}
          title="Humidity"
          value={`${day.humidity}%`}
          colorIcon="teal.4"
          ariaLabel={`Humidity: ${day.humidity}%`}
        />
        <WeatherDetail
          icon={Wind}
          title="Wind Speed"
          value={formatWindSpeed(
            day.wind_speed,
            weatherUnit,
            day.wind_deg,
            day.wind_gust,
            degToDir,
          )}
          colorIcon="indigo.2"
          ariaLabel={`Wind speed is ${Math.round(day.wind_speed)} ${weatherUnit === "metric" ? "meters per second" : "miles per hour"}`}
        />
        <WeatherDetail
          icon={SunDim}
          title="UV Index"
          value={`${Math.round(day.uvi)} ${getUVCategory(day.uvi)}`}
          colorIcon="yellow.4"
          ariaLabel={`UV Index: ${day.uvi}, ${getUVCategory(day.uvi)}`}
        />
      </SimpleGrid>

      <Divider color="indigo.1" opacity={0.8} />
      {day.sunrise && (
        <SimpleGrid cols={2} spacing="xl">
          <WeatherDetail
            icon={Sunrise}
            title={"Sunrise"}
            value={convertTimeStamp(day.sunrise)}
            colorIcon="orange.5"
            ariaLabel={`Sunrise at ${convertTimeStamp(day.sunrise)}`}
          />

          <WeatherDetail
            icon={Sunset}
            title={"Sunset"}
            value={convertTimeStamp(day.sunset)}
            colorIcon="indigo.1"
            ariaLabel={`Sunset at ${convertTimeStamp(day.sunset)}`}
          />
        </SimpleGrid>
      )}
    </Stack>
  );
};

export default DailyForecastDetail;
