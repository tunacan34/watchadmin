
import { AreaChart, Card } from "@tremor/react";

const chartdata = [
  { date: "Jan", "Active Users": 2890 },
  { date: "Feb", "Active Users": 2756 },
  { date: "Mar", "Active Users": 3322 },
  { date: "Apr", "Active Users": 3470 },
  { date: "May", "Active Users": 3475 },
  { date: "Jun", "Active Users": 3129 },
];

export const Dashboard = () => {
  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">
        Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Users", value: "12,345" },
          { label: "Active Users", value: "8,234" },
          { label: "Revenue", value: "$34,567" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-admin-muted text-sm mb-2">{stat.label}</p>
            <p className="text-2xl font-semibold text-admin-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-admin-foreground mb-4">
          User Growth
        </h2>
        <div className="h-72">
          <AreaChart
            data={chartdata}
            index="date"
            categories={["Active Users"]}
            colors={["blue"]}
          />
        </div>
      </div>
    </div>
  );
};
