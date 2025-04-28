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
    Loader,
    Center,
    Badge,
    Notification,
    Modal,
  } from "@mantine/core";
  import { useAuth } from "../context/AuthContext";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "../api/axiosconfig";
  import Footer from "../components/Footer";
  
  export default function MyBookings() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelSuccess, setCancelSuccess] = useState("");
    const [opened, setOpened] = useState(false); // for modal
    const [selectedBookingId, setSelectedBookingId] = useState(null);
  
    useEffect(() => {
      const fetchBookings = async () => {
        try {
          const response = await axios.get("/users/bookings", {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      };
  
      if (user?.token) {
        fetchBookings();
      }
    }, [user?.token]);
  
    const handleCancelBooking = async () => {
      if (!selectedBookingId) return;
  
      try {
        const response = await axios.delete(`/bookings/${selectedBookingId}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
  
        console.log("Booking canceled:", response.data);
  
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === selectedBookingId
              ? { ...booking, status: "canceled" }
              : booking
          )
        );
  
        setCancelSuccess("Booking canceled successfully! 🎉");
        setTimeout(() => setCancelSuccess(""), 3000);
  
      } catch (error) {
        console.error("Error canceling booking:", error);
      } finally {
        setOpened(false);
        setSelectedBookingId(null);
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
                My Bookings
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
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </Button>
              </Group>
            </Flex>
          </Container>
        </Paper>
  
        {/* Cancel Confirmation Modal */}
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Cancel Booking"
          centered
        >
          <Text size="sm" mb="md">
            Are you sure you want to cancel this booking? This action cannot be undone.
          </Text>
  
          <Group position="right" mt="lg">
            <Button variant="outline" color="gray" onClick={() => setOpened(false)}>
              No, Keep
            </Button>
            <Button color="red" onClick={handleCancelBooking}>
              Yes, Cancel
            </Button>
          </Group>
        </Modal>
  
        {/* Main Content */}
        <Container size="lg" mt="xl" style={{ flex: 1 }}>
          <Title order={2} mb="sm" color="#1a1a1a">
            Your Booked Events 🎟️
          </Title>
  
          {/* Success notification */}
          {cancelSuccess && (
            <Notification
              color="green"
              title="Booking Cancelled!"
              my="md"
              onClose={() => setCancelSuccess("")}
            >
              {cancelSuccess}
            </Notification>
          )}
  
          {loading ? (
            <Center mt="xl">
              <Loader color="eventhive.3" size="lg" />
            </Center>
          ) : bookings.length > 0 ? (
            <Grid gutter="md" mt="md">
              {bookings.map((booking) => (
                <Grid.Col key={booking._id} span={{ base: 12, md: 6 }}>
                  <Card
                    shadow="md"
                    p="lg"
                    radius="md"
                    withBorder
                    style={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                    }}
                  >
                    <Group position="apart" mb="md">
                      <Title order={5} style={{ color: "#1a1a1a" }}>
                        {booking.event.title}
                      </Title>
                      <Badge
                        color={booking.status === "confirmed" ? "green" : "red"}
                        variant="light"
                        size="sm"
                        styles={{
                          root: {
                            backgroundColor: booking.status === "confirmed" ? "#c9f7c9" : "#ffc9c9",
                            color: booking.status === "confirmed" ? "#2e7d32" : "#b71c1c",
                          },
                        }}
                      >
                        {booking.status}
                      </Badge>
                    </Group>
  
                    <Text size="sm" color="dimmed" mb="xs">
                      📅 {new Date(booking.event.date).toDateString()}
                    </Text>
  
                    <Text size="sm" color="dimmed" mb="xs">
                      📍 {booking.event.location}
                    </Text>
  
                    <Text size="sm" color="gray" mb="md">
                      🎟️ Tickets Booked: <b>{booking.quantity}</b>
                    </Text>
  
                    <Button
                      variant="light"
                      fullWidth
                      styles={{
                        root: {
                          backgroundColor: "#b1d0fc",
                          color: "#1a1a1a",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#a2c3f6" },
                        },
                      }}
                      onClick={() => navigate(`/events/${booking.event._id}`)}
                    >
                      View Event
                    </Button>
  
                    {booking.status === "confirmed" && (
                      <Button
                        fullWidth
                        mt="sm"
                        variant="outline"
                        color="red"
                        onClick={() => {
                          setSelectedBookingId(booking._id);
                          setOpened(true);
                        }}
                      >
                        Cancel Booking
                      </Button>
                    )}
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          ) : (
            <Center mt="xl">
              <Text size="sm" color="dimmed">
                You haven't booked any events yet.
              </Text>
            </Center>
          )}
        </Container>
  
        {/* Footer */}
        <Footer />
      </Box>
    );
  }
  