import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Check } from "lucide-react";
import { useState } from "react";

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

interface AvailableListing {
  id: string;
  title: string;
  seller: string;
  image: string;
  price: number;
}

const Showcase = () => {
  const [selectedListing, setSelectedListing] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Vitrine eklenebilecek örnek ilanlar
  const availableListings: AvailableListing[] = [
    {
      id: "101",
      title: "Rolex Daytona 2023",
      seller: "Premium Watches",
      image: "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=100&h=100",
      price: 750000
    },
    {
      id: "102",
      title: "Patek Philippe Calatrava",
      seller: "Luxury Time",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=100&h=100",
      price: 980000
    },
    {
      id: "103",
      title: "Omega Seamaster 300",
      seller: "Watch Masters",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=100&h=100",
      price: 245000
    },
    {
      id: "104",
      title: "Cartier Tank Must",
      seller: "Elite Timepieces",
      image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?auto=format&fit=crop&w=100&h=100",
      price: 168000
    }
  ];

  const handleAddToShowcase = () => {
    if (!selectedListing || duration < 1) return;
    
    // Burada vitrine ekleme işlemi yapılacak
    console.log("İlan vitrinde yayınlanacak:", {
      listingId: selectedListing,
      duration: duration
    });
    
    setSelectedListing("");
    setDuration(30);
    setDialogOpen(false);
  };

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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-admin-foreground">VİTRİN</h1>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Vitrine İlan Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Vitrine İlan Ekle</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                {availableListings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedListing === listing.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedListing(listing.id)}
                  >
                    <div className="flex gap-3">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{listing.title}</h3>
                        <p className="text-sm text-muted-foreground">{listing.seller}</p>
                        <p className="text-sm font-medium mt-1">{formatPrice(listing.price)}</p>
                      </div>
                      {selectedListing === listing.id && (
                        <div className="self-center">
                          <Check className="w-5 h-5 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Vitrin Süresi (Gün)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  max={90}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>

              <Button 
                onClick={handleAddToShowcase}
                disabled={!selectedListing || duration < 1}
              >
                Vitrine Ekle
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
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
