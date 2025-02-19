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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Edit, Eye, CheckCircle, Search, Filter, MoreHorizontal, Archive, Ban, Power, CheckSquare } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

type ListingStatus = "active" | "pending" | "rejected" | "inactive" | "sold";

interface Listing {
  id: number;
  coverImage: string;
  title: string;
  seller: string;
  isStore: boolean;
  isPremiumStore: boolean;
  price: number;
  status: ListingStatus;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
  revisionCount: number;
}

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
    { name: "Lüks Saat Mağazası", isStore: true, isPremiumStore: true },
    { name: "Premium Saat", isStore: true, isPremiumStore: true },
    { name: "VIP Saat Boutique", isStore: true, isPremiumStore: true },
    { name: "Ahmet Yılmaz", isStore: false, isPremiumStore: false },
    { name: "Mehmet Demir", isStore: false, isPremiumStore: false },
    { name: "Ayşe Kaya", isStore: false, isPremiumStore: false },
    { name: "Saat Dünyası", isStore: true, isPremiumStore: false },
    { name: "Koleksiyoner Saatler", isStore: true, isPremiumStore: false }
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
      isPremiumStore: seller.isPremiumStore,
      price: Math.floor(200000 + Math.random() * 1800000),
      status,
      views: status === "pending" ? 0 : Math.floor(Math.random() * 1000),
      favorites: status === "pending" ? 0 : Math.floor(Math.random() * 100),
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
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>("price");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const itemsPerPage = 10;

  const stats = {
    pending: listings.filter(l => l.status === "pending").length,
    active: listings.filter(l => l.status === "active").length,
    sold: listings.filter(l => l.status === "sold").length,
    inactive: listings.filter(l => l.status === "inactive").length,
    rejected: listings.filter(l => l.status === "rejected").length,
    store: listings.filter(l => l.isStore).length,
    member: listings.filter(l => !l.isStore).length,
  };

  const sortedAndFilteredListings = listings
    .filter(listing => {
      const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           listing.seller.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const multiplier = sortDirection === "asc" ? 1 : -1;
      return multiplier * (a[sortField] - b[sortField]);
    });

  const pageCount = Math.ceil(sortedAndFilteredListings.length / itemsPerPage);
  const paginatedListings = sortedAndFilteredListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">İLANLAR</h1>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
            <div className="text-yellow-800 font-medium">Onay Bekleyen</div>
            <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="text-green-800 font-medium">Yayında</div>
            <div className="text-2xl font-bold text-green-900">{stats.active}</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="text-blue-800 font-medium">Satıldı</div>
            <div className="text-2xl font-bold text-blue-900">{stats.sold}</div>
          </div>
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <div className="text-gray-800 font-medium">Pasif</div>
            <div className="text-2xl font-bold text-gray-900">{stats.inactive}</div>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <div className="text-red-800 font-medium">Red</div>
            <div className="text-2xl font-bold text-red-900">{stats.rejected}</div>
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
            <div className="text-purple-800 font-medium">Mağaza İlanı</div>
            <div className="text-2xl font-bold text-purple-900">{stats.store}</div>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <div className="text-indigo-800 font-medium">Üye İlanı</div>
            <div className="text-2xl font-bold text-indigo-900">{stats.member}</div>
          </div>
        </div>

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

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("price")}
            className={sortField === "price" ? "bg-muted" : ""}
          >
            Fiyat {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("views")}
            className={sortField === "views" ? "bg-muted" : ""}
          >
            Görüntülenme {sortField === "views" && (sortDirection === "asc" ? "↑" : "↓")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleSort("favorites")}
            className={sortField === "favorites" ? "bg-muted" : ""}
          >
            Favori {sortField === "favorites" && (sortDirection === "asc" ? "↑" : "↓")}
          </Button>
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
                <TableHead>Favori</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="text-right">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedListings.map((listing) => (
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
                      {listing.isStore && (
                        <span className={`text-xs px-2 py-0.5 rounded-full w-fit ${
                          listing.isPremiumStore 
                            ? "bg-orange-100 text-orange-800 border border-orange-200" 
                            : "bg-purple-100 text-purple-800 border border-purple-200"
                        }`}>
                          {listing.isPremiumStore ? "Premium Mağaza" : "Standart Mağaza"}
                        </span>
                      )}
                      {!listing.isStore && (
                        <span className="text-xs text-gray-500">Üye</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{listing.price.toLocaleString('tr-TR')} ₺</TableCell>
                  <TableCell>{getStatusBadge(listing.status)}</TableCell>
                  <TableCell>{listing.status === "pending" ? 0 : listing.views}</TableCell>
                  <TableCell>{listing.status === "pending" ? 0 : listing.favorites}</TableCell>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            İncele
                          </DropdownMenuItem>
                          {listing.status === "active" && (
                            <DropdownMenuItem>
                              <Archive className="w-4 h-4 mr-2" />
                              Pasife Al
                            </DropdownMenuItem>
                          )}
                          {listing.status === "pending" && (
                            <>
                              <DropdownMenuItem>
                                <CheckSquare className="w-4 h-4 mr-2" />
                                Onayla
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="w-4 h-4 mr-2" />
                                Reddet
                              </DropdownMenuItem>
                            </>
                          )}
                          {listing.status === "inactive" && (
                            <DropdownMenuItem>
                              <Power className="w-4 h-4 mr-2" />
                              Aktife Al
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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

        {pageCount > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => changePage(Math.max(1, currentPage - 1))} />
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === pageCount ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => changePage(page)}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return <PaginationEllipsis key={page} />;
                }
                return null;
              })}
              <PaginationItem>
                <PaginationNext onClick={() => changePage(Math.min(pageCount, currentPage + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Listings;
