
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  PackageSearch,
  Store,
  Gavel,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const Statistics = () => {
  // Örnek veriler
  const activityData = [
    { date: "Pazartesi", ilanlar: 120, mezatlar: 45, kullanicilar: 250 },
    { date: "Salı", ilanlar: 132, mezatlar: 48, kullanicilar: 280 },
    { date: "Çarşamba", ilanlar: 145, mezatlar: 52, kullanicilar: 290 },
    { date: "Perşembe", ilanlar: 155, mezatlar: 58, kullanicilar: 310 },
    { date: "Cuma", ilanlar: 148, mezatlar: 62, kullanicilar: 285 },
    { date: "Cumartesi", ilanlar: 138, mezatlar: 55, kullanicilar: 270 },
    { date: "Pazar", ilanlar: 128, mezatlar: 50, kullanicilar: 260 },
  ];

  const statusData = [
    { name: "İlanlar", aktif: 850, onayBekleyen: 120, reddedilen: 30 },
    { name: "Mezatlar", aktif: 320, onayBekleyen: 45, reddedilen: 15 },
    { name: "Mağazalar", aktif: 150, onayBekleyen: 25, reddedilen: 5 },
  ];

  const userGrowthData = [
    { ay: "Ocak", total: 1200, new: 200 },
    { ay: "Şubat", total: 1400, new: 220 },
    { ay: "Mart", total: 1650, new: 250 },
    { ay: "Nisan", total: 1850, new: 200 },
    { ay: "Mayıs", total: 2100, new: 250 },
    { ay: "Haziran", total: 2400, new: 300 },
  ];

  // Değişim yüzdeleri
  const metrics = [
    {
      title: "Toplam Kullanıcı",
      value: "2,400",
      change: "+12.5%",
      trend: "up",
      description: "Son 30 günde"
    },
    {
      title: "Aktif İlanlar",
      value: "850",
      change: "+8.2%",
      trend: "up",
      description: "Son 30 günde"
    },
    {
      title: "Aktif Mezatlar",
      value: "320",
      change: "-2.4%",
      trend: "down",
      description: "Son 30 günde"
    },
    {
      title: "Aktif Mağazalar",
      value: "150",
      change: "+5.7%",
      trend: "up",
      description: "Son 30 günde"
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-6">İSTATİSTİK</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              {metric.trend === "up" ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs flex items-center gap-1">
                <Badge variant={metric.trend === "up" ? "default" : "destructive"}>
                  {metric.change}
                </Badge>
                <span className="text-muted-foreground">{metric.description}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site Aktivitesi</CardTitle>
            <CardDescription>Günlük aktivite değişimleri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="ilanlar" 
                    name="İlanlar"
                    stroke="#8884d8" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mezatlar" 
                    name="Mezatlar"
                    stroke="#82ca9d" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="kullanicilar" 
                    name="Kullanıcılar"
                    stroke="#ffc658" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Büyümesi</CardTitle>
            <CardDescription>Aylık toplam ve yeni kullanıcı sayısı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ay" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    name="Toplam Kullanıcı"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="new" 
                    name="Yeni Kullanıcı"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Durum Dağılımı</CardTitle>
          <CardDescription>İlan, mezat ve mağazaların durum dağılımları</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar 
                  dataKey="aktif" 
                  name="Aktif" 
                  fill="#82ca9d" 
                  stackId="a"
                />
                <Bar 
                  dataKey="onayBekleyen" 
                  name="Onay Bekleyen" 
                  fill="#ffc658" 
                  stackId="a"
                />
                <Bar 
                  dataKey="reddedilen" 
                  name="Reddedilen" 
                  fill="#ff8042" 
                  stackId="a"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
