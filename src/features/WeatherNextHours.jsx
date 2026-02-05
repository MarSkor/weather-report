import { Paper, Text, SimpleGrid, Stack, Title, Box } from "@mantine/core";
import { Droplets } from "lucide-react";
import { tempMathRound, convertTimeStamp } from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";

const WeatherNextHours = ({ data, unit }) => {
  const unitSymbol = unit === "metric" ? "°C" : "°F";
  const hourlyData = data.slice(1, 7);

  return (
    <Box>
      <Title
        order={4}
        mb="md"
        fw={600}
        color="gray.5"
        style={{ textTransform: "uppercase", letterSpacing: "1px" }}
      >
        Upcoming Hours
      </Title>

      <SimpleGrid cols={{ base: 2, sm: 3, lg: 6 }} spacing="md">
        {hourlyData.map((hour, index) => (
          <Paper
            key={index}
            withBorder
            p="sm"
            radius="md"
            bg="var(--mantine-color-primary)"
            className="weather-card"
          >
            <Stack align="center" gap={4}>
              <Text size="xs" fw={700} c="gray.4">
                {convertTimeStamp(hour.dt)}
              </Text>

              <Box py={4}>
                <WeatherIcon size={42} code={hour.weather[0].icon} />
              </Box>

              <Text fw={500} size="lg">
                {tempMathRound(hour.temp)}
                {unitSymbol}
              </Text>

              {hour.pop > 0 && (
                <Stack align="center" gap={0}>
                  <Text
                    size="xs"
                    c="blue"
                    fw={400}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <Droplets size={10} />
                    {Math.round(hour.pop * 100)}%
                  </Text>
                </Stack>
              )}
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WeatherNextHours;
