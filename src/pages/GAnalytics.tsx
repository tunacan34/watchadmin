
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Globe, Users, Clock, MousePointer } from "lucide-react";

const GAnalytics = () => {
  // Örnek veriler (gerçekte Google Analytics API'den gelecek)
  const visitorsData = [
    { date: "1 Mart", users: 1200, newUsers: 320, sessions: 1800 },
    { date: "2 Mart", users: 1400, newUsers: 280, sessions: 2100 },
    { date: "3 Mart", users: 1300, newUsers: 350, sessions: 1950 },
    { date: "4 Mart", users: 1600, newUsers: 400, sessions: 2400 },
    { date: "5 Mart", users: 1800, newUsers: 450, sessions: 2700 },
    { date: "6 Mart", users: 1700, newUsers: 380, sessions: 2550 },
    { date: "7 Mart", users: 1900, newUsers: 420, sessions: 2850 },
  ];

  const pageViewsData = [
    { page: "/anasayfa", views: 12500 },
    { page: "/ilanlar", views: 8300 },
    { page: "/mezatlar", views: 6200 },
    { page: "/magazalar", views: 4100 },
    { page: "/hakkimizda", views: 2800 },
  ];

  const bounceRateData = [
    { platform: "Masaüstü", rate: 45 },
    { platform: "Mobil", rate: 35 },
    { platform: "Tablet", rate: 20 },
  ];

  const trafficSourceData = [
    { source: "Organik Arama", value: 40, color: "#0088FE" },
    { source: "Doğrudan", value: 25, color: "#00C49F" },
    { source: "Sosyal Medya", value: 20, color: "#FFBB28" },
    { source: "Yönlendirme", value: 15, color: "#FF8042" },
  ];

  const metrics = [
    {
      title: "Aktif Kullanıcılar",
      value: "1,824",
      change: "+12.5%",
      icon: Users,
    },
    {
      title: "Oturum Süresi",
      value: "4m 32s",
      change: "+5.2%",
      icon: Clock,
    },
    {
      title: "Hemen Çıkma Oranı",
      value: "32.8%",
      change: "-2.4%",
      icon: MousePointer,
    },
    {
      title: "Sayfa/Oturum",
      value: "3.9",
      change: "+8.1%",
      icon: Globe,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-6">GOOGLE ANALYTICS</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} son 7 günde
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ziyaretçi Analizi</CardTitle>
            <CardDescription>Son 7 günlük kullanıcı ve oturum verileri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" name="Kullanıcılar" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="newUsers" name="Yeni Kullanıcılar" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="sessions" name="Oturumlar" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sayfa Görüntülenmeleri</CardTitle>
            <CardDescription>En çok ziyaret edilen sayfalar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pageViewsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="page" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" name="Görüntülenme" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Platform Bazlı Hemen Çıkma Oranı</CardTitle>
            <CardDescription>Cihaz türüne göre hemen çıkma oranları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={bounceRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="rate" name="Hemen Çıkma Oranı %" fill="#8884d8" stroke="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trafik Kaynakları</CardTitle>
            <CardDescription>Ziyaretçi kaynak dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GAnalytics;
