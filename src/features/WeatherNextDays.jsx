import {
  Paper,
  Text,
  SimpleGrid,
  Stack,
  Group,
  Title,
  Divider,
  Box,
} from "@mantine/core";
import {
  ThermometerSun,
  ThermometerSnowflake,
  CloudRain,
  Snowflake,
} from "lucide-react";
import { tempMathRound, convertTimeStampToDay } from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";

const WeatherNextDays = ({ data, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const dailyData = data.slice(1, 7);

  return (
    <Stack gap="md">
      <Title
        order={4}
        fw={600}
        color="gray.5"
        style={{ textTransform: "uppercase", letterSpacing: "1px" }}
      >
        7-Day Forecast
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {dailyData.map((day, index) => (
          <Paper
            key={index}
            withBorder
            p="md"
            radius="md"
            shadow="xs"
            className="weather-card"
            bg="var(--mantine-color-primary)"
          >
            <Stack gap="sm">
              <Stack gap={0} flex={1}>
                <Text fw={700} size="md">
                  {convertTimeStampToDay(day.dt)}
                </Text>
                <Text
                  truncate
                  size="xs"
                  c="gray.5"
                  fw={500}
                  style={{ textTransform: "capitalize" }}
                >
                  {day.weather[0].description}
                </Text>
              </Stack>
              <Group justify="center" py="xs">
                <WeatherIcon size={42} code={day.weather[0].icon} />
              </Group>

              <Divider variant="dashed" />

              <Group justify="space-between" wrap="wrap" gap="xs">
                <Group gap={6} wrap="nowrap" align="center">
                  <ThermometerSun
                    size={14}
                    color="var(--mantine-color-orange-6)"
                  />
                  <Text size="sm" fw={500}>
                    {tempMathRound(day.temp.max)}
                    {unitSymbol}
                  </Text>
                </Group>

                <Group gap={6} wrap="nowrap">
                  <ThermometerSnowflake
                    size={14}
                    color="var(--mantine-color-cyan-6)"
                  />
                  <Text size="sm" fw={500}>
                    {tempMathRound(day.temp.min)}
                    {unitSymbol}
                  </Text>
                </Group>

                <Group gap={6} wrap="nowrap">
                  <CloudRain size={14} color="var(--mantine-color-blue-6)" />
                  <Text
                    size="sm"
                    fw={500}
                    c={day.rain > 0 ? "blue.4" : "gray.6"}
                  >
                    {Math.round(day.rain || 0)} mm
                  </Text>
                </Group>

                {day.snow > 0 ? (
                  <Group gap={6} wrap="nowrap">
                    <Snowflake
                      size={14}
                      color="var(--mantine-color-indigo-4)"
                    />
                    <Text size="sm" fw={500}>
                      {Math.round(day.snow)} mm
                    </Text>
                  </Group>
                ) : (
                  <Box visibleFrom="sm" />
                )}
              </Group>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default WeatherNextDays;
