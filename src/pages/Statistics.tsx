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
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { addMonths, subMonths } from "date-fns";

const Statistics = () => {
  const [period, setPeriod] = useState<"1" | "3" | "6" | "12" | "custom">("6");
  const [startDate, setStartDate] = useState<Date | undefined>(subMonths(new Date(), 6));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

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

  const popularListings = [
    { id: 1, title: "Rolex Daytona 2024", views: 12500, favorites: 450, price: 1250000 },
    { id: 2, title: "Patek Philippe Nautilus", views: 11200, favorites: 380, price: 2350000 },
    { id: 3, title: "Audemars Piguet Royal Oak", views: 9800, favorites: 320, price: 1850000 },
    { id: 4, title: "Cartier Santos 2023", views: 8900, favorites: 290, price: 450000 },
    { id: 5, title: "Omega Speedmaster", views: 8200, favorites: 275, price: 350000 },
  ];

  const popularAuctions = [
    { id: 1, title: "Vintage Rolex Collection", currentBid: 850000, bidCount: 45, endTime: "2 saat" },
    { id: 2, title: "Limited Edition AP", currentBid: 1250000, bidCount: 38, endTime: "5 saat" },
    { id: 3, title: "Rare Patek Philippe", currentBid: 2100000, bidCount: 32, endTime: "12 saat" },
    { id: 4, title: "Classic Vacheron", currentBid: 950000, bidCount: 28, endTime: "1 gün" },
    { id: 5, title: "Special IWC Set", currentBid: 750000, bidCount: 25, endTime: "2 gün" },
  ];

  const topStores = [
    { id: 1, name: "Luxury Watch Store", followers: 12500, rating: 4.9, totalSales: 450 },
    { id: 2, name: "VIP Timepieces", followers: 11200, rating: 4.8, totalSales: 380 },
    { id: 3, name: "Elite Watches", followers: 9800, rating: 4.9, totalSales: 320 },
    { id: 4, name: "Premium Time", followers: 8900, rating: 4.7, totalSales: 290 },
    { id: 5, name: "Watch Masters", followers: 8200, rating: 4.8, totalSales: 275 },
  ];

  const handlePeriodChange = (value: "1" | "3" | "6" | "12" | "custom") => {
    setPeriod(value);
    if (value !== "custom") {
      const months = parseInt(value);
      setStartDate(subMonths(new Date(), months));
      setEndDate(new Date());
    }
  };

  const getFilteredData = (data: any[], startDate: Date | undefined, endDate: Date | undefined) => {
    if (!startDate || !endDate) return data;
    return data;
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-admin-foreground">İSTATİSTİK</h1>
        
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
                <span className="text-muted-foreground">
                  {period === "custom" ? "Seçilen dönemde" : "Son " + period + " ayda"}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Site Aktivitesi</CardTitle>
            <CardDescription>
              {period === "custom" 
                ? "Seçilen tarih aralığında aktivite değişimleri"
                : `Son ${period} aylık aktivite değişimleri`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getFilteredData(activityData, startDate, endDate)}>
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
            <CardDescription>
              {period === "custom" 
                ? "Seçilen tarih aralığında kullanıcı büyümesi"
                : `Son ${period} aylık kullanıcı büyümesi`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getFilteredData(userGrowthData, startDate, endDate)}>
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

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <PackageSearch className="w-4 h-4" />
              Popüler İlanlar
            </CardTitle>
            <CardDescription className="text-xs">En çok görüntülenen ilanlar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularListings.map((listing) => (
              <div key={listing.id} className="flex items-start justify-between border-b pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{listing.title}</p>
                  <div className="text-xs text-muted-foreground">
                    {listing.views.toLocaleString()} görüntülenme · {listing.favorites} favori
                  </div>
                </div>
                <div className="font-semibold text-sm">{listing.price.toLocaleString()} ₺</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gavel className="w-4 h-4" />
              Popüler Mezatlar
            </CardTitle>
            <CardDescription className="text-xs">En çok teklif alan mezatlar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {popularAuctions.map((auction) => (
              <div key={auction.id} className="flex items-start justify-between border-b pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{auction.title}</p>
                  <div className="text-xs text-muted-foreground">
                    {auction.bidCount} teklif · {auction.endTime} kaldı
                  </div>
                </div>
                <div className="font-semibold text-sm">{auction.currentBid.toLocaleString()} ₺</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Store className="w-4 h-4" />
              En Çok Takip Edilen Mağazalar
            </CardTitle>
            <CardDescription className="text-xs">En popüler mağazalar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {topStores.map((store) => (
              <div key={store.id} className="flex items-start justify-between border-b pb-2 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{store.name}</p>
                  <div className="text-xs text-muted-foreground">
                    {store.followers.toLocaleString()} takipçi · {store.rating} puan
                  </div>
                </div>
                <div className="font-semibold text-sm">{store.totalSales} satış</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Durum Dağılımı</CardTitle>
          <CardDescription>
            {period === "custom" 
              ? "Seçilen tarih aralığında durum dağılımları"
              : `Son ${period} aylık durum dağılımları`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getFilteredData(statusData, startDate, endDate)}>
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
