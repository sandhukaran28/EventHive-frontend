import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Box,
  Button,
  Container,
  Paper,
  Title,
  Flex,
  Burger,
  Text,
} from "@mantine/core";
import {
  IconLayoutDashboard,
  IconPlus,
  IconUsers,
  IconCalendarStats,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    setSidebarOpen(!mobile); // Collapse sidebar if mobile
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Dashboard", icon: IconLayoutDashboard, path: "/dashboard" },
    { label: "Create Event", icon: IconPlus, path: "/create-event" },
    { label: "Users", icon: IconUsers, path: "/admin/users" },
    { label: "Bookings", icon: IconCalendarStats, path: "/admin/bookings" },
  ];

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9fb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Navbar */}
      <Paper
        p="md"
        radius={0}
        style={{
          backgroundColor: "#f4d6ff",
          borderBottom: "1px solid #b1d0fc",
          backdropFilter: "blur(8px)",
        }}
      >
        <Container size="xl">
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="md">
              {isMobile && (
                <Burger
                  opened={sidebarOpen}
                  onClick={() => setSidebarOpen((o) => !o)}
                  aria-label="Toggle sidebar"
                />
              )}

              <Title
                order={3}
                style={{ color: "#1a1a1a", fontWeight: 700, cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
              >
                EventHive
              </Title>
            </Flex>

            <Button
              variant="filled"
              onClick={() => {
                logout();
                navigate("/login");
              }}
              styles={{
                root: {
                  backgroundColor: "#b1d0fc",
                  color: "#1a1a1a",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: "#a2c3f6" },
                },
              }}
            >
              Logout
            </Button>
          </Flex>
        </Container>
      </Paper>

      {/* Admin Content */}
      <Flex style={{ flex: 1 }}>
        {/* Sidebar */}
        <Paper
          p="md"
          style={{
            width: isMobile ? (sidebarOpen ? 260 : 90) : 260,
            transition: "width 0.3s ease",
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#f4d6ff",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: sidebarOpen ? "flex-start" : "center",
          }}
        >
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Button
              key={item.label}
              variant="subtle"
              fullWidth
              onClick={() => navigate(item.path)}
              styles={{
                root: {
                  justifyContent: sidebarOpen ? "flex-start" : "flex-start",
                  padding: "10px 16px",
                  borderRadius: "8px",
                  height: "48px",
                  backgroundColor: isActive ? "#e3c0f5" : "transparent",
                  "&:hover": {
                    backgroundColor: "#e3c0f5",
                  },
                },
              }}
            >
              <Flex align="center" gap="12px" style={{ width: "100%" }}>
                <Box
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={20} />
                </Box>
            
                {sidebarOpen && (
                  <Text size="sm" fw={600} style={{ whiteSpace: "nowrap" }}>
                    {item.label}
                  </Text>
                )}
              </Flex>
            </Button>
            
            
            );
          })}
        </Paper>

        {/* Main Page Content */}
        <Box style={{ flex: 1, padding: "2rem" }}>
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
}
