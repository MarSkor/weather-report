import {
  Container,
  Grid,
  TextInput,
  Paper,
  Group,
  Text,
  SegmentedControl,
  Loader,
  ActionIcon,
  Box,
} from "@mantine/core";
import { useWeather } from "@/hooks/useWeather";
import { Search, MapPin } from "lucide-react";
import WeatherDashboard from "@/features/WeatherDashboard";
import ErrorMessage from "./ErrorMessage";
import DateToday from "./DateToday";

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
    getSuggestions,
    getWeatherData,
    handleLocationClick,
  } = useWeather(defaultCity);

  return (
    <main className="layout">
      <Container size="xl" pt={"md"} className="layout__navbar">
        <Paper shadow="xs" p="md" mb="xl" withBorder radius="md">
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 3 }}>
              <Group gap={0}>
                <Text fw={800} size="xl">
                  Weather
                </Text>
                <Text fw={200} size="xl">
                  Report.
                </Text>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <DateToday />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Box style={{ position: "relative" }}>
                <TextInput
                  className="nav__input"
                  placeholder="Search location... (e.g. Oslo)"
                  value={city}
                  onChange={(e) => {
                    setCity(e.currentTarget.value);
                    getSuggestions(e.currentTarget.value);
                  }}
                  leftSection={
                    <ActionIcon
                      title="Find your location."
                      variant="subtle"
                      color="indigo.4"
                      onClick={handleLocationClick}
                      loading={isLoading}
                    >
                      <MapPin size={18} />
                    </ActionIcon>
                  }
                  rightSection={
                    <ActionIcon variant="subtle" color="gray">
                      <Search size={20} />
                    </ActionIcon>
                  }
                  bg="var(--mantine-color-primary)"
                  styles={{
                    root: {
                      backdropFilter: "none",
                      opacity: 1,
                    },
                  }}
                />
                {suggestions.length > 0 && (
                  <Paper
                    withBorder
                    shadow="md"
                    className="nav__input-suggestions"
                    styles={{
                      root: {
                        backgroundColor: "#1a1b3e",
                        backdropFilter: "none",
                        opacity: 1,
                        overflow: "hidden",
                      },
                    }}
                  >
                    {suggestions.map((s, i) => {
                      if (s.noResults) {
                        return (
                          <Box key="no-results" p="xs">
                            <Text size="sm" c="gray.5" ta="center">
                              No locations found matching "{city}"
                            </Text>
                          </Box>
                        );
                      }
                      if (s.isError) {
                        return (
                          <Box key="error" p="xs">
                            <Text size="xs" c="red.4">
                              {s.message}
                            </Text>
                          </Box>
                        );
                      }

                      return (
                        <Box
                          key={i}
                          p="xs"
                          className="nav__input-suggestions--item"
                          onClick={() =>
                            getWeatherData(s.lat, s.lon, s.name, s.country)
                          }
                        >
                          <Text size="sm">
                            {s.name}
                            {s.state ? `, ${s.state}` : ""}, {s.country}
                          </Text>
                        </Box>
                      );
                    })}
                  </Paper>
                )}
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 2 }}>
              <Group justify="flex-end">
                <SegmentedControl
                  value={unit}
                  onChange={setUnit}
                  data={[
                    { label: "°C", value: "metric" },
                    { label: "°F", value: "imperial" },
                  ]}
                  classNames={{
                    root: "nav__unit-wrapper",
                    indicator: "nav__unit-indicator",
                    label: "nav__unit-label",
                  }}
                />
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>

      <Container size="xl" className="layout__weather-wrapper">
        {isError && <ErrorMessage message={isError} />}

        {isLoading && !weather.ready ? (
          <Group justify="center" py="xl">
            <Loader size="xl" color="var(--color-yellow)" />
          </Group>
        ) : (
          weather.ready && (
            <WeatherDashboard weatherData={weather} unit={unit} />
          )
        )}
      </Container>
    </main>
  );
};

export default Weather;
