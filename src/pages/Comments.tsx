
import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, MessageSquare, Trash2, AlertTriangle, User } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface Comment {
  id: string;
  userId: string;
  userName: string;
  itemId: string;
  itemType: "listing" | "auction";
  itemTitle: string;
  content: string;
  createdAt: Date;
  isReported: boolean;
}

// Örnek veri
const dummyComments: Comment[] = [
  {
    id: "1",
    userId: "U1",
    userName: "Ahmet Yılmaz",
    itemId: "L1",
    itemType: "listing",
    itemTitle: "Rolex Daytona 2024",
    content: "Bu ürünün sertifikası var mı?",
    createdAt: new Date("2024-03-15T10:30:00"),
    isReported: false
  },
  {
    id: "2",
    userId: "U2",
    userName: "Mehmet Demir",
    itemId: "A1",
    itemType: "auction",
    itemTitle: "Patek Philippe Nautilus Mezat",
    content: "Başlangıç fiyatı çok yüksek belirlenmiş.",
    createdAt: new Date("2024-03-15T11:45:00"),
    isReported: true
  }
];

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "listing" | "auction">("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { toast } = useToast();

  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.itemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || comment.itemType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDeleteComment = () => {
    if (selectedComment) {
      const updatedComments = comments.filter(c => c.id !== selectedComment.id);
      setComments(updatedComments);
      setDeleteDialogOpen(false);
      setSelectedComment(null);
      
      toast({
        title: "Yorum silindi",
        description: "Seçilen yorum başarıyla silindi.",
      });
    }
  };

  const formatDateTime = (date: Date) => {
    return format(date, "dd.MM.yyyy HH:mm");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-admin-foreground">Yorumlar</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Yorum, kullanıcı veya ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {typeFilter === "all" ? "Tüm Yorumlar" : 
                 typeFilter === "listing" ? "İlan Yorumları" : 
                 "Mezat Yorumları"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                Tüm Yorumlar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("listing")}>
                İlan Yorumları
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("auction")}>
                Mezat Yorumları
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>İlan/Mezat</TableHead>
              <TableHead>Yorum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {comment.userName}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{comment.itemTitle}</span>
                    <span className="text-xs text-muted-foreground">
                      ({comment.itemType === "listing" ? "İlan" : "Mezat"})
                    </span>
                  </div>
                </TableCell>
                <TableCell>{comment.content}</TableCell>
                <TableCell>{formatDateTime(comment.createdAt)}</TableCell>
                <TableCell>
                  {comment.isReported && (
                    <div className="flex items-center gap-1 text-yellow-500">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs">Bildirim var</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedComment(comment);
                      setDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yorumu Sil</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Bu yorumu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              İptal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteComment}
            >
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Comments;
