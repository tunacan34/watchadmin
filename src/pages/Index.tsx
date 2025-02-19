
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Store, Bell, FileText, ShoppingBag, ArrowUpRight, ArrowDownRight, DollarSign, Clock, AlertTriangle, Star, TrendingUp, UserCheck, Building, Package, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const Index = () => {
  const activityData = [
    { name: "Pzt", users: 120, listings: 45, auctions: 25, revenue: 15000 },
    { name: "Sal", users: 132, listings: 48, auctions: 28, revenue: 18000 },
    { name: "Çar", users: 145, listings: 52, auctions: 30, revenue: 21000 },
    { name: "Per", users: 155, listings: 58, auctions: 32, revenue: 25000 },
    { name: "Cum", users: 148, listings: 62, auctions: 35, revenue: 23000 },
    { name: "Cmt", users: 160, listings: 65, auctions: 38, revenue: 28000 },
    { name: "Paz", users: 142, listings: 55, auctions: 30, revenue: 20000 },
  ];

  const categoryData = [
    { name: "Saat", value: 35, sales: 450000 },
    { name: "Takı", value: 25, sales: 320000 },
    { name: "Koleksiyon", value: 20, sales: 280000 },
    { name: "Antika", value: 15, sales: 180000 },
    { name: "Diğer", value: 5, sales: 70000 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
    },
    {
      title: "Günlük Gelir",
      value: "₺28,450",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign
    },
    {
      title: "Aktif Mağazalar",
      value: "156",
      change: "+3.2%",
      trend: "up",
      icon: Building
    },
    {
      title: "Ort. Oturum Süresi",
      value: "4m 32s",
      change: "-1.8%",
      trend: "down",
      icon: Clock
    },
    {
      title: "Premium Üyeler",
      value: "324",
      change: "+9.1%",
      trend: "up",
      icon: Star
    }
  ];

  const platformStats = [
    {
      title: "Sistem Performansı",
      value: 95,
      info: "Sunucu yanıt süresi: 120ms",
      icon: TrendingUp
    },
    {
      title: "Müşteri Memnuniyeti",
      value: 88,
      info: "Son 30 gün",
      icon: UserCheck
    },
    {
      title: "İşlem Güvenliği",
      value: 99,
      info: "Başarılı işlem oranı",
      icon: Shield
    }
  ];

  const recentActivity = [
    { id: 1, type: "user", text: "Yeni üye kaydı: Ahmet Y.", time: "5 dk önce", amount: null },
    { id: 2, type: "listing", text: "Yeni ilan: Rolex Daytona", time: "12 dk önce", amount: "₺450,000" },
    { id: 3, type: "auction", text: "Mezat tamamlandı: Vintage Saat", time: "25 dk önce", amount: "₺85,000" },
    { id: 4, type: "store", text: "Yeni mağaza: Luxury Watches", time: "45 dk önce", amount: null },
    { id: 5, type: "transaction", text: "Başarılı satış: Patek Philippe", time: "1 saat önce", amount: "₺750,000" },
    { id: 6, type: "alert", text: "Yüksek riskli işlem tespit edildi", time: "2 saat önce", amount: null }
  ];

  const topStores = [
    { name: "Luxury Time", sales: 450000, items: 45, rating: 4.8 },
    { name: "VintageWorld", sales: 380000, items: 38, rating: 4.7 },
    { name: "Elite Watches", sales: 320000, items: 32, rating: 4.9 },
    { name: "Classic Collection", sales: 280000, items: 28, rating: 4.6 }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
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

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {platformStats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">{stat.title}</h3>
                </div>
                <span className="text-lg font-bold">{stat.value}%</span>
              </div>
              <Progress value={stat.value} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{stat.info}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Platform Aktivitesi</CardTitle>
            <CardDescription className="text-xs">Haftalık kullanıcı ve işlem verileri</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" name="Kullanıcılar" stroke="#8884d8" />
                  <Line type="monotone" dataKey="listings" name="İlanlar" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="auctions" name="Mezatlar" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">Kategori Dağılımı ve Satışlar</CardTitle>
            <CardDescription className="text-xs">Kategorilere göre satış performansı</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Bar dataKey="value" name="Oran (%)" fill="#8884d8" />
                  <Bar dataKey="sales" name="Satış (₺)" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader className="p-4">
            <CardTitle className="text-sm">En İyi Performans Gösteren Mağazalar</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-4">
              {topStores.map((store) => (
                <div key={store.name} className="flex items-center justify-between p-2 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{store.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {store.items} Ürün · {store.rating} Puan
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">₺{store.sales.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Toplam Satış</div>
                  </div>
                </div>
              ))}
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
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{activity.text}</p>
                      {activity.amount && (
                        <Badge variant="secondary" className="ml-2">
                          {activity.amount}
                        </Badge>
                      )}
                    </div>
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
