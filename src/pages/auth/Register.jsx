import {
    Box,
    Container,
    Grid,
    Image,
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import { IconUser, IconLock, IconMail } from "@tabler/icons-react";
  import { Link, useNavigate } from "react-router-dom";
  import { useState } from "react";
  import Footer from "../../components/Footer";
  import axios from "../../api/axiosconfig";
  
  export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const [registered, setRegistered] = useState(false);
  
    const form = useForm({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validate: {
        name: (value) => (value.trim().length === 0 ? "Name is required" : null),
        email: (value) =>
          /^\S+@\S+$/.test(value) ? null : "Invalid email format",
        password: (value) =>
          value.length < 6
            ? "Password must be at least 6 characters long"
            : null,
      },
    });
  
    const handleRegister = async (values) => {
      try {
        setLoading(true);
        setServerError("");
  
        const res = await axios.post("/auth/register", {
          ...values,
          isAdmin: false,
        });
  
        console.log("Registered:", res.data);
        setRegistered(true);
  

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.error("Registration failed:", err.response?.data || err.message);
        setServerError(
          err.response?.data?.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f9f9fb",
          flexDirection: "column",
        }}
      >
        <Container size="lg" flex={1}>
          <Grid gutter={{ base: " ", lg: 200 }} align="center">
            {/* SVG Side */}
            <Grid.Col span={{ base: 12, md: 6 }} visibleFrom="md">
              <Image
                src="/assets/Register.svg"
                alt="Register Illustration"
                fit="contain"
                width="100%"
                height={600}
              />
            </Grid.Col>
  
            {/* Register Form Side */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper
                shadow="xl"
                radius="lg"
                p="xl"
                mt={{ base: "35% !important", md: "0 !important" }}
                style={{
                  backgroundColor: "#f4d6ff",
                  border: "1px solid #b1d0fc",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
                }}
              >
                <Title
                  order={3}
                  align="center"
                  mb="xs"
                  style={{ color: "#1a1a1a" }}
                >
                  Join EventHive
                </Title>
  
                <Text align="center" size="sm" color="dimmed" mb="lg">
                  Create your account and start exploring events today.
                </Text>
  
                {registered ? (
                  <Text color="green" align="center" mt="md" fw={600}>
                    🎉 Registration successful! Redirecting to login...
                  </Text>
                ) : (
                  <form onSubmit={form.onSubmit(handleRegister)}>
                    <TextInput
                      label="Name"
                      placeholder="Full name"
                      icon={<IconUser size={18} />}
                      required
                      labelProps={{ style: { textAlign: "left" } }}
                      styles={{
                        input: {
                          backgroundColor: "white",
                          borderRadius: "999px",
                          textAlign: "left",
                          fontWeight: 500,
                          marginBottom: 4,
                        },
                      }}
                      {...form.getInputProps("name")}
                    />
  
                    <TextInput
                      label="Email"
                      placeholder="Email"
                      type="email"
                      icon={<IconMail size={18} />}
                      required
                      labelProps={{ style: { textAlign: "left" } }}
                      styles={{
                        input: {
                          backgroundColor: "white",
                          borderRadius: "999px",
                          textAlign: "left",
                          fontWeight: 500,
                          marginBottom: 4,
                        },
                      }}
                      {...form.getInputProps("email")}
                    />
  
                    <PasswordInput
                      label="Password"
                      placeholder="Enter your password"
                      icon={<IconLock size={18} />}
                      required
                      mt="md"
                      labelProps={{ style: { textAlign: "left" } }}
                      styles={{
                        input: {
                          backgroundColor: "white",
                          borderRadius: "999px",
                          paddingLeft: "2.75rem",
                          textAlign: "left",
                        },
                      }}
                      {...form.getInputProps("password")}
                    />
  
                    {/* Server-side error display */}
                    {serverError && (
                      <Text color="red" align="center" mt="md">
                        {serverError}
                      </Text>
                    )}
  
                    <Button
                      type="submit"
                      fullWidth
                      mt="xl"
                      loading={loading}
                      styles={{
                        root: {
                          backgroundColor: "#b1d0fc",
                          color: "#1a1a1a",
                          fontWeight: 600,
                          transition: "transform 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                            backgroundColor: "#a2c3f6",
                          },
                        },
                      }}
                    >
                      Register
                    </Button>
                  </form>
                )}
  
                <Text size="sm" align="center" mt="md" color="dimmed">
                  Already have an account?{" "}
                  <Anchor component={Link} to="/login" color="#7289da">
                    Login here
                  </Anchor>
                </Text>
  
                <Text size="xs" align="center" mt="lg" color="gray">
                  “Your journey with EventHive starts with a single click.”
                  <br />
                  <em>– Team EventHive</em>
                </Text>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
  
        <Footer />
      </Box>
    );
  }
  