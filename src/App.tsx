import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { AdminRoute } from "@/components/auth/AdminRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import OrderTrackingDemo from "./pages/OrderTrackingDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="/catalog" element={<div className="p-8 text-center">Food Catalog - Coming Soon!</div>} />
              <Route path="/cart" element={<div className="p-8 text-center">Shopping Cart - Coming Soon!</div>} />
              <Route path="/wallet" element={<div className="p-8 text-center">Wallet Management - Coming Soon!</div>} />
              <Route path="/orders" element={<div className="p-8 text-center">Order History - Coming Soon!</div>} />
              <Route path="/profile" element={<div className="p-8 text-center">Profile Settings - Coming Soon!</div>} />
              <Route path="/tracking-demo" element={<OrderTrackingDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
