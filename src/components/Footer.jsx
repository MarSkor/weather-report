import { Container, Flex, Text } from "@mantine/core";

const Footer = () => {
  return (
    <Container
      size="xl"
      component={"section"}
      className="layout__footer"
      pb={"lg"}
    >
      <Flex component="footer" mt={"md"}>
        <Text
          fw={500}
          c={"indigo.2"}
          opacity={0.5}
          tt={"uppercase"}
          size={"xs"}
          component="a"
          href="https://github.com/MarSkor/weather-report"
          target="_blank"
        >
          Source Code
        </Text>
      </Flex>
    </Container>
  );
};

export default Footer;
