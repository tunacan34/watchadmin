import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Store, Edit, Eye, Package, Search, Crown, } from "lucide-react";
import { format, addMonths } from "date-fns";
import { useState } from "react";

// Örnek veri
const stores = [
  ...Array.from({ length: 5 }, (_, i) => {
    const subscriptionDate = new Date(2024, 3, Math.floor(Math.random() * 30) + 1);
    const subscriptionMonths = Math.floor(Math.random() * 11) + 1;
    const type = Math.random() > 0.5 ? "premium" : "standard";
    
    return {
      id: i + 1,
      logo: `https://picsum.photos/seed/${i + 1}/200`,
      name: `${["Altın", "Gümüş", "Kristal", "Elmas", "Zümrüt"][Math.floor(Math.random() * 5)]} Saat`,
      ownerName: ["Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Fatma Şahin", "Ali Öztürk"][Math.floor(Math.random() * 5)],
      subscriptionDate,
      subscriptionEndDate: addMonths(subscriptionDate, subscriptionMonths),
      type,
      status: "pending" as const,
      activeListings: 0,
      activeAuctions: 0,
      followers: 0,
    };
  }),
  ...Array.from({ length: 25 }, (_, i) => {
    const subscriptionDate = new Date(2024, 3, Math.floor(Math.random() * 30) + 1);
    const subscriptionMonths = Math.floor(Math.random() * 11) + 1;
    const type = Math.random() > 0.5 ? "premium" : "standard";
    const statuses = ["approved", "suspended"] as const;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      id: i + 6,
      logo: `https://picsum.photos/seed/${i + 6}/200`,
      name: `${["Altın", "Gümüş", "Kristal", "Elmas", "Zümrüt"][Math.floor(Math.random() * 5)]} Saat`,
      ownerName: ["Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Fatma Şahin", "Ali Öztürk"][Math.floor(Math.random() * 5)],
      subscriptionDate,
      subscriptionEndDate: addMonths(subscriptionDate, subscriptionMonths),
      type,
      status,
      activeListings: Math.floor(Math.random() * 100),
      activeAuctions: Math.floor(Math.random() * 20),
      followers: Math.floor(Math.random() * 1000),
    };
  })
].sort((a, b) => {
  if (a.status === "pending" && b.status !== "pending") return -1;
  if (a.status !== "pending" && b.status === "pending") return 1;
  return b.subscriptionDate.getTime() - a.subscriptionDate.getTime();
});

type Store = typeof stores[0];
type SortField = "listings" | "auctions" | "followers";
type SortOrder = "asc" | "desc";

const getStatusText = (status: Store["status"]) => {
  switch (status) {
    case "approved":
      return { text: "Onaylandı", color: "text-green-600 bg-green-50" };
    case "pending":
      return { text: "Onay Bekliyor", color: "text-yellow-600 bg-yellow-50" };
    case "suspended":
      return { text: "Askıya Alındı", color: "text-red-600 bg-red-50" };
  }
};

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [storeType, setStoreType] = useState<"all" | "standard" | "premium">("all");
  const [storeStatus, setStoreStatus] = useState<"all" | Store["status"]>("all");
  const [showExpiringOnly, setShowExpiringOnly] = useState(false);
  const [sortField, setSortField] = useState<SortField>("listings");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = storeType === "all" || store.type === storeType;
    const matchesStatus = storeStatus === "all" || store.status === storeStatus;
    const matchesExpiring = !showExpiringOnly || 
      (store.subscriptionEndDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) <= 30;

    return matchesSearch && matchesType && matchesStatus && matchesExpiring;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortField === "listings") comparison = a.activeListings - b.activeListings;
    if (sortField === "auctions") comparison = a.activeAuctions - b.activeAuctions;
    if (sortField === "followers") comparison = a.followers - b.followers;
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const totalPages = Math.ceil(filteredStores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStores = filteredStores.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">MAĞAZALAR</h1>
      
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Mağaza ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Button 
              variant={storeType === "all" ? "default" : "outline"}
              onClick={() => setStoreType("all")}
              size="sm"
            >
              Tüm Mağazalar
            </Button>
            <Button 
              variant={storeType === "premium" ? "default" : "outline"}
              onClick={() => setStoreType("premium")}
              size="sm"
              className="flex items-center gap-2"
            >
              <Crown className="w-4 h-4" />
              Premium
            </Button>
            <Button 
              variant={storeType === "standard" ? "default" : "outline"}
              onClick={() => setStoreType("standard")}
              size="sm"
              className="flex items-center gap-2"
            >
              <Store className="w-4 h-4" />
              Standart
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button 
              variant={storeStatus === "all" ? "default" : "outline"}
              onClick={() => setStoreStatus("all")}
              size="sm"
            >
              Tüm Durumlar
            </Button>
            <Button 
              variant={storeStatus === "approved" ? "default" : "outline"}
              onClick={() => setStoreStatus("approved")}
              size="sm"
            >
              Onaylanmış
            </Button>
            <Button 
              variant={storeStatus === "pending" ? "default" : "outline"}
              onClick={() => setStoreStatus("pending")}
              size="sm"
            >
              Onay Bekleyen
            </Button>
            <Button 
              variant={storeStatus === "suspended" ? "default" : "outline"}
              onClick={() => setStoreStatus("suspended")}
              size="sm"
            >
              Askıya Alınmış
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Button 
            variant={showExpiringOnly ? "default" : "outline"}
            onClick={() => setShowExpiringOnly(!showExpiringOnly)}
            size="sm"
          >
            Aboneliği Bitecek Mağazalar (30 gün)
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sırala:</span>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  if (sortField === "listings") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortField("listings");
                    setSortOrder("desc");
                  }
                }}
                className="flex items-center gap-2"
              >
                İlan Sayısı {sortField === "listings" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  if (sortField === "auctions") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortField("auctions");
                    setSortOrder("desc");
                  }
                }}
                className="flex items-center gap-2"
              >
                Mezat Sayısı {sortField === "auctions" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => {
                  if (sortField === "followers") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortField("followers");
                    setSortOrder("desc");
                  }
                }}
                className="flex items-center gap-2"
              >
                Takipçi Sayısı {sortField === "followers" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Mağaza Adı</TableHead>
              <TableHead>Başlangıç Tarihi</TableHead>
              <TableHead>Mağaza Türü</TableHead>
              <TableHead>İlan Sayısı</TableHead>
              <TableHead>Mezat Sayısı</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Takipçi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={store.logo} />
                    <AvatarFallback>
                      <Store className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{store.name}</div>
                    <div className="text-sm text-gray-500">{store.ownerName}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">{format(store.subscriptionDate, 'dd.MM.yyyy')}</div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {store.type === "premium" ? (
                        <>
                          <Crown className="w-4 h-4 text-yellow-500" />
                          <span className="text-yellow-500 font-medium">Premium</span>
                        </>
                      ) : (
                        <>
                          <Store className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">Standart</span>
                        </>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Bitiş: {format(store.subscriptionEndDate, 'dd.MM.yyyy')}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{store.activeListings}</TableCell>
                <TableCell>{store.activeAuctions}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusText(store.status).color}`}>
                    {getStatusText(store.status).text}
                  </span>
                </TableCell>
                <TableCell>{store.followers.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menüyü aç</span>
                        <Store className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        Görüntüle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Düzenle
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Paket Tanımla
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Toplam {filteredStores.length} mağazadan {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredStores.length)} arası gösteriliyor
        </div>
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                >
                  Önceki
                </Button>
              </PaginationItem>
            )}
            
            {currentPage > 2 && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </Button>
              </PaginationItem>
            )}
            
            {currentPage > 1 && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {currentPage - 1}
                </Button>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <Button
                variant="default"
                size="sm"
              >
                {currentPage}
              </Button>
            </PaginationItem>
            
            {currentPage < totalPages && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {currentPage + 1}
                </Button>
              </PaginationItem>
            )}
            
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              </PaginationItem>
            )}

            {currentPage < totalPages && (
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                >
                  Sonraki
                </Button>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Stores;
