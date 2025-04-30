import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Title,
  Text,
  Paper,
  Loader,
  Center,
  Button,
  Flex,
  Group,
  TextInput,
  NumberInput,
  Notification,
  Grid,
} from "@mantine/core";
import axios from "../../api/axiosconfig";
import { useAuth } from "../../context/AuthContext";
import Footer from "../../components/Footer";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/events/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.token) {
      fetchEvent();
    }
  }, [id, user?.token]);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader color="eventhive.3" size="lg" />
      </Center>
    );
  }

  if (!event) {
    return (
      <Center h="100vh">
        <Text c="red">Event not found!</Text>
      </Center>
    );
  }

  // 🧠 Calculate Available Seats
  const availableSeats = event.capacity;

  const handleBooking = async () => {
    if (quantity > availableSeats) {
      setBookingError("You cannot book more seats than available.");
      return;
    }
    console.log("Booking event:", id, "Quantity:", quantity,availableSeats);
    try {
      const res = await axios.post(
        "/bookings",
        {
          eventId: id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Booking successful:", res.data);

      setEvent((prevEvent) => ({
        ...prevEvent,
        attendees: [...(prevEvent.attendees || []), ...Array(quantity).fill(user.user.id)],
      }));

      setBookingSuccess(true);
      setBookingError("");
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      setBookingError("Booking failed. Please try again.");
    }
  };

  return (
    <Box style={{ backgroundColor: "#f9f9fb", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Header */}
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
              Event Details
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
              >
                Profile
              </Button>
            </Group>
          </Flex>
        </Container>
      </Paper>

      {/* Event Content */}
      <Container size="lg" style={{ flex: 1 }}>
        <Grid gutter="xl" mt="xl">
          {/* Event Details */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper p="xl" shadow="md" radius="md" >
              <Title order={2} mb="md">
                {event.title}
              </Title>

              <Text size="md" mb="sm" color="dimmed">
                📅 {new Date(event.date).toDateString()}
              </Text>
              <Text size="md" mb="sm" color="dimmed">
                📍 {event.location}
              </Text>

              <Text size="sm" mt="md" color="black">
                {event.description}
              </Text>

              <Button
                mt="xl"
                variant="light"
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
                onClick={() => navigate(-1)}
              >
                Go Back
              </Button>
            </Paper>
          </Grid.Col>

          {/* Booking Form */}
          <Grid.Col span={{ base: 12, md: 5 }}>
          <Box
  p="xl"
class="eventInfo"
>

    <Title order={4} mb="md">
      Book Your Spot 🎟️
    </Title>

    {bookingSuccess && (
      <Notification color="green" title="Booking Confirmed!" mb="md">
        Your tickets have been booked successfully.
      </Notification>
    )}

    {bookingError && (
      <Notification color="red" title="Booking Failed" mb="md">
        {bookingError}
      </Notification>
    )}

    <Text size="sm" color="dimmed" mb="sm">
      Available Seats: <b>{availableSeats}</b>
    </Text>

    <TextInput
      label="Name"
      value={user?.user?.name || ""}
      readOnly
      styles={{ input: { backgroundColor: "white", fontWeight: 500 } }}
      mb="sm"
    />

    <NumberInput
      label="Quantity"
      value={quantity}
      onChange={setQuantity}
      min={1}
      max={availableSeats}
      styles={{ input: { backgroundColor: "white", fontWeight: 500 } }}
    />

    <Button
      fullWidth
      mt="xl"
      onClick={handleBooking}
      disabled={bookingSuccess}
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
    >
      Confirm Booking
    </Button>
  </Box>
</Grid.Col>

        </Grid>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
