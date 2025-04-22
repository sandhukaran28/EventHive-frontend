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
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function Login() {
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => (value.length < 3 ? "Username is too short" : null),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
    },
  });

  const handleLogin = (values) => {
    console.log("Login Data:", values);
    // call API here
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

              <form
                onSubmit={form.onSubmit(handleLogin)}
                className="login-form"
              >
                <TextInput
                  label="Email"
                  placeholder="Email"
                  type="email"
                  required
                  styles={{
                    input: {
                      backgroundColor: "white",
                      borderRadius: "999px",
                      textAlign: "left",
                      fontWeight: 500,
                      marginBottom: 4,
                    },
                  }}
                  {...form.getInputProps("username")}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  icon={<IconLock size={18} />}
                  required
                  mt="md"
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

                <Button
                  type="submit"
                  fullWidth
                  mt="xl"
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
