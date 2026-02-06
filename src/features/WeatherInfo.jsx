import {
  Grid,
  Title,
  Text,
  Group,
  Stack,
  Divider,
  Box,
  ThemeIcon,
  Flex,
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
  SunDim,
} from "lucide-react";
import {
  tempMathRound,
  degToDir,
  convertTimeStamp,
  getUVCategory,
} from "@/utils/weatherHelpers";
import WeatherIcon from "@/components/WeatherIcon";

const WeatherInfo = ({ weather, unit }) => {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const unitSymbol = unit === "metric" ? "°C" : "°F";

  const WeatherDetail = ({ icon: Icon, label, value, color = "indigo.2" }) => (
    <Flex wrap="nowrap" gap="sm" align="center">
      <ThemeIcon
        variant="light"
        color={color}
        size="xl"
        radius="md"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Icon size={24} />
      </ThemeIcon>
      <Flex align={"left"} direction="column" gap={4}>
        <Text
          size="xs"
          c="indigo.1"
          fw={600}
          style={{
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            opacity: 0.6,
          }}
        >
          {label}
        </Text>
        <Text size="md" fw={600}>
          {value}
        </Text>
      </Flex>
    </Flex>
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
            <Title order={2} c="indigo.1">
              {weather.city}
            </Title>
            <Text c="gray.5" fw={500}>
              {regionNames.of(weather.country)}
            </Text>
          </Box>
          <Text size="sm" c="gray.5" ta="right">
            Updated: <br />
            <Text span fw={700} c="indigo.1">
              {convertTimeStamp(weather.dt)}
            </Text>
          </Text>
        </Group>
      </Box>

      <Box component="section">
        <Group justify="space-between" align="center">
          <Stack gap={0}>
            <Title
              order={1}
              c="white"
              style={{ fontSize: "5rem", letterSpacing: "-2px" }}
            >
              {tempMathRound(weather.temp)}
              {unitSymbol}
            </Title>
            <Text
              ta={"left"}
              mt={5}
              size="xl"
              fw={600}
              c="gray.4"
              style={{ textTransform: "capitalize" }}
            >
              {weather.description}
            </Text>
            <Group gap="xs" mt="md">
              <Text size="sm" c="gray.5" fw={500} tt={"uppercase"}>
                Feels like
              </Text>
              <Text fw={700} size="md" c="white">
                {tempMathRound(weather.feels_like)}
                {unitSymbol}
              </Text>
            </Group>
          </Stack>
          <Flex direction={"column"}>
            <WeatherIcon size={140} code={weather.icon} />
          </Flex>
        </Group>
      </Box>

      <Box component="section">
        <Divider color="indigo.2" style={{ opacity: 0.3 }} mb="xl" />
        <Grid gutter="xl">
          {" "}
          <Grid.Col span={6}>
            <WeatherDetail
              icon={ThermometerSun}
              label="High"
              value={`${tempMathRound(weather.maxTemp)}${unitSymbol}`}
              color="orange.5"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={ThermometerSnowflake}
              label="Low"
              value={`${tempMathRound(weather.minTemp)}${unitSymbol}`}
              color="cyan.4"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={PrecipIcon}
              label="Precip."
              value={precipValue}
              color="blue.5"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={Droplets}
              label="Humidity"
              value={`${weather.humidity}%`}
              color="teal.4"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={Wind}
              label="Wind"
              value={`${Math.round(weather.wind_speed)} m/s ${degToDir(weather.wind_deg)} ${weather.wind_gust ? `(${Math.round(weather.wind_gust)})` : ""}`}
              color="indigo.2"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <WeatherDetail
              icon={SunDim}
              label="UV Index"
              value={`${weather.uvi} ${getUVCategory(weather.uvi)}`}
              color="yellow.4"
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box component="section">
        <Divider color="indigo.2" style={{ opacity: 0.3 }} mb="lg" />
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
