import {
    Title,
    Text,
    Button,
    Box,
    Flex,
    Divider,
  } from "@mantine/core";
  import { useNavigate } from "react-router-dom";
  
  export default function Home() {
    const navigate = useNavigate();
  
    return (
      <Box
        h="100vh"
        style={{
          background: `radial-gradient(
            75.14% 111.46% at 50% -11.46%,
            #b1d0fc 0%,
            #f4d6ff 100%
          )`,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          color: "#1a1a1a",
        }}
      >
        {/* Main Content */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          style={{ flex: 1, textAlign: "center" }}
        >
          <Title order={1} size="50px" mb="md">
            Welcome to EventHive
          </Title>
          <Text size="lg" mb="lg" maw={500}>
            Discover and book amazing events. Your experience starts here.
          </Text>
          <Button
            size="md"
            color="dark"
            variant="outline"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </Flex>
  
        {/* Footer */}
        <Divider my="md" />
        <Text align="center" size="xs" color="dimmed">
          EventHive &copy; {new Date().getFullYear()}
        </Text>
      </Box>
    );
  }
  