import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import PhotographerDashboard from "./pages/PhotographerDashboard";
import Booking from "./pages/Booking";
import Checkout from "./pages/Checkout";
import PostBooking from "./pages/PostBooking";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <ProtectedRoute requiredRole="client">
                <ClientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/photographer-dashboard" element={
              <ProtectedRoute requiredRole="photographer">
                <PhotographerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/booking" element={
              <ProtectedRoute requiredRole="client">
                <Booking />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute requiredRole="client">
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/post-booking/:bookingId" element={
              <ProtectedRoute>
                <PostBooking />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
