
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/members" element={<Members />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/boosters" element={<Boosters />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/support" element={<Support />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
