
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye, CheckCircle } from "lucide-react";
import { format } from "date-fns";

// Durumlar için tip tanımı
type ListingStatus = "active" | "pending" | "rejected" | "inactive" | "sold";

// İlan tipi tanımı
interface Listing {
  id: number;
  coverImage: string;
  title: string;
  seller: string;
  price: number;
  status: ListingStatus;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  revisionCount: number;
}

// Örnek veri
const listings: Listing[] = [
  {
    id: 1,
    coverImage: "https://picsum.photos/seed/1/200",
    title: "Rolex Daydate 2022 / Sıfır",
    seller: "Lüks Saat Mağazası",
    price: 750000,
    status: "pending",
    views: 0,
    createdAt: new Date(2024, 2, 15),
    updatedAt: new Date(2024, 2, 15),
    revisionCount: 0
  },
  {
    id: 2,
    coverImage: "https://picsum.photos/seed/2/200",
    title: "Rolex Submariner 2023 / Sıfır",
    seller: "Premium Saat",
    price: 650000,
    status: "active",
    views: 245,
    createdAt: new Date(2024, 2, 10),
    updatedAt: new Date(2024, 2, 14),
    revisionCount: 2
  },
  // Daha fazla örnek veri...
].sort((a, b) => {
  // Onay bekleyenler en üstte
  if (a.status === "pending" && b.status !== "pending") return -1;
  if (a.status !== "pending" && b.status === "pending") return 1;
  // Sonra tarihe göre sırala
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
  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">İLANLAR</h1>

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
            {listings.map((listing) => (
              <TableRow key={listing.id}>
                <TableCell>
                  <img
                    src={listing.coverImage}
                    alt={listing.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </TableCell>
                <TableCell className="font-medium">{listing.title}</TableCell>
                <TableCell>{listing.seller}</TableCell>
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
  );
};

export default Listings;
