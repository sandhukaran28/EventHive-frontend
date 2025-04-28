import { MantineProvider, Container } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme,Button } from '@mantine/core';  
import '@mantine/core/styles.css';
// Import pages
import Login from './pages/auth/Login';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';
// import AdminPanel from './pages/admin/AdminPanel';
// import CreateEvent from './pages/admin/CreateEvent';
// import EditEvent from './pages/admin/EditEvent';
// import NotFound from './pages/NotFound';

// Import route guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

function App() {

  const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: { fontFamily: 'Greycliff CF, sans-serif' },
    colorScheme: 'light', 
    colors: {
      eventhive: [
        '#f4d6ff', // lightest
        '#e3c0f5',
        '#d2aaeb',
        '#b1d0fc', // mid
        '#7289da', // primary
        '#5b6bc2',
        '#4450a8',
        '#2d378f',
        '#1b2575',
        '#0a135c'  // darkest
      ],
    },
    primaryColor: 'eventhive',
  });
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <BrowserRouter>
        <Container fluid  size="lg"  p={0}>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/myBookings" element={<MyBookings />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<AdminRoute />}>
              {/* <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/create" element={<CreateEvent />} />
              <Route path="/admin/edit/:id" element={<EditEvent />} /> */}
            </Route>

            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
