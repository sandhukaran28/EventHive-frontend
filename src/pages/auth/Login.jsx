import {
  Box,
  Grid,
  Image,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Container,
  Text,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUser, IconLock } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { useState } from "react";
import axios from "../../api/axiosconfig";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email format",
    },
  });

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      setServerError("");
  
      const res = await axios.post("/auth/login", values);
      console.log("Logged in:", res.data);
  
      const userData = {
        token: res.data.token,
        user: res.data.user,
      };
  
      login(userData);
      setLoggedIn(true);
  
      setTimeout(() => {
        if (res.data.user.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setServerError(
        err.response?.data?.message || "Login failed. Please try again."
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
              src="/assets/Login.svg"
              alt="Login Illustration"
              fit="contain"
              width="100%"
              height={600}
            />
          </Grid.Col>

          {/* Login Form Side */}
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
                Welcome to EventHive
              </Title>

              <Text align="center" size="sm" color="dimmed" mb="lg">
                Your gateway to discovering and managing events effortlessly.
              </Text>

              {loggedIn ? (
                <Text color="green" align="center" mt="md" fw={600}>
                  ✅ Login successful! Redirecting...
                </Text>
              ) : (
                <form
                  onSubmit={form.onSubmit(handleLogin)}
                  className="login-form"
                >
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    type="email"
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
                    Login
                  </Button>
                </form>
              )}

              <Text size="sm" align="center" mt="md" color="dimmed">
                Don’t have an account?{" "}
                <Anchor component={Link} to="/register" color="#7289da">
                  Register here
                </Anchor>
              </Text>

              {/* Optional Testimonial */}
              <Text size="xs" align="center" mt="lg" color="gray">
                “EventHive made organizing community events feel like magic.”
                <br />
                <em>– Anaya S., Startup Founder</em>
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
