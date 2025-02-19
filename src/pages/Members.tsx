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
import { MoreHorizontal, User, Eye, Bell, Pause, Search, Edit, RotateCcw, Send, UserPlus, Store, Crown, BadgeCheck } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

const members = [
  {
    id: 1,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    fullName: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@email.com",
    phone: "+90 532 123 4567",
    city: "İstanbul",
    store: "Yılmaz Saat",
    storeType: "premium",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-01-15"),
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    fullName: "Ayşe Demir",
    email: "ayse.demir@email.com",
    phone: "+90 533 234 5678",
    city: "Ankara",
    store: null,
    storeType: null,
    verified: ["TC"],
    joinDate: new Date("2024-02-01"),
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    fullName: "Mehmet Kaya",
    email: "mehmet.kaya@email.com",
    phone: "+90 535 345 6789",
    city: "İzmir",
    store: "Kaya Saat",
    storeType: "standard",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-02-15"),
  },
  {
    id: 4,
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    fullName: "Zeynep Çelik",
    email: "zeynep.celik@email.com",
    phone: "+90 536 456 7890",
    city: "Bursa",
    store: null,
    storeType: null,
    verified: [],
    joinDate: new Date("2024-03-01"),
  },
  {
    id: 5,
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    fullName: "Mustafa Şahin",
    email: "mustafa.sahin@email.com",
    phone: "+90 537 567 8901",
    city: "Antalya",
    store: "Şahin Saat",
    storeType: "premium",
    verified: ["SMS"],
    joinDate: new Date("2024-03-15"),
  },
  {
    id: 6,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    fullName: "Fatma Yıldız",
    email: "fatma.yildiz@email.com",
    phone: "+90 538 678 9012",
    city: "İstanbul",
    store: null,
    storeType: null,
    verified: [],
    joinDate: new Date("2024-03-20"),
  },
  {
    id: 7,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    fullName: "Ali Öztürk",
    email: "ali.ozturk@email.com",
    phone: "+90 539 789 0123",
    city: "Ankara",
    store: "Öztürk Saat",
    storeType: "standard",
    verified: ["TC"],
    joinDate: new Date("2024-03-25"),
  },
  {
    id: 8,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    fullName: "Selin Aktaş",
    email: "selin.aktas@email.com",
    phone: "+90 532 890 1234",
    city: "İzmir",
    store: null,
    storeType: null,
    verified: ["SMS"],
    joinDate: new Date("2024-04-01"),
  },
  {
    id: 9,
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    fullName: "Can Aydın",
    email: "can.aydin@email.com",
    phone: "+90 533 901 2345",
    city: "Bursa",
    store: "Aydın Saat",
    storeType: "premium",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-04-05"),
  },
  {
    id: 10,
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    fullName: "Elif Koç",
    email: "elif.koc@email.com",
    phone: "+90 535 012 3456",
    city: "Antalya",
    store: null,
    storeType: null,
    verified: [],
    joinDate: new Date("2024-04-10"),
  },
  {
    id: 11,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    fullName: "Kemal Yıldırım",
    email: "kemal.yildirim@email.com",
    phone: "+90 532 111 2233",
    city: "İzmir",
    store: "Yıldırım Saat",
    storeType: "premium",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-04-15"),
  },
  {
    id: 12,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    fullName: "Esra Kara",
    email: "esra.kara@email.com",
    phone: "+90 533 222 3344",
    city: "Ankara",
    store: null,
    storeType: null,
    verified: [],
    joinDate: new Date("2024-04-16"),
  },
  {
    id: 13,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    fullName: "Burak Özdemir",
    email: "burak.ozdemir@email.com",
    phone: "+90 535 333 4455",
    city: "İstanbul",
    store: "Özdemir Saat",
    storeType: "standard",
    verified: ["SMS"],
    joinDate: new Date("2024-04-17"),
  },
  {
    id: 14,
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    fullName: "Deniz Avcı",
    email: "deniz.avci@email.com",
    phone: "+90 536 444 5566",
    city: "Antalya",
    store: null,
    storeType: null,
    verified: ["TC"],
    joinDate: new Date("2024-04-18"),
  },
  {
    id: 15,
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    fullName: "Ceren Yalçın",
    email: "ceren.yalcin@email.com",
    phone: "+90 537 555 6677",
    city: "Bursa",
    store: "Yalçın Saat",
    storeType: "premium",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-04-19"),
  },
  {
    id: 16,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    fullName: "Mert Aslan",
    email: "mert.aslan@email.com",
    phone: "+90 538 666 7788",
    city: "İzmir",
    store: null,
    storeType: null,
    verified: [],
    joinDate: new Date("2024-04-20"),
  },
  {
    id: 17,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    fullName: "Gizem Çetin",
    email: "gizem.cetin@email.com",
    phone: "+90 539 777 8899",
    city: "Ankara",
    store: "Çetin Saat",
    storeType: "standard",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-04-21"),
  },
  {
    id: 18,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    fullName: "Okan Kurt",
    email: "okan.kurt@email.com",
    phone: "+90 532 888 9900",
    city: "İstanbul",
    store: null,
    storeType: null,
    verified: ["SMS"],
    joinDate: new Date("2024-04-22"),
  },
  {
    id: 19,
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    fullName: "İrem Güneş",
    email: "irem.gunes@email.com",
    phone: "+90 533 999 0011",
    city: "Antalya",
    store: "Güneş Saat",
    storeType: "premium",
    verified: ["SMS", "TC"],
    joinDate: new Date("2024-04-23"),
  },
  {
    id: 20,
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    fullName: "Berkay Yaman",
    email: "berkay.yaman@email.com",
    phone: "+90 535 000 1122",
    city: "Bursa",
    store: null,
    storeType: null,
    verified: [],
    joinDate: new Date("2024-04-24"),
  },
];

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "store" | "member">("all");
  const [verificationFilter, setVerificationFilter] = useState<"all" | "sms-tc" | "sms" | "tc" | "unverified">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredMembers = members.filter((member) => {
    const matchesSearch = Object.values(member).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    const matchesStoreFilter = filter === "all" 
      ? true 
      : filter === "store" 
        ? member.store !== null 
        : member.store === null;

    let matchesVerification = true;
    switch (verificationFilter) {
      case "sms-tc":
        matchesVerification = member.verified.includes("SMS") && member.verified.includes("TC");
        break;
      case "sms":
        matchesVerification = member.verified.includes("SMS");
        break;
      case "tc":
        matchesVerification = member.verified.includes("TC");
        break;
      case "unverified":
        matchesVerification = member.verified.length === 0;
        break;
    }

    return matchesSearch && matchesStoreFilter && matchesVerification;
  });

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">ÜYELER</h1>
      
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Üye ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-200"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {filter === "all" ? "Tümü" : filter === "store" ? "Mağaza" : "Üye"}
                  <Store className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem onClick={() => setFilter("all")} className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Tümü
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("store")} className="flex items-center gap-2">
                  <Store className="w-4 h-4" />
                  Mağaza
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("member")} className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Üye
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Doğrulama Durumu
                  <BadgeCheck className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setVerificationFilter("all")}>
                  Tüm Doğrulamalar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVerificationFilter("sms-tc")}>
                  SMS + TC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVerificationFilter("sms")}>
                  SMS
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVerificationFilter("tc")}>
                  TC
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setVerificationFilter("unverified")}>
                  Doğrulanmamış
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Button className="shrink-0">
          <UserPlus className="w-4 h-4 mr-2" />
          Yeni Üye Ekle
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Adı Soyadı</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Şehir</TableHead>
              <TableHead>Mağaza</TableHead>
              <TableHead>Üyelik Tarihi</TableHead>
              <TableHead>Doğrulama</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{member.fullName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.city}</TableCell>
                <TableCell>
                  {member.store ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-gray-500" />
                        {member.store}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        {member.storeType === "premium" ? (
                          <>
                            <Crown className="w-3 h-3 text-yellow-500" />
                            <span className="text-yellow-500 font-medium">Premium</span>
                          </>
                        ) : (
                          <>
                            <Store className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-500">Standart</span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{format(member.joinDate, 'dd.MM.yyyy')}</TableCell>
                <TableCell>
                  {member.verified.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <BadgeCheck className="w-4 h-4 text-green-600" />
                      <div className="flex gap-1">
                        {member.verified.map((type, index) => (
                          <span 
                            key={type}
                            className="text-xs px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 font-medium"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Doğrulanmamış</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
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
                        <Bell className="w-4 h-4" />
                        Bildirim gönder
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Sıfırlama bağlantısı gönder
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2">
                        <Pause className="w-4 h-4" />
                        Askıya al
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
          Toplam {filteredMembers.length} üyeden {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredMembers.length)} arası gösteriliyor
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}
            
            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Members;
