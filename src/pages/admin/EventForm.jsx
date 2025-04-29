import {
    Box,
    Button,
    Container,
    Paper,
    TextInput,
    Textarea,
    Title,
    NumberInput,
    Loader,
    Center,
    Group,
    Grid,
    Image,
  } from "@mantine/core";
  import { useForm } from "@mantine/form";
  import { useNavigate, useParams } from "react-router-dom";
  import { useAuth } from "../../context/AuthContext";
  import { useEffect, useState } from "react";
  import axios from "../../api/axiosconfig";
  import Footer from "../../components/Footer";
  
  export default function EventForm() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(!!id);
    const [submitting, setSubmitting] = useState(false);
  
    const form = useForm({
      initialValues: {
        title: "",
        description: "",
        location: "",
        date: "",
        capacity: 1,
      },
    });
  
    useEffect(() => {
      if (id) {
        const fetchEvent = async () => {
          try {
            const response = await axios.get(`/events/${id}`, {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            });
  
            form.setValues({
              title: response.data.title,
              description: response.data.description,
              location: response.data.location,
              date: response.data.date.split("T")[0],
              capacity: response.data.capacity,
            });
          } catch (error) {
            console.error("Error fetching event:", error.response?.data || error.message);
            navigate("/dashboard");
          } finally {
            setLoading(false);
          }
        };
        fetchEvent();
      }
    }, [id, user?.token]);
  
    const handleSubmit = async (values) => {
      try {
        setSubmitting(true);
  
        if (id) {
          await axios.put(`/events/${id}`, values, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
        } else {
          await axios.post("/events", values, {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          });
        }
  
        navigate("/dashboard");
      } catch (error) {
        console.error("Error submitting form:", error.response?.data || error.message);
        alert("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };
  
    if (loading) {
      return (
        <Center h="100vh">
          <Loader size="lg" />
        </Center>
      );
    }
  
    return (
      <Box
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9f9fb",
          display: "flex",
          flexDirection: "column",
        }}
      >
        
  
        {/* Main Content */}
        <Container size="lg" my="xl" style={{ flex: 1 }}>
          <Grid gutter="xl" align="center">
            {/* Left Side - Illustration */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Center>
                <Image
                  src="/assets/Edit.svg"
                  alt="Create or Edit Event"
                  width={400}
                  height="auto"
                  fit="contain"
                />
              </Center>
            </Grid.Col>
  
            {/* Right Side - Form */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper p="lg" shadow="md" radius="md">
                <Title order={3} align="center" mb="lg" style={{ color: "#1a1a1a" }}>
                  {id ? "Edit Event" : "Create Event"}
                </Title>
  
                <form onSubmit={form.onSubmit(handleSubmit)}>
                  <TextInput
                    label="Event Title"
                    placeholder="Event Name"
                    mb="md"
                    {...form.getInputProps("title")}
                    styles={{ input: { backgroundColor: "white" } }}
                  />
  
                  <Textarea
                    label="Description"
                    placeholder="Describe your event"
                    autosize
                    minRows={3}
                    mb="md"
                    {...form.getInputProps("description")}
                    styles={{ input: { backgroundColor: "white" } }}
                  />
  
                  <TextInput
                    label="Location"
                    placeholder="Venue Address"
                    mb="md"
                    {...form.getInputProps("location")}
                    styles={{ input: { backgroundColor: "white" } }}
                  />
  
                  <TextInput
                    label="Date"
                    type="date"
                    mb="md"
                    {...form.getInputProps("date")}
                    styles={{ input: { backgroundColor: "white" } }}
                  />
  
                  <NumberInput
                    label="Capacity"
                    placeholder="Total Seats"
                    min={1}
                    mb="md"
                    {...form.getInputProps("capacity")}
                    styles={{ input: { backgroundColor: "white" } }}
                  />
  
                  <Button
                    type="submit"
                    fullWidth
                    loading={submitting}
                    styles={{
                      root: {
                        backgroundColor: "#b1d0fc",
                        color: "#1a1a1a",
                        fontWeight: 600,
                        "&:hover": { backgroundColor: "#a2c3f6" },
                      },
                    }}
                    mt="md"
                  >
                    {id ? "Update Event" : "Create Event"}
                  </Button>
                </form>
              </Paper>
            </Grid.Col>
          </Grid>
        </Container>
  
        {/* Footer */}
        <Footer />
      </Box>
    );
  }
  