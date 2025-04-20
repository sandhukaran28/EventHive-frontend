import { MantineProvider, Container } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages
import Login from './pages/auth/Login';
// import Register from './pages/Register';
// import Events from './pages/Events';
// import EventDetails from './pages/EventDetails';
// import Dashboard from './pages/Dashboard';
// import AdminPanel from './pages/admin/AdminPanel';
// import CreateEvent from './pages/admin/CreateEvent';
// import EditEvent from './pages/admin/EditEvent';
// import NotFound from './pages/NotFound';

// Import route guards
// import ProtectedRoute from './components/ProtectedRoute';
// import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Container size="lg" pt="md">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}

            {/* <Route element={<ProtectedRoute />}>
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/create" element={<CreateEvent />} />
              <Route path="/admin/edit/:id" element={<EditEvent />} />
            </Route>

            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Container>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
