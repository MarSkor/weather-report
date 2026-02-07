import { tempMathRound, convertTimeStampToDay } from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";
import {
  SimpleGrid,
  Paper,
  Stack,
  Group,
  Text,
  Box,
  Title,
  Modal,
} from "@mantine/core";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import DailyForecastDetail from "@/components/DailyForecastDetails";

const WeatherNextDays = ({ data, unit }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const unitSymbol = unit === "metric" ? "°" : "°";
  const weatherUnit = unit === "metric" ? "metric" : "imperial";
  const dailyData = data.slice(1, 7);

  const handleCardClick = (day) => {
    setSelectedDay(day);
    open();
  };

  return (
    <Stack gap="md">
      <Title order={4} fw={600} c="indigo.1" lts={1} tt={"uppercase"}>
        7-Day Forecast
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {dailyData.map((day, index) => (
          <Paper
            key={index}
            onClick={() => handleCardClick(day)}
            aria-label={`View details for ${convertTimeStampToDay(day.dt)}`}
            p="md"
            radius="md"
            className="weather-card weather-daily-card"
            classNames={{
              root: "weather-card-root",
            }}
          >
            <Stack gap="sm">
              <Group justify="space-between" wrap="nowrap">
                <Stack gap={0}>
                  <Text fw={600} size="lg" c="white">
                    {convertTimeStampToDay(day.dt)}
                  </Text>
                  <Text
                    size="sm"
                    c="indigo.2"
                    style={{ textTransform: "capitalize" }}
                  >
                    {day.weather[0].description}
                  </Text>
                </Stack>
                <WeatherIcon size={40} code={day.weather[0].icon} />
              </Group>

              <Group gap="xs" align="center" mt="xs">
                <Text fw={600} c="indigo.1" size="xl">
                  {tempMathRound(day.temp.max)}
                  {unitSymbol}
                </Text>
                <Box className="weather-card-temp-line" />
                <Text fw={600} c="indigo.2" size="xl">
                  {tempMathRound(day.temp.min)}
                  {unitSymbol}
                </Text>
              </Group>

              <Text
                size="xs"
                ta="center"
                c="indigo.2"
                mt={4}
                style={{ opacity: 0.8 }}
              >
                Click for details
              </Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>

      <Modal
        opened={opened}
        onClose={close}
        centered
        radius="md"
        title={
          selectedDay ? convertTimeStampToDay(selectedDay.dt) + " Forecast" : ""
        }
        overlayProps={{
          backgroundOpacity: 0.5,
          blur: 9,
        }}
        styles={{
          content: {
            backgroundColor: "#1a1b3e",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          },
          header: {
            backgroundColor: "transparent",
          },
          title: {
            color: "white",
            fontWeight: 700,
            fontSize: "1.2rem",
          },
          close: {
            color: "white",
          },
        }}
      >
        <DailyForecastDetail
          day={selectedDay}
          unitSymbol={unitSymbol}
          weatherUnit={weatherUnit}
        />
      </Modal>
    </Stack>
  );
};

export default WeatherNextDays;
