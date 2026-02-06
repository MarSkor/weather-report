import { Grid, Paper, Stack, Alert, Text, Box } from "@mantine/core";
import { TriangleAlert } from "lucide-react";
import { convertTimeStampToFullDay } from "@/utils/weatherHelpers";
import WeatherNextHours from "./WeatherNextHours";
import WeatherNextDays from "./WeatherNextDays";
import WeatherInfo from "./WeatherInfo";

const WeatherDashboard = ({ weatherData, unit }) => {
  return (
    <Stack gap="lg">
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 5, lg: 4 }} order={{ base: 1, md: 1 }}>
          <Paper withBorder shadow="sm" p="md" radius="md" h="100%">
            <WeatherInfo weather={weatherData} unit={unit} />
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7, lg: 8 }} order={{ base: 2, md: 2 }}>
          <Stack gap="lg">
            <Paper withBorder shadow="sm" p="md" radius="md">
              <WeatherNextHours data={weatherData.hourly} unit={unit} />
            </Paper>

            <Paper withBorder shadow="sm" p="md" radius="md">
              <WeatherNextDays data={weatherData.daily} unit={unit} />
            </Paper>
          </Stack>
        </Grid.Col>
      </Grid>

      {weatherData.alerts?.length > 0 && (
        <Stack gap="sm" mb={"lg"}>
          {weatherData.alerts.map((alert, index) => (
            <Alert
              key={index}
              variant="filled"
              color="red.9"
              title={alert.event}
              icon={<TriangleAlert size={30} />}
              radius="md"
            >
              <Text size="sm" mb="xs">
                {alert.description}
              </Text>

              <Box
                style={{
                  paddingTop: "8px",
                }}
              >
                <Text size="xs" fw={700}>
                  Starts: {convertTimeStampToFullDay(alert.start)}
                </Text>
                <Text size="xs" fw={700}>
                  Ends: {convertTimeStampToFullDay(alert.end)}
                </Text>
              </Box>
            </Alert>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default WeatherDashboard;
