
import { AdminSidebar } from "@/components/AdminSidebar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-admin-background">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;
