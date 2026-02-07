import { Container, Flex, Text } from "@mantine/core";
import { useWeather } from "@/hooks/useWeather";
import WeatherDashboard from "@/features/WeatherDashboard";
import ErrorMessage from "./ErrorMessage";
import WeatherSkeleton from "./WeatherSkeleton";
import WeatherNavbar from "./WeatherNavbar";

const Weather = ({ defaultCity }) => {
  const {
    weather,
    city,
    setCity,
    isError,
    isLoading,
    unit,
    setUnit,
    suggestions,
    getWeatherData,
    handleLocationClick,
  } = useWeather(defaultCity);

  return (
    <main className="layout">
      <WeatherNavbar
        city={city}
        setCity={setCity}
        suggestions={suggestions}
        getWeatherData={getWeatherData}
        handleLocationClick={handleLocationClick}
        isLoading={isLoading}
        unit={unit}
        setUnit={setUnit}
      />
      <Container
        size="xl"
        className="layout__weather-wrapper"
        component={"section"}
      >
        {isError && <ErrorMessage message={isError} />}

        {isLoading ? (
          <WeatherSkeleton />
        ) : (
          weather.ready && (
            <WeatherDashboard weatherData={weather} unit={unit} />
          )
        )}
      </Container>
      <Container size="xl" component={"section"} className="layout__footer">
        <Flex component="footer" mt={"md"}>
          <Text
            fw={500}
            c={"indigo.2"}
            opacity={0.5}
            size="sm"
            tt={"uppercase"}
            component="a"
            href="https://github.com/MarSkor/weather-report"
            target="_blank"
          >
            Source Code
          </Text>
        </Flex>
      </Container>
    </main>
  );
};

export default Weather;
