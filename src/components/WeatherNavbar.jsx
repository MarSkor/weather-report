import {
  Paper,
  Grid,
  Group,
  Text,
  Box,
  TextInput,
  ActionIcon,
  Container,
} from "@mantine/core";
import { MapPin, Search } from "lucide-react";
import { useClickOutside } from "@mantine/hooks";
import { useState } from "react";
import DateToday from "./DateToday";
import UnitToggle from "./UnitToggle";

const WeatherNavbar = ({
  city,
  setCity,
  suggestions,
  getWeatherData,
  handleLocationClick,
  isLoading,
  unit,
  setUnit,
}) => {
  const [opened, setOpened] = useState(false);
  const clickOutsideRef = useClickOutside(() => setOpened(false));

  return (
    <Container size="xl" pt={"md"} className="layout__navbar" component={"nav"}>
      <Paper shadow="xs" p="md" mb="md" withBorder radius="md">
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
                tabIndex={0}
                size="md"
                className="nav__input"
                placeholder="Search location... (e.g. Oslo)"
                value={city}
                onFocus={() => setOpened(true)}
                onChange={(e) => {
                  setCity(e.currentTarget.value);
                }}
                leftSection={
                  <ActionIcon
                    aria-label="Use current location"
                    title="Find your location."
                    variant="subtle"
                    color="indigo.4"
                    onClick={handleLocationClick}
                    loading={isLoading}
                  >
                    <MapPin size={18} aria-hidden="true" />
                  </ActionIcon>
                }
                rightSection={<Search size={20} />}
              />
              {opened && suggestions.length > 0 && (
                <Paper
                  tabIndex={0}
                  withBorder
                  shadow="md"
                  className="nav__input-suggestions"
                  bg={"#12133b"}
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
                          <Text size="sm" c="red.4">
                            {s.message}
                          </Text>
                        </Box>
                      );
                    }

                    return (
                      <Box
                        tabIndex={0}
                        key={i}
                        p="xs"
                        className="nav__input-suggestions--item"
                        onClick={() => {
                          getWeatherData(s.lat, s.lon, s.name, s.country);
                          setCity(`${s.name}, ${s.country}`);
                          setOpened(false);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter")
                            getWeatherData(s.lat, s.lon, s.name, s.country);
                          if (e.key === "ArrowDown")
                            e.currentTarget.nextSibling?.focus();
                          if (e.key === "ArrowUp")
                            e.currentTarget.previousSibling?.focus();
                        }}
                      >
                        <Text size="md" fw={500}>
                          {s.name}
                        </Text>
                        <Text size="sm" c="indigo.2">
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
            <UnitToggle unit={unit} setUnit={setUnit} />
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
};

export default WeatherNavbar;
