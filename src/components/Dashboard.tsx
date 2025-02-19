
import { AreaChart, Card } from "@tremor/react";

const chartdata = [
  { date: "Oca", "Aktif Kullanıcılar": 2890 },
  { date: "Şub", "Aktif Kullanıcılar": 2756 },
  { date: "Mar", "Aktif Kullanıcılar": 3322 },
  { date: "Nis", "Aktif Kullanıcılar": 3470 },
  { date: "May", "Aktif Kullanıcılar": 3475 },
  { date: "Haz", "Aktif Kullanıcılar": 3129 },
];

export const Dashboard = () => {
  return (
    <div className="p-8 animate-fade-in">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">
        DASHBOARD
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Toplam Kullanıcı", value: "12.345" },
          { label: "Aktif Kullanıcı", value: "8.234" },
          { label: "Gelir", value: "₺34.567" },
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
          Kullanıcı Artışı
        </h2>
        <div className="h-72">
          <AreaChart
            data={chartdata}
            index="date"
            categories={["Aktif Kullanıcılar"]}
            colors={["blue"]}
          />
        </div>
      </div>
    </div>
  );
};
