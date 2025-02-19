
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ShowcaseListing {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  seller: string;
  status: "active" | "pending" | "expired";
  listedAt: string;
  expiresAt: string;
  views: number;
}

const Showcase = () => {
  // Örnek vitrin ilanları
  const showcaseListings: ShowcaseListing[] = [
    {
      id: "1",
      title: "Rolex Submariner 2022",
      brand: "Rolex",
      model: "Submariner",
      price: 450000,
      seller: "Luxury Watch Store",
      status: "active",
      listedAt: "2024-03-15",
      expiresAt: "2024-04-15",
      views: 1250
    },
    {
      id: "2",
      title: "Omega Speedmaster Professional",
      brand: "Omega",
      model: "Speedmaster",
      price: 185000,
      seller: "Classic Timepieces",
      status: "active",
      listedAt: "2024-03-14",
      expiresAt: "2024-04-14",
      views: 890
    },
    {
      id: "3",
      title: "Patek Philippe Nautilus",
      brand: "Patek Philippe",
      model: "Nautilus",
      price: 1250000,
      seller: "Premium Watch Gallery",
      status: "active",
      listedAt: "2024-03-13",
      expiresAt: "2024-04-13",
      views: 2100
    },
    {
      id: "4",
      title: "Audemars Piguet Royal Oak",
      brand: "Audemars Piguet",
      model: "Royal Oak",
      price: 850000,
      seller: "VIP Watches",
      status: "pending",
      listedAt: "2024-03-16",
      expiresAt: "2024-04-16",
      views: 0
    },
    {
      id: "5",
      title: "IWC Portugieser Chronograph",
      brand: "IWC",
      model: "Portugieser",
      price: 225000,
      seller: "Time Masters",
      status: "active",
      listedAt: "2024-03-12",
      expiresAt: "2024-04-12",
      views: 750
    },
    {
      id: "6",
      title: "Cartier Santos",
      brand: "Cartier",
      model: "Santos",
      price: 195000,
      seller: "Elegant Watch Co.",
      status: "expired",
      listedAt: "2024-02-15",
      expiresAt: "2024-03-15",
      views: 1580
    },
    {
      id: "7",
      title: "Hublot Big Bang",
      brand: "Hublot",
      model: "Big Bang",
      price: 380000,
      seller: "Modern Watches",
      status: "active",
      listedAt: "2024-03-10",
      expiresAt: "2024-04-10",
      views: 920
    },
    {
      id: "8",
      title: "Jaeger-LeCoultre Reverso",
      brand: "Jaeger-LeCoultre",
      model: "Reverso",
      price: 275000,
      seller: "Heritage Timepieces",
      status: "active",
      listedAt: "2024-03-11",
      expiresAt: "2024-04-11",
      views: 680
    }
  ];

  const getStatusBadge = (status: ShowcaseListing["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Aktif</Badge>;
      case "pending":
        return <Badge variant="secondary">Onay Bekliyor</Badge>;
      case "expired":
        return <Badge variant="destructive">Süresi Doldu</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-6">VİTRİN</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>İlan Başlığı</TableHead>
              <TableHead>Marka</TableHead>
              <TableHead>Model</TableHead>
              <TableHead className="text-right">Fiyat</TableHead>
              <TableHead>Satıcı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Listelenme</TableHead>
              <TableHead>Bitiş</TableHead>
              <TableHead className="text-right">Görüntülenme</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showcaseListings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{listing.brand}</TableCell>
                <TableCell>{listing.model}</TableCell>
                <TableCell className="text-right">{formatPrice(listing.price)}</TableCell>
                <TableCell>{listing.seller}</TableCell>
                <TableCell>{getStatusBadge(listing.status)}</TableCell>
                <TableCell>{formatDate(listing.listedAt)}</TableCell>
                <TableCell>{formatDate(listing.expiresAt)}</TableCell>
                <TableCell className="text-right">{listing.views.toLocaleString('tr-TR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Showcase;
