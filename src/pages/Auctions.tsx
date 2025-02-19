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
type SortField = "timeLeft" | "bids" | null;
type SortOrder = "asc" | "desc";
type SellerFilter = "all" | "premium" | "standard" | "member";

interface Auction {
  id: number;
  auctionNo: string;
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
  currentBid: number;
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
    
    const statusRandom = Math.random();
    let status: AuctionStatus;
    if (statusRandom < 0.5) { // %50 aktif
      status = "active";
    } else if (statusRandom < 0.8) { // %30 tamamlanmış
      status = "completed";
    } else if (statusRandom < 0.9) { // %10 durdurulmuş
      status = "paused";
    } else { // %10 iptal edilmiş
      status = "cancelled";
    }

    let startDate: Date;
    let endDate: Date;

    if (status === "completed") {
      startDate = subDays(now, Math.floor(Math.random() * 30) + 15); // 15-45 gün önce başlamış
      endDate = subDays(now, Math.floor(Math.random() * 14)); // 1-14 gün önce bitmiş
    } else if (status === "active") {
      const isShortDuration = Math.random() > 0.7;
      if (isShortDuration) {
        startDate = subDays(now, Math.floor(Math.random() * 3)); // 0-3 gün önce başlamış
        endDate = addDays(now, Math.random()); // 0-24 saat içinde bitecek
      } else {
        startDate = subDays(now, Math.floor(Math.random() * 5)); // 0-5 gün önce başlamış
        endDate = addDays(now, Math.floor(Math.random() * 14) + 1); // 1-15 gün içinde bitecek
      }
    } else {
      startDate = subDays(now, Math.floor(Math.random() * 10)); // 0-10 gün önce başlamış
      endDate = addDays(now, Math.floor(Math.random() * 20)); // 0-20 gün içinde bitecek (normal şartlarda)
    }

    const startingPrice = Math.floor(Math.random() * 900000) + 100000;
    const currentBid = startingPrice + Math.floor(Math.random() * 200000);

    return {
      id: index + 1,
      auctionNo: Math.floor(10000000 + Math.random() * 90000000).toString(),
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
      status,
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
  
  const remainingHours = (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  const isLessThanDay = remainingHours < 24;
  
  return (
    <span className={isLessThanDay ? "text-red-600 font-medium" : "text-gray-500"}>
      {formatDistanceToNow(endDate, {
        locale: tr,
        addSuffix: true,
      })}
    </span>
  );
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

const sortAuctions = (auctions: Auction[], field: SortField, order: SortOrder) => {
  let sortedAuctions = [...auctions];

  // Önce aktif mezatları en üste al ve kalan süreye göre sırala
  sortedAuctions.sort((a, b) => {
    // İlk önce aktif durumları kontrol et
    if (a.status === "active" && b.status !== "active") return -1;
    if (a.status !== "active" && b.status === "active") return 1;

    // Eğer her ikisi de aktifse, kalan süreye göre sırala
    if (a.status === "active" && b.status === "active") {
      return a.endDate.getTime() - b.endDate.getTime();
    }

    // Aktif olmayanlar için normal sıralama
    if (field === "timeLeft") {
      const diff = a.endDate.getTime() - b.endDate.getTime();
      return order === "asc" ? diff : -diff;
    }
    if (field === "bids") {
      const diff = a.totalBids - b.totalBids;
      return order === "asc" ? diff : -diff;
    }

    // Varsayılan olarak durum sıralaması
    const statusOrder = {
      active: 0,
      paused: 1,
      completed: 2,
      cancelled: 3
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  return sortedAuctions;
};

const Auctions = () => {
  const allAuctions = generateDummyAuctions();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<AuctionStatus | "all">("all");
  const [sellerFilter, setSellerFilter] = useState<SellerFilter>("all");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const stats = {
    total: allAuctions.length,
    active: allAuctions.filter(a => a.status === "active").length,
    completed: allAuctions.filter(a => a.status === "completed").length,
    cancelled: allAuctions.filter(a => a.status === "cancelled").length,
    paused: allAuctions.filter(a => a.status === "paused").length,
    premiumStore: allAuctions.filter(a => a.seller.storeType === "premium").length,
    standardStore: allAuctions.filter(a => a.seller.storeType === "standard").length,
    member: allAuctions.filter(a => !a.seller.isStore).length,
    totalBids: allAuctions.reduce((sum, auction) => sum + auction.totalBids, 0),
    totalFavorites: allAuctions.reduce((sum, auction) => sum + auction.favorites, 0),
  };

  const filteredAuctions = allAuctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.auctionNo.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || auction.status === statusFilter;
    const matchesSeller = sellerFilter === "all" || 
                         (sellerFilter === "premium" && auction.seller.storeType === "premium") ||
                         (sellerFilter === "standard" && auction.seller.storeType === "standard") ||
                         (sellerFilter === "member" && !auction.seller.isStore);
    return matchesSearch && matchesStatus && matchesSeller;
  });

  const sortedAuctions = sortAuctions(filteredAuctions, sortField, sortOrder);

  const totalPages = Math.ceil(sortedAuctions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAuctions = sortedAuctions.slice(startIndex, startIndex + itemsPerPage);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(order => order === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">MEZATLAR</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Toplam Mezat</div>
          <div className="text-2xl font-semibold">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Aktif Mezat</div>
          <div className="text-2xl font-semibold text-green-600">{stats.active}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Premium Mağaza</div>
          <div className="text-2xl font-semibold text-orange-600">{stats.premiumStore}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Standart Mağaza</div>
          <div className="text-2xl font-semibold text-purple-600">{stats.standardStore}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Üye Mezatları</div>
          <div className="text-2xl font-semibold text-blue-600">{stats.member}</div>
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
              placeholder="Mezat no, ad veya satıcı ara..."
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
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                Tamamlanan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                İptal Edildi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("paused")}>
                Durduruldu
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {sellerFilter === "all" ? "Tüm Satıcılar" : 
                 sellerFilter === "premium" ? "Premium Mağazalar" :
                 sellerFilter === "standard" ? "Standart Mağazalar" : "Üyeler"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSellerFilter("all")}>
                Tüm Satıcılar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSellerFilter("premium")}>
                Premium Mağazalar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSellerFilter("standard")}>
                Standart Mağazalar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSellerFilter("member")}>
                Üyeler
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("timeLeft")}
            className={sortField === "timeLeft" ? "bg-muted" : ""}
          >
            Kalan Süre {sortField === "timeLeft" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("bids")}
            className={sortField === "bids" ? "bg-muted" : ""}
          >
            Teklif Sayısı {sortField === "bids" && (sortOrder === "asc" ? "↑" : "↓")}
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          Toplam {filteredAuctions.length} mezat bulundu
        </div>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mezat No</TableHead>
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
                <TableCell className="font-mono">{auction.auctionNo}</TableCell>
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
                      <span className="text-xs">
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
                    <div className="flex flex-col">
                      <span className="text-sm">Güncel Teklif:</span>
                      <span className="font-medium text-green-600">
                        {auction.currentBid.toLocaleString("tr-TR")} ₺
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{auction.totalBids}</TableCell>
                <TableCell>{getStatusBadge(auction.status)}</TableCell>
                <TableCell>{auction.favorites}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4 mr-2" />
                        İşlemler
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        İncele
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Onayla
                      </DropdownMenuItem>
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
                      {["active", "paused"].includes(auction.status) && (
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="w-4 h-4 mr-2" />
                          İptal Et
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                        onClick={() => setCurrentPage(page)}
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
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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
