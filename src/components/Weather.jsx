import { useState } from "react";
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
import { useClickOutside } from "@mantine/hooks";
import { Search, MapPin } from "lucide-react";
import WeatherDashboard from "@/features/WeatherDashboard";
import ErrorMessage from "./ErrorMessage";
import DateToday from "./DateToday";
import WeatherSkeleton from "./WeatherSkeleton";

const Weather = ({ defaultCity }) => {
  const [opened, setOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpened(false));

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
              <Box ref={clickOutsideRef} style={{ position: "relative" }}>
                <TextInput
                  className="nav__input"
                  placeholder="Search location... (e.g. Oslo)"
                  value={city}
                  onFocus={() => setOpened(true)}
                  onChange={(e) => {
                    setCity(e.currentTarget.value);
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
                  rightSection={<Search size={20} />}
                  bg="var(--mantine-color-primary)"
                  styles={{
                    root: {
                      backdropFilter: "none",
                      opacity: 1,
                    },
                  }}
                />
                {opened && suggestions.length > 0 && (
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
                          onClick={() => {
                            getWeatherData(s.lat, s.lon, s.name, s.country);
                            setCity(`${s.name}, ${s.country}`);
                            setOpened(false);
                          }}
                        >
                          <Text size="sm" fw={500}>
                            {s.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {s.state ? `${s.state}, ` : ""}
                            {s.country}
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

        {isLoading ? (
          <WeatherSkeleton />
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
