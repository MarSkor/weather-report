import { CloudRain, Snowflake, Droplets, Wind, SunDim } from "lucide-react";
import {
  tempMathRound,
  convertTimeStampToDay,
  degToDir,
  getUVCategory,
} from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";
import {
  Paper,
  Text,
  SimpleGrid,
  Stack,
  Group,
  Title,
  Divider,
  Box,
  ThemeIcon,
} from "@mantine/core";

const WeatherNextDays = ({ data, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const dailyData = data.slice(1, 7);

  return (
    <Stack gap="md">
      <Title
        order={4}
        fw={600}
        color="indigo.1"
        style={{ textTransform: "uppercase", letterSpacing: "1px" }}
      >
        7-Day Forecast
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {dailyData.map((day, index) => (
          <Paper
            key={index}
            p="sm"
            radius="md"
            className="weather-card"
            style={{
              backgroundColor: "var(--mantine-color-primary)",
            }}
          >
            <Stack gap="md">
              <Group justify="space-between" align="flex-start" wrap="nowrap">
                <Stack gap={4}>
                  <Text fw={600} size="lg" c="white" lh={1.2}>
                    {convertTimeStampToDay(day.dt)}
                  </Text>
                  <Text
                    size="sm"
                    c="indigo.2"
                    fw={500}
                    style={{ textTransform: "capitalize", opacity: 0.7 }}
                  >
                    {day.weather[0].description}
                  </Text>
                </Stack>
                <WeatherIcon size={48} code={day.weather[0].icon} />
              </Group>

              <Group gap="xs" align="center">
                <Text size="xl" fw={800} c="white" fz={"xl"}>
                  {tempMathRound(day.temp.max)}
                  {unitSymbol}
                </Text>
                <Box
                  style={{
                    height: "4px",
                    width: "40px",
                    borderRadius: "2px",
                    background:
                      "linear-gradient(90deg, var(--mantine-color-orange-6), var(--mantine-color-cyan-6))",
                    opacity: 0.6,
                  }}
                />
                <Text
                  size="md"
                  fw={600}
                  c="indigo.1"
                  fz={"xl"}
                  style={{ opacity: 0.6 }}
                >
                  {tempMathRound(day.temp.min)}
                  {unitSymbol}
                </Text>
              </Group>

              <Divider color="rgba(255, 255, 255, 0.08)" />

              <SimpleGrid cols={2} spacing="xs">
                <Group gap={6} wrap="nowrap" title="Precipitation">
                  <ThemeIcon variant="transparent" size="sm" c="blue.4">
                    <CloudRain size={16} />
                  </ThemeIcon>
                  <Text
                    size="xs"
                    fw={600}
                    c={day.rain > 0 ? "blue.2" : "gray.6"}
                  >
                    {Math.round(day.rain || 0)} mm
                  </Text>
                </Group>

                {day.snow > 0 ? (
                  <Group gap={6} wrap="nowrap" title="Snowfall">
                    <ThemeIcon variant="transparent" size="sm" c="indigo.2">
                      <Snowflake size={16} />
                    </ThemeIcon>

                    <Text size="xs" fw={600} c="indigo.1">
                      {Math.round(day.snow)} mm
                    </Text>
                  </Group>
                ) : (
                  <Group gap={6} wrap="nowrap" title="Humidity">
                    <ThemeIcon variant="transparent" size="sm" c="teal.4">
                      <Droplets size={16} />
                    </ThemeIcon>
                    <Text size="xs" fw={600} c="gray.6">
                      {day.humidity}%
                    </Text>
                  </Group>
                )}
                <Group gap={6} wrap="nowrap" title="Wind Speed & Direction">
                  <ThemeIcon variant="transparent" size="sm" c="indigo.2">
                    <Wind size={16} />
                  </ThemeIcon>
                  <Text size="xs" fw={600} c="indigo.1">
                    {`${Math.round(day.wind_speed)} m/s ${degToDir(day.wind_deg)} ${day.wind_gust ? `(${Math.round(day.wind_gust)})` : ""}`}
                  </Text>
                </Group>
                <Group gap={6} wrap="nowrap" title="UV Index">
                  <ThemeIcon variant="transparent" size="sm" c="yellow.4">
                    <SunDim size={16} />
                  </ThemeIcon>
                  <Text size="xs" fw={600} c="indigo.1">
                    {day.uvi} {getUVCategory(day.uvi)}
                  </Text>
                </Group>
              </SimpleGrid>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default WeatherNextDays;
