
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, TrendingUp, Store, Package } from "lucide-react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analysis = () => {
  // Son 6 ayın gelir verileri
  const monthlyRevenue = [
    { month: "Ekim", store: 25000, booster: 18000 },
    { month: "Kasım", store: 28000, booster: 22000 },
    { month: "Aralık", store: 32000, booster: 24000 },
    { month: "Ocak", store: 35000, booster: 28000 },
    { month: "Şubat", store: 40000, booster: 32000 },
    { month: "Mart", store: 45000, booster: 38000 },
  ];

  // Doping türlerine göre dağılım
  const boosterDistribution = [
    { name: "İlan Paketi", value: 45 },
    { name: "Vitrin", value: 30 },
    { name: "Arama", value: 25 },
  ];

  // Mağaza türlerine göre dağılım
  const storeDistribution = [
    { name: "Standart", value: 70 },
    { name: "Premium", value: 30 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(value);
  };

  // Toplam gelir hesaplama
  const totalRevenue = monthlyRevenue.reduce(
    (acc, curr) => acc + curr.store + curr.booster,
    0
  );

  // Son ay geliri
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].store + 
    monthlyRevenue[monthlyRevenue.length - 1].booster;

  // Bir önceki ay geliri
  const previousMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].store + 
    monthlyRevenue[monthlyRevenue.length - 2].booster;

  // Büyüme oranı
  const growthRate = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-6">ANALİZ</h1>

      {/* Özet Kartları */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Toplam Gelir
            </CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              Son 6 ay toplam
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aylık Büyüme
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              %{growthRate.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              Bir önceki aya göre
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Mağaza Gelirleri
            </CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(monthlyRevenue[monthlyRevenue.length - 1].store)}
            </div>
            <p className="text-xs text-muted-foreground">
              Bu ay
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Doping Gelirleri
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(monthlyRevenue[monthlyRevenue.length - 1].booster)}
            </div>
            <p className="text-xs text-muted-foreground">
              Bu ay
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gelir Grafiği */}
      <Card>
        <CardHeader>
          <CardTitle>Aylık Gelir Analizi</CardTitle>
          <CardDescription>Son 6 aylık mağaza ve doping gelirleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `₺${value/1000}K`} />
                <Tooltip 
                  formatter={(value: number) => formatPrice(value)}
                  labelStyle={{ color: 'black' }}
                />
                <Bar dataKey="store" name="Mağaza" fill="#0088FE" stackId="a" />
                <Bar dataKey="booster" name="Doping" fill="#00C49F" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Dağılım Grafikleri */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Doping Dağılımı</CardTitle>
            <CardDescription>Doping türlerine göre satış dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={boosterDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {boosterDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mağaza Dağılımı</CardTitle>
            <CardDescription>Mağaza türlerine göre abonelik dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {storeDistribution.map((entry, index) => (
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
    </div>
  );
};

export default Analysis;
