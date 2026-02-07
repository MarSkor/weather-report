import { Group, SegmentedControl } from "@mantine/core";

const UnitToggle = ({ unit, setUnit }) => {
  return (
    <Group justify="flex-end">
      <SegmentedControl
        bdrs={"md"}
        value={unit}
        onChange={setUnit}
        data={[
          { label: "°C", value: "metric" },
          { label: "°F", value: "imperial" },
        ]}
        classNames={{
          root: "nav__unit-wrapper",
          indicator: "nav__unit-indicator",
          label: "nav__unit-label",
        }}
      />
    </Group>
  );
};

export default UnitToggle;
