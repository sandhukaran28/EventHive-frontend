import { MantineProvider, Container } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

// Pages
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import EventDetails from "./pages/User/EventDetails";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/User/MyBookings";
import Profile from "./pages/User/Profile";
import EventForm from "./pages/admin/EventForm";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminBookings from "./pages/admin/AdminBookings";

// Guards and Layout
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import AdminLayout from "./components/AdminLayout";

function App() {
  const theme = createTheme({
    fontFamily: "Inter, sans-serif",
    fontFamilyMonospace: "Monaco, Courier, monospace",
    headings: { fontFamily: "Greycliff CF, sans-serif" },
    colorScheme: "light",
    colors: {
      eventhive: [
        "#f4d6ff",
        "#e3c0f5",
        "#d2aaeb",
        "#b1d0fc",
        "#7289da",
        "#5b6bc2",
        "#4450a8",
        "#2d378f",
        "#1b2575",
        "#0a135c",
      ],
    },
    primaryColor: "eventhive",
  });

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <BrowserRouter basename="/eventhive-app">
        <Container fluid size="lg" p={0}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/myBookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<AdminRoute />}>
              {/* Admin Layout Wrapper */}
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/create-event" element={<EventForm />} />
                <Route path="/edit-event/:id" element={<EventForm />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
              </Route>
            </Route>

            {/* Optional Not Found Page */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
