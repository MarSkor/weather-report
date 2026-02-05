import { Alert, Box } from "@mantine/core";
import { CircleAlert } from "lucide-react";

const ErrorMessage = ({ message }) => {
  return (
    <Box className="weather__error-wrap" mb={"md"}>
      <Alert
        variant="filled"
        color="red.9"
        title="Error"
        icon={<CircleAlert size={30} />}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorMessage;
