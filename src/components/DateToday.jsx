import { useState, useEffect } from "react";
import { Text, Group } from "@mantine/core";

const DateToday = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateState(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateState.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const formattedTime = dateState.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <Group gap={8}>
      <Text
        size="xs"
        c="gray.4"
        fw={700}
        style={{ textTransform: "uppercase" }}
      >
        {formattedDate}
      </Text>
      <Text size="sm" fw={800}>
        {formattedTime}
      </Text>
    </Group>
  );
};

export default DateToday;
