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
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosconfig";
import Footer from "../../components/Footer";

export default function MyBookings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelSuccess, setCancelSuccess] = useState("");
  const [opened, setOpened] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/users/bookings?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setBookings(response.data.bookings);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchBookings();
    }
  }, [user?.token, currentPage]);

  const handleCancelBooking = async () => {
    if (!selectedBookingId) return;
    try {
      const response = await axios.delete(`/bookings/${selectedBookingId}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

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
              My Bookings
            </Title>
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
          <>
            <Grid gutter="md" mt="md">
              {bookings.map((booking) => booking.event !== null && (
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
                    className="eventCard"
                  >
                    <Group position="apart" mb="md">
                      <Title order={5} style={{ color: "#1a1a1a" }}>
                        {booking.event.title}
                      </Title>
                      <Badge
                        color={booking.status === "confirmed" ? "green" : "red"}
                        variant="light"
                        size="sm"
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
                      onClick={() => navigate(`/events/${booking.event._id}`)}
                      styles={{
                        root: {
                          backgroundColor: "#b1d0fc",
                          color: "#1a1a1a",
                          fontWeight: 600,
                          "&:hover": { backgroundColor: "#a2c3f6" },
                        },
                      }}
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

            {/* Pagination Controls */}
            <Group position="center" mt="xl">
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
