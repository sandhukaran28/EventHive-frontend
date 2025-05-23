import {
  Container,
  Title,
  Text,
  Box,
  Flex,
  Divider,
  Button,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box h="100vh"  className="landing" p="md">
      {/* Main Content */}
      <Box style={{ flex: 1, textAlign: "center",flexDirection:"column" }} className="flex">
        <Title order={1} size="64px" mb="md" style={{fontSize:"60px"}}>
          Welcome to EventHive
        </Title>
        <Text size="lg" mb="lg" maw={500} c={"gray"}>
          Discover and book amazing events. Your experience starts here.
        </Text>
        <Button
         variant="filled"
         className="btnPrimary flex"
         size="xl"
          color="eventhive"
    
          onClick={() => navigate("/login")}
        >
          Get Started
        </Button>
      </Box>

      {/* Footer */}
      <Divider my="md" />
      <Text align="center" size="xs" color="dimmed">
        EventHive &copy; {new Date().getFullYear()}
      </Text>
    </Box>
  );
}
