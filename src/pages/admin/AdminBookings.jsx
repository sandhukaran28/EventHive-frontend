import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    Title,
    Group,
    Text,
    Loader,
    Center,
    Modal,
    Flex,
  } from "@mantine/core";
  import { useEffect, useState } from "react";
  import { useAuth } from "../../context/AuthContext";
  import { useNavigate } from "react-router-dom";
  import axios from "../../api/axiosconfig";
  import Footer from "../../components/Footer";
  
  export default function AdminBookings() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newStatus, setNewStatus] = useState("confirmed");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
  
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
  
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/bookings?page=${currentPage}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setBookings(res.data.bookings);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setErrorMessage("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (user?.token) fetchBookings();
    }, [user?.token, currentPage]);
  
    const handleUpdateBooking = async () => {
      if (!selectedBooking) return;
      try {
        await axios.put(
          `/bookings/${selectedBooking._id}`,
          { status: newStatus },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
        setBookings((prev) =>
          prev.map((b) =>
            b._id === selectedBooking._id ? { ...b, status: newStatus } : b
          )
        );
        setConfirmModal(false);
        setSelectedBooking(null);
        setNewStatus("confirmed");
        setSuccessMessage("Booking updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Failed to update booking:", error);
        setErrorMessage("Failed to update booking. Please try again.");
        setTimeout(() => setErrorMessage(""), 3000);
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
  
        {/* Main Content */}
        <Container size="lg" mt="xl" style={{ flex: 1 }}>
          <Title order={2} mb="xl" style={{ color: "#1a1a1a" }}>
            Manage Bookings
          </Title>
  
          {successMessage && (
            <Paper
              shadow="md"
              p="md"
              radius="md"
              my="md"
              withBorder
              style={{ backgroundColor: "#d3f9d8" }}
            >
              <Text color="green" align="center" fw={600}>
                {successMessage}
              </Text>
            </Paper>
          )}
  
          {errorMessage && (
            <Paper
              shadow="md"
              p="md"
              radius="md"
              my="md"
              withBorder
              style={{ backgroundColor: "#ffe3e3" }}
            >
              <Text color="red" align="center" fw={600}>
                {errorMessage}
              </Text>
            </Paper>
          )}
  
          {loading ? (
            <Center>
              <Loader size="lg" />
            </Center>
          ) : (
            <>
              <Paper
                shadow="md"
                radius="md"
                withBorder
                style={{ overflowX: "auto" }}
              >
                <Table highlightOnHover striped withBorder>
                  <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                      <th style={{ padding: "16px" }}>User</th>
                      <th style={{ padding: "16px" }}>Event</th>
                      <th style={{ padding: "16px", textAlign: "center" }}>
                        Quantity
                      </th>
                      <th style={{ padding: "16px", textAlign: "center" }}>
                        Status
                      </th>
                      <th style={{ padding: "16px", textAlign: "center" }}>
                        Actions
                      </th>
                    </tr>
                  </thead>
  
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b._id}>
                        <td style={{ padding: "16px" }}>
                          {b.user?.name || "Deleted User"}
                        </td>
                        <td style={{ padding: "16px" }}>
                          {b.event?.title || "Deleted Event"}
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          {b.quantity}
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <Text
                            size="xs"
                            fw={600}
                            style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              backgroundColor:
                                b.status === "confirmed" ? "#d3f9d8" : "#ffe3e3",
                              color:
                                b.status === "confirmed" ? "#086d2f" : "#c92a2a",
                              borderRadius: "999px",
                            }}
                          >
                            {b.status}
                          </Text>
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <Button
                            size="xs"
                            variant="outline"
                            color="blue"
                            onClick={() => {
                              setSelectedBooking(b);
                              setNewStatus(
                                b.status === "confirmed" ? "canceled" : "confirmed"
                              );
                              setConfirmModal(true);
                            }}
                          >
                            {b.status === "confirmed" ? "Cancel" : "Confirm"}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Paper>
  
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
          )}
        </Container>
  
        {/* Confirm Modal */}
        <Modal
          opened={confirmModal}
          onClose={() => setConfirmModal(false)}
          title="Update Booking Status"
          centered
        >
          <Text mb="md">
            Are you sure you want to{" "}
            <b>{newStatus === "canceled" ? "Cancel" : "Confirm"}</b> this booking?
          </Text>
          <Group position="right">
            <Button variant="outline" onClick={() => setConfirmModal(false)}>
              Cancel
            </Button>
            <Button color="blue" onClick={handleUpdateBooking}>
              Update
            </Button>
          </Group>
        </Modal>
  
        {/* Footer */}
        <Footer />
      </Box>
    );
  }
  