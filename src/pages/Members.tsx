
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
import { MoreHorizontal, User, Eye, Bell, Pause, Search, Edit, RotateCcw, Send } from "lucide-react";
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
    joinDate: new Date("2024-01-15"),
  },
  {
    id: 2,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    fullName: "Ayşe Demir",
    email: "ayse.demir@email.com",
    phone: "+90 533 234 5678",
    city: "Ankara",
    joinDate: new Date("2024-02-01"),
  },
  {
    id: 3,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    fullName: "Mehmet Kaya",
    email: "mehmet.kaya@email.com",
    phone: "+90 535 345 6789",
    city: "İzmir",
    joinDate: new Date("2024-02-15"),
  },
  {
    id: 4,
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    fullName: "Zeynep Çelik",
    email: "zeynep.celik@email.com",
    phone: "+90 536 456 7890",
    city: "Bursa",
    joinDate: new Date("2024-03-01"),
  },
  {
    id: 5,
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    fullName: "Mustafa Şahin",
    email: "mustafa.sahin@email.com",
    phone: "+90 537 567 8901",
    city: "Antalya",
    joinDate: new Date("2024-03-15"),
  },
  {
    id: 6,
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    fullName: "Fatma Yıldız",
    email: "fatma.yildiz@email.com",
    phone: "+90 538 678 9012",
    city: "İstanbul",
    joinDate: new Date("2024-03-20"),
  },
  {
    id: 7,
    avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    fullName: "Ali Öztürk",
    email: "ali.ozturk@email.com",
    phone: "+90 539 789 0123",
    city: "Ankara",
    joinDate: new Date("2024-03-25"),
  },
  {
    id: 8,
    avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    fullName: "Selin Aktaş",
    email: "selin.aktas@email.com",
    phone: "+90 532 890 1234",
    city: "İzmir",
    joinDate: new Date("2024-04-01"),
  },
  {
    id: 9,
    avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    fullName: "Can Aydın",
    email: "can.aydin@email.com",
    phone: "+90 533 901 2345",
    city: "Bursa",
    joinDate: new Date("2024-04-05"),
  },
  {
    id: 10,
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    fullName: "Elif Koç",
    email: "elif.koc@email.com",
    phone: "+90 535 012 3456",
    city: "Antalya",
    joinDate: new Date("2024-04-10"),
  },
];

const Members = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter((member) =>
    Object.values(member).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-8">ÜYELER</h1>
      
      <div className="mb-6">
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
              <TableHead>Üyelik Tarihi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
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
                <TableCell>{format(member.joinDate, 'dd.MM.yyyy')}</TableCell>
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
    </div>
  );
};

export default Members;
