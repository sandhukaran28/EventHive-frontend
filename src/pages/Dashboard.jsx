import {
    Box,
    Button,
    Container,
    Grid,
    Group,
    Paper,
    Text,
    Title,
  } from "@mantine/core";
  import { IconCalendarEvent, IconPlus, IconUser } from "@tabler/icons-react";
  
  export default function Dashboard() {
    const user = {
      name: "Karan", // Replace this with dynamic user info from context/auth later
      role: "user", // or 'admin'
    };
  
    return (
      <Box
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9f9fb",
          padding: "2rem 0",
        }}
      >
        <Container size="lg">
          <Title order={2} mb="sm">
            Welcome, {user.name} 👋
          </Title>
  
          <Text size="sm" color="dimmed" mb="xl">
            Here's what's happening with your events today.
          </Text>
  
          <Grid gutter="md">
            {/* Upcoming Events */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper
                p="lg"
                radius="md"
                shadow="sm"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                }}
              >
                <Group mb="md">
                  <IconCalendarEvent size={22} />
                  <Text fw={500}>Upcoming Events</Text>
                </Group>
  
                <Text size="sm" color="dimmed">
                  No events booked yet. Once you register, they’ll show up here.
                </Text>
              </Paper>
            </Grid.Col>
  
            {/* Quick Actions */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper
                p="lg"
                radius="md"
                shadow="sm"
                style={{
                  backgroundColor: "#f4d6ff",
                  border: "1px solid #b1d0fc",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Text fw={500} mb="md">
                  Quick Actions
                </Text>
                <Group direction="column" spacing="sm">
                  <Button
                    fullWidth
                    leftIcon={<IconCalendarEvent size={18} />}
                    color="eventhive.3"
                    variant="light"
                  >
                    Book an Event
                  </Button>
                  {user.role === "admin" && (
                    <Button
                      fullWidth
                      leftIcon={<IconPlus size={18} />}
                      color="eventhive.3"
                    >
                      Create Event
                    </Button>
                  )}
                  <Button
                    fullWidth
                    leftIcon={<IconUser size={18} />}
                    variant="outline"
                  >
                    Profile
                  </Button>
                </Group>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
    );
  }
  