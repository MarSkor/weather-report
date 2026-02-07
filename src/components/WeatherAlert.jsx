import {
  Paper,
  Group,
  Text,
  Modal,
  Stack,
  Box,
  Badge,
  Indicator,
} from "@mantine/core";
import { TriangleAlert, ChevronRight, HelpCircle } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { ALERT_TAG, convertTimeStampToFullDay } from "@/utils/weatherHelpers";

const TagIcon = ({ tag, size = 16 }) => {
  const normalizedTag = tag?.toLowerCase().replace(/[\/\s]/g, "_") || "";

  const config = ALERT_TAG[normalizedTag] || {
    icon: HelpCircle,
    color: "gray",
  };
  const IconComponent = config.icon;

  return (
    <IconComponent
      size={size}
      color={`var(--mantine-color-${config.color}-filled)`}
    />
  );
};

const WeatherAlert = ({ alerts }) => {
  const [opened, { open, close }] = useDisclosure(false);

  if (!alerts || alerts.length === 0) return null;
  const primaryAlert = alerts[0];

  return (
    <>
      <Paper
        withBorder
        p="xs"
        radius="md"
        shadow="md"
        onClick={open}
        classNames={{
          root: "weather-alert-root",
        }}
      >
        <Group justify="space-between" wrap="nowrap">
          <Group gap="sm">
            <Indicator color="white" processing size={8} offset={2}>
              <TriangleAlert size={22} color="white" />
            </Indicator>
            <Box>
              <Text fw={700} c="white" size="sm">
                {primaryAlert.event}
              </Text>
              <Text c="white" size="xs">
                {alerts.length > 1
                  ? `+ ${alerts.length - 1} other warnings. `
                  : ""}
                Click for safety details
              </Text>
            </Box>
          </Group>
          <ChevronRight size={22} color="white" />
        </Group>
      </Paper>

      <Modal
        title={
          <Group gap="xs">
            <TriangleAlert color="red" /> <Text fw={700}>Weather Warnings</Text>
          </Group>
        }
        opened={opened}
        onClose={close}
        centered
        size="lg"
        radius="md"
        classNames={{
          content: "alert-modal-content",
          header: "alert-modal-header",
        }}
      >
        <Stack gap="md">
          {alerts.map((alert, index) => (
            <Paper
              key={index}
              p="md"
              radius="md"
              classNames={{
                root: "alert-paper-modal-root",
              }}
            >
              <Badge
                color="red.9"
                variant="filled"
                radius={"sm"}
                mb="xs"
                size="md"
              >
                {alert.event}
              </Badge>
              <Text size="xl" mb={12} fw={600}>
                {alert.sender_name}
              </Text>
              <Text
                size="md"
                c={"gray.4"}
                mb="md"
                style={{ whiteSpace: "pre-line" }}
              >
                {alert.description}
              </Text>
              <Group gap="xl" mt="sm">
                <Box>
                  <Text size="sm" c="gray.5" fw={500} tt={"uppercase"}>
                    Starts
                  </Text>
                  <Text size="md">
                    {convertTimeStampToFullDay(alert.start)}
                  </Text>
                </Box>
                <Box>
                  <Text size="sm" c="gray.5" fw={500} tt={"uppercase"}>
                    Ends
                  </Text>
                  <Text size="md">{convertTimeStampToFullDay(alert.end)}</Text>
                </Box>
              </Group>
              <Group mt={"lg"}>
                {alert.tags.map((tag, i) => (
                  <Badge
                    key={i}
                    color="gray"
                    variant="light"
                    size="md"
                    radius="sm"
                    leftSection={<TagIcon tag={tag} size={14} />}
                  >
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Paper>
          ))}
        </Stack>
      </Modal>
    </>
  );
};

export default WeatherAlert;
