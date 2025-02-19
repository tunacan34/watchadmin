
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, CheckCircle, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

// Durumlar için tip tanımı
type ListingStatus = "active" | "pending" | "rejected" | "inactive" | "sold";

// İlan tipi tanımı
interface Listing {
  id: number;
  coverImage: string;
  title: string;
  seller: string;
  isStore: boolean;
  price: number;
  status: ListingStatus;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  revisionCount: number;
}

// 50 adet örnek veri oluşturalım
const generateDummyListings = (): Listing[] => {
  const statuses: ListingStatus[] = ["active", "pending", "rejected", "inactive", "sold"];
  const watches = [
    "Rolex Daydate",
    "Rolex Submariner",
    "Patek Philippe Nautilus",
    "Audemars Piguet Royal Oak",
    "Cartier Santos",
    "Omega Seamaster",
    "IWC Portugieser",
    "Hublot Big Bang",
    "Vacheron Constantin",
    "Jaeger-LeCoultre"
  ];
  
  const sellers = [
    { name: "Lüks Saat Mağazası", isStore: true },
    { name: "Premium Saat", isStore: true },
    { name: "VIP Saat Boutique", isStore: true },
    { name: "Ahmet Yılmaz", isStore: false },
    { name: "Mehmet Demir", isStore: false },
    { name: "Ayşe Kaya", isStore: false },
    { name: "Saat Dünyası", isStore: true },
    { name: "Koleksiyoner Saatler", isStore: true }
  ];

  return Array.from({ length: 50 }, (_, i) => {
    const seller = sellers[Math.floor(Math.random() * sellers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const watch = watches[Math.floor(Math.random() * watches.length)];
    const year = 2020 + Math.floor(Math.random() * 4);
    const baseDate = new Date(2024, 0, 1);
    const createdAt = new Date(baseDate.getTime() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const revisionCount = Math.floor(Math.random() * 3);
    const updatedAt = new Date(createdAt.getTime() + (revisionCount > 0 ? Math.random() * 30 * 24 * 60 * 60 * 1000 : 0));

    return {
      id: i + 1,
      coverImage: `https://picsum.photos/seed/${i + 1}/200`,
      title: `${watch} ${year} / ${Math.random() > 0.7 ? "İkinci El" : "Sıfır"}`,
      seller: seller.name,
      isStore: seller.isStore,
      price: Math.floor(200000 + Math.random() * 1800000),
      status,
      views: status === "pending" ? 0 : Math.floor(Math.random() * 1000),
      createdAt,
      updatedAt,
      revisionCount
    };
  });
};

const listings = generateDummyListings().sort((a, b) => {
  if (a.status === "pending" && b.status !== "pending") return -1;
  if (a.status !== "pending" && b.status === "pending") return 1;
  return b.createdAt.getTime() - a.createdAt.getTime();
});

// Durum badge'i için renk ve metin belirleme
const getStatusBadge = (status: ListingStatus) => {
  const styles = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    inactive: "bg-gray-100 text-gray-800",
    sold: "bg-blue-100 text-blue-800",
  };

  const labels = {
    active: "Yayında",
    pending: "Onay Bekliyor",
    rejected: "Red",
    inactive: "Pasif",
    sold: "Satıldı",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ListingStatus | "all">("all");

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">İLANLAR</h1>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="İlan adı veya satıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter === "all" ? "Tüm Durumlar" : getStatusBadge(statusFilter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                Tüm Durumlar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Yayında
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Onay Bekliyor
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>
                Red
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                Pasif
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("sold")}>
                Satıldı
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Görsel</TableHead>
                <TableHead>İlan Adı</TableHead>
                <TableHead>Satıcı</TableHead>
                <TableHead>Fiyat</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Görüntülenme</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell>
                    <img
                      src={listing.coverImage}
                      alt={listing.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{listing.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{listing.seller}</span>
                      <span className="text-xs text-gray-500">
                        {listing.isStore ? "Mağaza" : "Üye"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{listing.price.toLocaleString('tr-TR')} ₺</TableCell>
                  <TableCell>{getStatusBadge(listing.status)}</TableCell>
                  <TableCell>{listing.status === "pending" ? 0 : listing.views}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm">
                        {format(listing.createdAt, "dd.MM.yyyy")}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{format(listing.updatedAt, "dd.MM.yyyy")}</span>
                        {listing.revisionCount > 0 && (
                          <span className="text-xs text-gray-400">
                            (Rev. {listing.revisionCount})
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {listing.status === "pending" && (
                        <Button variant="outline" size="icon" className="text-green-600 hover:text-green-700">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Listings;
