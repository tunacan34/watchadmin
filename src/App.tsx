
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Members from "./pages/Members";
import Stores from "./pages/Stores";
import Listings from "./pages/Listings";
import Auctions from "./pages/Auctions";
import Boosters from "./pages/Boosters";
import Showcase from "./pages/Showcase";
import Transactions from "./pages/Transactions";
import Analysis from "./pages/Analysis";
import Statistics from "./pages/Statistics";
import Documents from "./pages/Documents";
import Brands from "./pages/Brands";
import Support from "./pages/Support";
import Comments from "./pages/Comments";
import Settings from "./pages/Settings";
import GAnalytics from "./pages/GAnalytics";

const queryClient = new QueryClient();

// Layout bileşeni oluşturalım
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-admin-background">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Index /></Layout>} />
          <Route path="/members" element={<Layout><Members /></Layout>} />
          <Route path="/stores" element={<Layout><Stores /></Layout>} />
          <Route path="/listings" element={<Layout><Listings /></Layout>} />
          <Route path="/auctions" element={<Layout><Auctions /></Layout>} />
          <Route path="/boosters" element={<Layout><Boosters /></Layout>} />
          <Route path="/showcase" element={<Layout><Showcase /></Layout>} />
          <Route path="/transactions" element={<Layout><Transactions /></Layout>} />
          <Route path="/analysis" element={<Layout><Analysis /></Layout>} />
          <Route path="/statistics" element={<Layout><Statistics /></Layout>} />
          <Route path="/ganalytics" element={<Layout><GAnalytics /></Layout>} />
          <Route path="/documents" element={<Layout><Documents /></Layout>} />
          <Route path="/brands" element={<Layout><Brands /></Layout>} />
          <Route path="/support" element={<Layout><Support /></Layout>} />
          <Route path="/comments" element={<Layout><Comments /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
