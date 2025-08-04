import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import { VerifyProduct } from "./pages/VerifyProduct";
import ArtisanPortal from "./pages/ArtisanPortal";
import Credits from "./pages/Credits";
import ThreadGuru from "./pages/ThreadGuru";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/verify" element={<VerifyProduct />} />
          <Route path="/artisan" element={<ArtisanPortal />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/thread-guru" element={<ThreadGuru />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
