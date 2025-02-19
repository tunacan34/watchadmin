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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

const Analysis = () => {
  const [period, setPeriod] = useState<"1" | "3" | "6" | "12" | "custom">("6");
  const [startDate, setStartDate] = useState<Date | undefined>(subMonths(new Date(), 6));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  // Son 12 aylık veri
  const allMonthlyRevenue = [
    { month: "Nisan 2023", store: 20000, booster: 15000 },
    { month: "Mayıs 2023", store: 22000, booster: 16000 },
    { month: "Haziran 2023", store: 23000, booster: 17000 },
    { month: "Temmuz 2023", store: 24000, booster: 17500 },
    { month: "Ağustos 2023", store: 25000, booster: 18000 },
    { month: "Eylül 2023", store: 26000, booster: 19000 },
    { month: "Ekim 2023", store: 25000, booster: 18000 },
    { month: "Kasım 2023", store: 28000, booster: 22000 },
    { month: "Aralık 2023", store: 32000, booster: 24000 },
    { month: "Ocak 2024", store: 35000, booster: 28000 },
    { month: "Şubat 2024", store: 40000, booster: 32000 },
    { month: "Mart 2024", store: 45000, booster: 38000 },
  ];

  // Seçilen periyoda göre veriyi filtrele
  const getFilteredData = () => {
    if (period === "custom" && startDate && endDate) {
      // Özel tarih aralığı için filtreleme
      return allMonthlyRevenue.slice(-12); // Bu kısım gerçek API'den gelen veriye göre düzenlenmeli
    }

    const months = parseInt(period);
    return allMonthlyRevenue.slice(-months);
  };

  const monthlyRevenue = getFilteredData();

  const boosterDistribution = [
    { name: "İlan Paketi", value: 45, amount: 450000 },
    { name: "Vitrin", value: 30, amount: 300000 },
    { name: "Arama", value: 25, amount: 250000 },
  ];

  const storeDistribution = [
    { name: "Standart", value: 70, amount: 700000 },
    { name: "Premium", value: 30, amount: 300000 },
  ];

  const totalBoosterAmount = boosterDistribution.reduce((sum, item) => sum + item.amount, 0);
  const totalStoreAmount = storeDistribution.reduce((sum, item) => sum + item.amount, 0);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(value);
  };

  const totalRevenue = monthlyRevenue.reduce(
    (acc, curr) => acc + curr.store + curr.booster,
    0
  );

  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].store + 
    monthlyRevenue[monthlyRevenue.length - 1].booster;

  const previousMonthRevenue = monthlyRevenue[monthlyRevenue.length - 2].store + 
    monthlyRevenue[monthlyRevenue.length - 2].booster;

  const growthRate = ((lastMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;

  const handlePeriodChange = (value: "1" | "3" | "6" | "12" | "custom") => {
    setPeriod(value);
    if (value !== "custom") {
      const months = parseInt(value);
      setStartDate(subMonths(new Date(), months));
      setEndDate(new Date());
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-admin-foreground">ANALİZ</h1>
        
        <div className="flex gap-4 items-center">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Periyot seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Son 1 Ay</SelectItem>
              <SelectItem value="3">Son 3 Ay</SelectItem>
              <SelectItem value="6">Son 6 Ay</SelectItem>
              <SelectItem value="12">Son 12 Ay</SelectItem>
              <SelectItem value="custom">Özel Tarih Aralığı</SelectItem>
            </SelectContent>
          </Select>

          {period === "custom" && (
            <div className="flex gap-2">
              <DatePicker
                date={startDate}
                setDate={setStartDate}
                placeholder="Başlangıç"
              />
              <DatePicker
                date={endDate}
                setDate={setEndDate}
                placeholder="Bitiş"
              />
            </div>
          )}
        </div>
      </div>

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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Doping Dağılımı</span>
              <span className="text-lg font-normal text-muted-foreground">
                Toplam: {formatPrice(totalBoosterAmount)}
              </span>
            </CardTitle>
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
                    label={({ name, percent, payload }) => 
                      `${name} ${(percent * 100).toFixed(0)}% (${formatPrice(payload.amount)})`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {boosterDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      formatPrice(props.payload.amount),
                      name
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Mağaza Dağılımı</span>
              <span className="text-lg font-normal text-muted-foreground">
                Toplam: {formatPrice(totalStoreAmount)}
              </span>
            </CardTitle>
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
                    label={({ name, percent, payload }) => 
                      `${name} ${(percent * 100).toFixed(0)}% (${formatPrice(payload.amount)})`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {storeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name, props) => [
                      formatPrice(props.payload.amount),
                      name
                    ]}
                  />
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
