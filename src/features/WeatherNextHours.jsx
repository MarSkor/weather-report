import {
  Paper,
  Text,
  SimpleGrid,
  Stack,
  Title,
  Box,
  Group,
  useMantineTheme,
} from "@mantine/core";

import { Droplets } from "lucide-react";
import { tempMathRound, convertTimeStamp } from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";

const WeatherNextHours = ({ data, unit }) => {
  const theme = useMantineTheme();
  const unitSymbol = unit === "metric" ? "°" : "°";
  const hourlyData = data.slice(1, 7);

  return (
    <Box>
      <Group justify="space-between" mb="lg">
        <Title order={4} fw={600} c="indigo.1" lts={1} tt={"uppercase"}>
          Hourly Forecast
        </Title>
      </Group>

      <SimpleGrid cols={{ base: 3, sm: 3, lg: 6 }} spacing="xs">
        {hourlyData.map((hour, index) => (
          <Paper
            key={index}
            p="sm"
            radius="lg"
            className="weather-card weather-hourly-card"
          >
            <Stack align="center" gap={4}>
              <Text size="sm" fw={600} c="indigo.2">
                {convertTimeStamp(hour.dt)}
              </Text>

              <Box py={2}>
                <WeatherIcon size={48} code={hour.weather[0].icon} />
              </Box>

              <Text fw={700} size="lg" lts={-0.5}>
                {tempMathRound(hour.temp)}
                {unitSymbol}
              </Text>

              <Group gap={2} opacity={hour.pop > 0 ? 1 : 0}>
                <Droplets
                  size={12}
                  color={theme.colors.blue[5]}
                  fill={theme.colors.blue[5]}
                />
                <Text size="xs" fw={700} c="blue.6">
                  {Math.round(hour.pop * 100)}%
                </Text>
              </Group>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WeatherNextHours;
