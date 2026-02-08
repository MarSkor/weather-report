import { Container } from "@mantine/core";
import { useWeather } from "@/hooks/useWeather";
import WeatherDashboard from "@/features/WeatherDashboard";
import ErrorMessage from "../components/ErrorMessage";
import WeatherSkeleton from "../components/WeatherSkeleton";
import WeatherNavbar from "../components/WeatherNavbar";
import Footer from "@/components/Footer";

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
      <Footer />
    </main>
  );
};

export default Weather;
