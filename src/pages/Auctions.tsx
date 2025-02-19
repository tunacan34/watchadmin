
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal, Ban, Play, Pause, CheckCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

type AuctionStatus = "pending" | "active" | "completed" | "cancelled" | "paused";
type StoreType = "standard" | "premium" | null;

interface Auction {
  id: number;
  coverImage: string;
  title: string;
  seller: {
    name: string;
    isStore: boolean;
    storeType: StoreType;
  };
  startDate: Date;
  endDate: Date;
  startingPrice: number;
  currentBid: number | null;
  totalBids: number;
  status: AuctionStatus;
  favorites: number;
}

const generateDummyAuctions = (): Auction[] => {
  const now = new Date();
  return [
    {
      id: 1,
      coverImage: "https://picsum.photos/200/200",
      title: "Rolex Submariner 2021 / Yeni",
      seller: {
        name: "Lüks Saat Mağazası",
        isStore: true,
        storeType: "premium",
      },
      startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      startingPrice: 750000,
      currentBid: null,
      totalBids: 0,
      status: "pending",
      favorites: 12,
    },
    {
      id: 2,
      coverImage: "https://picsum.photos/200/200",
      title: "Rolex Daytona 2020",
      seller: {
        name: "Ahmet Yılmaz",
        isStore: false,
        storeType: null,
      },
      startDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
      endDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
      startingPrice: 650000,
      currentBid: 680000,
      totalBids: 8,
      status: "active",
      favorites: 24,
    },
    // Daha fazla örnek veri eklenebilir
  ];
};

const getStatusBadge = (status: AuctionStatus) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    active: "bg-green-100 text-green-800 border border-green-200",
    completed: "bg-blue-100 text-blue-800 border border-blue-200",
    cancelled: "bg-red-100 text-red-800 border border-red-200",
    paused: "bg-gray-100 text-gray-800 border border-gray-200",
  };

  const labels = {
    pending: "Onay Bekliyor",
    active: "Aktif",
    completed: "Tamamlandı",
    cancelled: "İptal Edildi",
    paused: "Durduruldu",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

const getRemainingTime = (endDate: Date) => {
  const now = new Date();
  if (now >= endDate) return "Süre Doldu";
  
  return formatDistanceToNow(endDate, {
    locale: tr,
    addSuffix: true,
  });
};

const getSellerInfo = (seller: { name: string; isStore: boolean; storeType: StoreType }) => {
  if (!seller.isStore) {
    return (
      <div className="flex flex-col">
        <span>{seller.name}</span>
        <span className="text-xs text-gray-500">Üye</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <span>{seller.name}</span>
      <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${
        seller.storeType === "premium"
          ? "bg-orange-100 text-orange-800 border border-orange-200"
          : "bg-purple-100 text-purple-800 border border-purple-200"
      }`}>
        {seller.storeType === "premium" ? "Premium Mağaza" : "Standart Mağaza"}
      </span>
    </div>
  );
};

const Auctions = () => {
  const auctions = generateDummyAuctions();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">MEZATLAR</h1>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Görsel</TableHead>
              <TableHead>Saat Adı</TableHead>
              <TableHead>Satıcı</TableHead>
              <TableHead>Tarihler</TableHead>
              <TableHead>Fiyatlar</TableHead>
              <TableHead>Teklif</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Favori</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auctions.map((auction) => (
              <TableRow key={auction.id}>
                <TableCell>
                  <img
                    src={auction.coverImage}
                    alt={auction.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </TableCell>
                <TableCell className="font-medium">{auction.title}</TableCell>
                <TableCell>{getSellerInfo(auction.seller)}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col">
                      <span className="text-sm">Başlangıç:</span>
                      <span className="font-medium">
                        {format(auction.startDate, "dd.MM.yyyy HH:mm")}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm">Bitiş:</span>
                      <span className="font-medium">
                        {format(auction.endDate, "dd.MM.yyyy HH:mm")}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getRemainingTime(auction.endDate)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col">
                      <span className="text-sm">Başlangıç:</span>
                      <span className="font-medium">
                        {auction.startingPrice.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                    {auction.currentBid && (
                      <div className="flex flex-col">
                        <span className="text-sm">Güncel Teklif:</span>
                        <span className="font-medium text-green-600">
                          {auction.currentBid.toLocaleString("tr-TR")} ₺
                        </span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>{auction.totalBids}</TableCell>
                <TableCell>{getStatusBadge(auction.status)}</TableCell>
                <TableCell>{auction.favorites}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {auction.status === "pending" && (
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Onayla
                          </DropdownMenuItem>
                        )}
                        {auction.status === "active" && (
                          <DropdownMenuItem>
                            <Pause className="w-4 h-4 mr-2" />
                            Durdur
                          </DropdownMenuItem>
                        )}
                        {auction.status === "paused" && (
                          <DropdownMenuItem>
                            <Play className="w-4 h-4 mr-2" />
                            Devam Et
                          </DropdownMenuItem>
                        )}
                        {["pending", "active", "paused"].includes(auction.status) && (
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            İptal Et
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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

export default Auctions;
