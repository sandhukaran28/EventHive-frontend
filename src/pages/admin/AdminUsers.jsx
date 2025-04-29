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
  Notification,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosconfig";
import Footer from "../../components/Footer";

export default function AdminUsers() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/users?page=${currentPage}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchUsers();
  }, [user?.token, currentPage]);

  const handleDeleteUser = async () => {
    if (!deletingUserId) return;

    try {
      await axios.delete(`/users/${deletingUserId}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== deletingUserId));
      setSuccessMessage("User deleted successfully! 🎉");
      setTimeout(() => setSuccessMessage(""), 3000);
      setConfirmModal(false);
      setDeletingUserId(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Could not delete user. Try again.");
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
          Manage Users
        </Title>

        {successMessage && (
          <Notification
            color="green"
            title="Success"
            onClose={() => setSuccessMessage("")}
            mb="md"
          >
            {successMessage}
          </Notification>
        )}

        {loading ? (
          <Center h="50vh">
            <Loader size="lg" />
          </Center>
        ) : (
          <>
            <Paper shadow="md" radius="md" withBorder>
              <Box style={{ overflowX: "auto", width: "100%" }}>
                <Table highlightOnHover striped withBorder style={{ maxWidth: "80vw" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                      <th style={{ padding: "16px", textAlign: "left" }}>Name</th>
                      <th style={{ padding: "16px", textAlign: "left" }}>Email</th>
                      <th style={{ padding: "16px", textAlign: "center" }}>Role</th>
                      <th style={{ padding: "16px", textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id}>
                        <td style={{ padding: "16px" }}>{u.name}</td>
                        <td style={{ padding: "16px" }}>{u.email}</td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <Text
                            size="xs"
                            fw={600}
                            style={{
                              display: "inline-block",
                              padding: "4px 10px",
                              backgroundColor: u.isAdmin ? "#d3f9d8" : "#f0f0f0",
                              color: u.isAdmin ? "#086d2f" : "#555",
                              borderRadius: "999px",
                            }}
                          >
                            {u.isAdmin ? "Admin" : "User"}
                          </Text>
                        </td>
                        <td style={{ padding: "16px", textAlign: "center" }}>
                          <Button
                            variant="outline"
                            color="red"
                            size="xs"
                            onClick={() => {
                              setDeletingUserId(u._id);
                              setConfirmModal(true);
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
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

      {/* Confirm Delete Modal */}
      <Modal
        opened={confirmModal}
        onClose={() => setConfirmModal(false)}
        title="Confirm Deletion"
        centered
      >
        <Text mb="md">Are you sure you want to delete this user?</Text>
        <Group position="right">
          <Button variant="outline" onClick={() => setConfirmModal(false)}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDeleteUser}>
            Delete
          </Button>
        </Group>
      </Modal>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
