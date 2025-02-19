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
import { Eye, MoreHorizontal, Ban, Play, Pause, CheckCircle, Search, Filter } from "lucide-react";
import { format, formatDistanceToNow, subDays, addDays } from "date-fns";
import { tr } from "date-fns/locale";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const watchBrands = ["Rolex", "Patek Philippe", "Audemars Piguet", "Omega", "Cartier"];
  const watchModels = ["Submariner", "Nautilus", "Royal Oak", "Seamaster", "Tank"];
  const years = ["2020", "2021", "2022", "2023"];
  const storeNames = ["Lüks Saat Mağazası", "VIP Saat Butik", "Elite Timepieces", "Watch Empire"];
  const memberNames = ["Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Can Öztürk", "Zeynep Çelik"];

  return Array.from({ length: 50 }, (_, index) => {
    const isStore = Math.random() > 0.5;
    const status: AuctionStatus[] = ["pending", "active", "completed", "cancelled", "paused"];
    const randomStatus = status[Math.floor(Math.random() * status.length)];
    const startDate = subDays(now, Math.floor(Math.random() * 10));
    const endDate = addDays(startDate, Math.floor(Math.random() * 30) + 1);
    const startingPrice = Math.floor(Math.random() * 900000) + 100000;
    const currentBid = randomStatus === "active" ? startingPrice + Math.floor(Math.random() * 200000) : null;

    return {
      id: index + 1,
      coverImage: `https://picsum.photos/seed/${index}/200/200`,
      title: `${watchBrands[Math.floor(Math.random() * watchBrands.length)]} ${
        watchModels[Math.floor(Math.random() * watchModels.length)]
      } ${years[Math.floor(Math.random() * years.length)]}`,
      seller: {
        name: isStore
          ? storeNames[Math.floor(Math.random() * storeNames.length)]
          : memberNames[Math.floor(Math.random() * memberNames.length)],
        isStore,
        storeType: isStore ? (Math.random() > 0.5 ? "premium" : "standard") : null,
      },
      startDate,
      endDate,
      startingPrice,
      currentBid,
      totalBids: Math.floor(Math.random() * 20),
      status: randomStatus,
      favorites: Math.floor(Math.random() * 50),
    };
  });
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
  const allAuctions = generateDummyAuctions();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AuctionStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = {
    total: allAuctions.length,
    active: allAuctions.filter(a => a.status === "active").length,
    pending: allAuctions.filter(a => a.status === "pending").length,
    completed: allAuctions.filter(a => a.status === "completed").length,
    cancelled: allAuctions.filter(a => a.status === "cancelled").length,
    paused: allAuctions.filter(a => a.status === "paused").length,
    totalBids: allAuctions.reduce((sum, auction) => sum + auction.totalBids, 0),
    totalFavorites: allAuctions.reduce((sum, auction) => sum + auction.favorites, 0),
  };

  const filteredAuctions = allAuctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.seller.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || auction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAuctions = filteredAuctions.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">MEZATLAR</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Toplam Mezat</div>
          <div className="text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Aktif Mezat</div>
          <div className="text-2xl font-semibold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Toplam Teklif</div>
          <div className="text-2xl font-semibold text-blue-600">{stats.totalBids}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Toplam Favori</div>
          <div className="text-2xl font-semibold text-orange-600">{stats.totalFavorites}</div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Mezat adı veya satıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {statusFilter === "all" ? "Tüm Durumlar" : getStatusBadge(statusFilter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                Tüm Durumlar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                Aktif
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Onay Bekleyen
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                Tamamlanan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                İptal Edilen
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("paused")}>
                Durdurulan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-sm text-gray-500">
          Toplam {filteredAuctions.length} mezat bulundu
        </div>
      </div>

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
            {paginatedAuctions.map((auction) => (
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

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => changePage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => changePage(page)}
                        isActive={page === currentPage}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Auctions;
