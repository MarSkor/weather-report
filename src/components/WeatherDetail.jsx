import { Flex, Text, ThemeIcon } from "@mantine/core";

const WeatherDetail = ({
  icon: Icon,
  value,
  colorIcon = "indigo.2",
  colorLabel = "indigo.2",
  title,
  ariaLabel,
}) => (
  <Flex wrap="nowrap" gap="sm" align="center" title={title}>
    <ThemeIcon
      color={colorIcon}
      size="xl"
      radius="md"
      variant="light"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    >
      <Icon size={26} />
    </ThemeIcon>
    <Flex align={"left"} direction="column" gap={0}>
      <Text
        size="xs"
        c="indigo.2"
        fw={600}
        style={{ textTransform: "uppercase" }}
      >
        {title}
      </Text>
      <Text size="sm" fw={600} c={colorLabel} aria-label={ariaLabel}>
        {value}
      </Text>
    </Flex>
  </Flex>
);

export default WeatherDetail;
