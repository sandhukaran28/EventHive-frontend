import {
    Box,
    Button,
    Container,
    Flex,
    Paper,
    TextInput,
    Title,
    Notification,
    Grid,
    Text,
    Image,
    Group,
  } from "@mantine/core";
  import { useAuth } from "../../context/AuthContext";
  import { useState } from "react";
  import axios from "../../api/axiosconfig";
  import { useNavigate } from "react-router-dom";
  import Footer from "../../components/Footer";
  import ProfileSvg from "/assets/Profile.svg";
  
  export default function Profile() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user?.user?.name || "");
    const [email] = useState(user?.user?.email || "");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
  
    const handleUpdate = async () => {
      try {
        setLoading(true);
        const response = await axios.put(
          `/users`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
  
        console.log("Profile Updated:", response.data);
  
        const updatedUser = { ...user.user, name: response.data.user.name };
        login({ ...user, user: updatedUser });
  
        setSuccessMessage("Profile updated successfully! 🎉");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleLogout = () => {
      logout();
      navigate("/login");
    };
  
    return (
      <Box
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9f9fb",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top Navbar */}
        <Paper
          p="md"
          radius={0}
          style={{
            backgroundColor: "#f4d6ff",
            borderBottom: "1px solid #b1d0fc",
            backdropFilter: "blur(8px)",
          }}
        >
          <Container size="lg">
            <Flex justify="space-between" align="center">
              <Title order={3} style={{ color: "#1a1a1a", fontWeight: 700 }}>
                My Profile
              </Title>
              <Group spacing="md">
                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  styles={{
                    root: {
                      color: "#1a1a1a",
                      borderColor: "#1a1a1a",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#d0d0d0" },
                    },
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="filled"
                  onClick={handleLogout}
                  styles={{
                    root: {
                      backgroundColor: "#b1d0fc",
                      color: "#1a1a1a",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#a2c3f6" },
                    },
                  }}
                >
                  Logout
                </Button>
              </Group>
            </Flex>
          </Container>
        </Paper>
  
        {/* Main Content */}
        <Container size="lg" mt="xl" style={{ flex: 1 }}>
          <Grid gutter="xl" align="center">
            {/* Left Side Image */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image
                src={ProfileSvg}
                alt="Profile Illustration"
                fit="contain"
                width="100%"
                height="auto"
              />
            </Grid.Col>
  
            {/* Right Side Form */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="md" p="xl" radius="md">
                <Title order={4} mb="lg" style={{ color: "#1a1a1a" }}>
                  Edit Your Details
                </Title>
  
                {successMessage && (
                  <Notification color="green" my="md" onClose={() => setSuccessMessage("")}>
                    {successMessage}
                  </Notification>
                )}
  
                <TextInput
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  mb="md"
                  styles={{ input: { backgroundColor: "white", fontWeight: 500 } }}
                />
  
                <TextInput
                  label="Email (read-only)"
                  value={email}
                  readOnly
                  mb="md"
                  styles={{ input: { backgroundColor: "white", fontWeight: 500 } }}
                />
  
                <Button
                  fullWidth
                  loading={loading}
                  onClick={handleUpdate}
                  styles={{
                    root: {
                      backgroundColor: "#b1d0fc",
                      color: "#1a1a1a",
                      fontWeight: 600,
                      "&:hover": { backgroundColor: "#a2c3f6" },
                    },
                  }}
                >
                  Save Changes
                </Button>
  
                <Text size="xs" align="center" mt="lg" color="gray">
                  "Grow your journey with EventHive — one event at a time."
                </Text>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
  
        {/* Footer */}
        <Footer />
      </Box>
    );
  }
  