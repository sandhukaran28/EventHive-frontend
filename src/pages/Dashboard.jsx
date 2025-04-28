import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Text,
  Title,
  Flex,
  Card,
  Avatar,
  Badge,
  Loader,
  Center,
} from "@mantine/core";
import { IconCalendarEvent } from "@tabler/icons-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosconfig";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user,logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/events?page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setEvents(response.data.events);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchEvents();
    }
  }, [user?.token, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
      {/* Top Nav Bar */}
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
              EventHive
            </Title>
            <Group spacing="md">
              <Button
                variant="outline"
                styles={{
                  root: {
                    color: "#1a1a1a",
                    borderColor: "#1a1a1a",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#d0d0d0" },
                  },
                }}
                onClick={() => navigate("/mybookings")}
              >
                My Bookings
              </Button>

              <Button
                variant="outline"
                styles={{
                  root: {
                    color: "#1a1a1a",
                    borderColor: "#1a1a1a",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#d0d0d0" },
                  },
                }}
                onClick={() => navigate("/profile")}
              >
                Profile
              </Button>

              <Button
                variant="filled"
                styles={{
                  root: {
                    backgroundColor: "#b1d0fc",
                    color: "#1a1a1a",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#a2c3f6" },
                  },
                }}
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              
              >
                Logout
              </Button>
            </Group>
          </Flex>
        </Container>
      </Paper>

      {/* Main Dashboard Content */}
      <Container size="lg" mt="xl" style={{ flex: 1 }}>
        <Title order={2} mb="sm" color="#1a1a1a">
          Welcome, {user?.user?.name || "Guest"} 👋
        </Title>

        <Text size="sm" color="dimmed" mb="xl">
          Here's what's happening with your events today.
        </Text>

        <Grid gutter="md">
          <Grid.Col span={12}>
            <Group mb="md">
              <IconCalendarEvent size={22} />
              <Text fw={500}>Upcoming Events</Text>
            </Group>

            {loading ? (
              <Center>
                <Loader color="eventhive.3" size="lg" />
              </Center>
            ) : events.length > 0 ? (
              <>
                <Grid>
                  {events.map((event) => {
                    const availableSeats = event.capacity;
                    const ticketsBooked =
                      event.attendees?.filter((id) => id == user.user.id)
                        .length || 0;

                    return (
                      <Grid.Col key={event._id} span={{ base: 12, md: 6 }}>
                        <Card
                          shadow="md"
                          p="lg"
                          radius="md"
                          withBorder
                          style={{
                            backgroundColor: "#fff",
                            border: "1px solid #e2e8f0",
                            transition:
                              "transform 0.2s ease, box-shadow 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.02)";
                            e.currentTarget.style.boxShadow =
                              "0 10px 25px rgba(0,0,0,0.1)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 10px rgba(0,0,0,0.05)";
                          }}
                        >
                          <Group mb="md" position="apart">
                            <Avatar radius="xl" color="eventhive.3">
                              {event.title.charAt(0)}
                            </Avatar>
                            <Badge
                              color="eventhive.3"
                              variant="filled"
                              size="sm"
                              styles={{
                                root: {
                                  backgroundColor: "#a2c3f6",
                                  color: "#1a1a1a",
                                  fontWeight: 500,
                                },
                              }}
                            >
                              {new Date(event.date).toDateString()}
                            </Badge>
                          </Group>

                          <Text fw={600} size="lg" mb="xs" color="#1a1a1a">
                            {event.title}
                          </Text>

                          <Text size="sm" c="dimmed" mb="sm">
                            {event.location}
                          </Text>

                          <Text size="xs" c="gray" mb="xs">
                            Available Seats: <b>{availableSeats}</b>
                          </Text>

                          {ticketsBooked > 0 ? (
                            <Text size="xs" c="green" mt="xs">
                              You have booked: <b>{ticketsBooked}</b> ticket
                              {ticketsBooked > 1 ? "s" : ""}
                            </Text>
                          ) : (
                            <Text size="xs" c="gray" mt="xs">
                              No tickets booked yet. Book now!
                            </Text>
                          )}

                          <Button
                            fullWidth
                            mt="sm"
                            variant="filled"
                            color="eventhive.3"
                            styles={{
                              root: {
                                backgroundColor: "#b1d0fc",
                                color: "#1a1a1a",
                                fontWeight: 600,
                                "&:hover": {
                                  backgroundColor: "#a2c3f6",
                                },
                              },
                            }}
                            onClick={() => navigate(`/events/${event._id}`)}
                          >
                            View Details
                          </Button>
                        </Card>
                      </Grid.Col>
                    );
                  })}
                </Grid>

                {/* Pagination Buttons */}
                <Group position="center" mt="lg">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Text size="sm" fw={500}>
                    Page {currentPage} of {totalPages}
                  </Text>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </Group>
              </>
            ) : (
              <Paper p="lg" radius="md" shadow="sm" mt="md">
                <Text size="sm" color="dimmed" align="center">
                  No upcoming events. Start booking today!
                </Text>
              </Paper>
            )}
          </Grid.Col>
        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
