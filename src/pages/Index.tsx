
import { AdminSidebar } from "@/components/AdminSidebar";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-admin-background">
      <AdminSidebar />
      <main className="lg:ml-64 min-h-screen">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-admin-foreground">DASHBOARD</h1>
        </div>
      </main>
    </div>
  );
};

export default Index;
