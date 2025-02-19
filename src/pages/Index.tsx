
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Bell, FileText, ShoppingBag, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const Index = () => {
  // Örnek veriler
  const activityData = [
    { name: "Pzt", users: 120, listings: 45, auctions: 25 },
    { name: "Sal", users: 132, listings: 48, auctions: 28 },
    { name: "Çar", users: 145, listings: 52, auctions: 30 },
    { name: "Per", users: 155, listings: 58, auctions: 32 },
    { name: "Cum", users: 148, listings: 62, auctions: 35 },
  ];

  const revenueData = [
    { name: "1", value: 45, amount: 450000 },
    { name: "2", value: 30, amount: 300000 },
    { name: "3", value: 25, amount: 250000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const metrics = [
    {
      title: "Toplam Kullanıcı",
      value: "2,856",
      change: "+12.5%",
      trend: "up",
      icon: Users
    },
    {
      title: "Aktif İlanlar",
      value: "485",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingBag
    },
    {
      title: "Aktif Mezatlar",
      value: "124",
      change: "-2.4%",
      trend: "down",
      icon: Store
    },
    {
      title: "Onay Bekleyenler",
      value: "45",
      change: "+5.7%",
      trend: "up",
      icon: FileText
    }
  ];

  const recentActivity = [
    { id: 1, type: "user", text: "Yeni üye kaydı: Ahmet Y.", time: "5 dk önce" },
    { id: 2, type: "listing", text: "Yeni ilan: Rolex Daytona", time: "12 dk önce" },
    { id: 3, type: "auction", text: "Mezat tamamlandı: Vintage Saat", time: "25 dk önce" },
    { id: 4, type: "store", text: "Yeni mağaza: Luxury Watches", time: "45 dk önce" },
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="overflow-hidden">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <metric.icon className="w-4 h-4 text-muted-foreground" />
                <p className="text-xs font-medium text-muted-foreground">{metric.title}</p>
                <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="ml-auto text-xs">
                  {metric.change}
                </Badge>
              </div>
              <div className="text-lg font-bold mt-1">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Platform Aktivitesi</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                  <Line type="monotone" dataKey="listings" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="auctions" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Gelir Dağılımı</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Bekleyen Onaylar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="listings" fill="#8884d8" />
                  <Bar dataKey="auctions" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-sm flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Son Aktiviteler
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                  <div>
                    <p className="font-medium">{activity.text}</p>
                    <p className="text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
