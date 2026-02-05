import {
  Grid,
  Title,
  Text,
  Group,
  Stack,
  Divider,
  Box,
  ThemeIcon,
} from "@mantine/core";
import {
  Sunrise,
  Sunset,
  ThermometerSun,
  ThermometerSnowflake,
  Droplets,
  CloudRain,
  CloudSnow,
  Wind,
} from "lucide-react";
import {
  tempMathRound,
  degToDir,
  convertTimeStamp,
} from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";

const WeatherInfo = ({ weather, unit }) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const WeatherDetail = ({ icon: Icon, label, value }) => (
    <Group wrap="nowrap" gap="sm">
      <ThemeIcon
        variant="light"
        color="indigo.4"
        size="md"
        radius="md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
      >
        <Icon size={18} />
      </ThemeIcon>
      <Box>
        <Text
          size="xs"
          c="gray.5"
          lh={1}
          fw={700}
          style={{ textTransform: "uppercase" }}
        >
          {label}
        </Text>
        <Text size="sm" fw={600}>
          {value}
        </Text>
      </Box>
    </Group>
  );

  const rain = weather.rain || 0;
  const snow = weather.snow || 0;
  const PrecipIcon = weather.snow > 0 ? CloudSnow : CloudRain;

  let precipValue = "0 mm";
  if (rain > 0 && snow > 0) {
    precipValue = `R: ${rain} / S: ${snow} mm`;
  } else if (rain > 0) {
    precipValue = `${rain} mm`;
  } else if (snow > 0) {
    precipValue = `${snow} mm`;
  }

  return (
    <Stack gap="xl" h="100%" justify="space-between">
      <Box component="section">
        <Group justify="space-between" align="flex-start">
          <Box>
            <Title order={2} lh={1.2} c="white">
              {weather.city}
            </Title>
            <Text c="gray.5" fw={500}>
              {regionNames.of(weather.country)}
            </Text>
          </Box>
          <Text size="xs" c="gray.5" ta="right">
            Updated: <br />
            <Text span fw={700} c="gray.2">
              {convertTimeStamp(weather.dt)}
            </Text>
          </Text>
        </Group>
      </Box>

      <Box py="lg" component="section">
        <Group justify="space-between" align="center">
          <Stack gap={0}>
            <Title
              order={1}
              c="white"
              style={{ fontSize: "5rem", lineHeight: 1, letterSpacing: "-2px" }}
            >
              {tempMathRound(weather.temp)}
              {unitSymbol}
            </Title>
            <Text
              mt={5}
              size="xl"
              fw={600}
              c="gray.4"
              style={{ textTransform: "capitalize" }}
            >
              {weather.description}
            </Text>
            <Group gap="xs" mt="md">
              <Text size="sm" c="gray.5" fw={500}>
                FEELS LIKE
              </Text>
              <Text fw={700} size="md" c="white">
                {tempMathRound(weather.feels_like)}
                {unitSymbol}
              </Text>
            </Group>
          </Stack>
          <WeatherIcon size={120} code={weather.icon} />
        </Group>
      </Box>

      <Box component="section">
        <Divider color="gray.8" mb="xl" />
        <Grid gutter="xl">
          {" "}
          <Grid.Col span={6}>
            <WeatherDetail
              icon={ThermometerSun}
              label="High"
              value={`${tempMathRound(weather.maxTemp)}${unitSymbol}`}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={ThermometerSnowflake}
              label="Low"
              value={`${tempMathRound(weather.minTemp)}${unitSymbol}`}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={PrecipIcon}
              label="Precip."
              value={precipValue}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={Droplets}
              label="Humidity"
              value={`${weather.humidity}%`}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <WeatherDetail
              icon={Wind}
              label="Wind"
              value={`${Math.round(weather.wind_speed)} m/s ${degToDir(weather.wind_deg)} ${weather.wind_gust ? `(${Math.round(weather.wind_gust)})` : ""}`}
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box component="section">
        <Divider color="gray.8" mb="lg" />
        <Grid>
          <Grid.Col span={6}>
            <Group gap="sm">
              <ThemeIcon variant="transparent" color="orange.5">
                <Sunrise size={24} />
              </ThemeIcon>
              <Box>
                <Text size="xs" c="gray.5" fw={700}>
                  SUNRISE
                </Text>
                <Text size="md" fw={700} c="white">
                  {convertTimeStamp(weather.sunrise)}
                </Text>
              </Box>
            </Group>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group gap="sm">
              <ThemeIcon variant="transparent" color="indigo.3">
                <Sunset size={24} />
              </ThemeIcon>
              <Box>
                <Text size="xs" c="gray.5" fw={700}>
                  SUNSET
                </Text>
                <Text size="md" fw={700} c="white">
                  {convertTimeStamp(weather.sunset)}
                </Text>
              </Box>
            </Group>
          </Grid.Col>
        </Grid>
      </Box>
    </Stack>
  );
};

export default WeatherInfo;
