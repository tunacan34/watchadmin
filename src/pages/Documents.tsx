
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, FileDown, Mail, Clock, Package, Gavel, Store, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Document {
  id: string;
  watchName: string;
  type: "listing" | "auction";
  seller: {
    id: string;
    name: string;
    isStore: boolean;
  };
  buyer: {
    id: string;
    name: string;
  };
  createdAt: string;
  documentUrl: string;
}

const Documents = () => {
  const documents: Document[] = [
    {
      id: "DOC001",
      watchName: "Rolex Daytona 2024",
      type: "listing",
      seller: {
        id: "S001",
        name: "Luxury Watch Store",
        isStore: true,
      },
      buyer: {
        id: "B001",
        name: "Ahmet Yılmaz"
      },
      createdAt: "2024-03-15T10:30:00",
      documentUrl: "/documents/doc001.pdf"
    },
    {
      id: "DOC002",
      watchName: "Patek Philippe Nautilus",
      type: "auction",
      seller: {
        id: "S002",
        name: "VIP Timepieces",
        isStore: true,
      },
      buyer: {
        id: "B002",
        name: "Mehmet Demir"
      },
      createdAt: "2024-03-16T15:45:00",
      documentUrl: "/documents/doc002.pdf"
    },
    {
      id: "DOC003",
      watchName: "Cartier Santos",
      type: "listing",
      seller: {
        id: "S003",
        name: "Can Özkan",
        isStore: false,
      },
      buyer: {
        id: "B003",
        name: "Zeynep Aydın"
      },
      createdAt: "2024-03-17T09:15:00",
      documentUrl: "/documents/doc003.pdf"
    },
  ];

  const handleDownload = (documentUrl: string) => {
    console.log("Belge indiriliyor:", documentUrl);
  };

  const handleDelete = (documentId: string) => {
    console.log("Belge siliniyor:", documentId);
  };

  const handleEdit = (documentId: string) => {
    console.log("Belge düzenleniyor:", documentId);
  };

  const handleSendInvite = (userId: string) => {
    console.log("Üyelik daveti gönderiliyor:", userId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold text-admin-foreground mb-6">BELGELER</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Saat İlanı</TableHead>
              <TableHead>İlan Türü</TableHead>
              <TableHead>Satıcı</TableHead>
              <TableHead>Alıcı</TableHead>
              <TableHead>Oluşturma Tarihi</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {doc.watchName}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex w-fit items-center gap-1">
                    {doc.type === "listing" ? (
                      <Package className="w-3 h-3" />
                    ) : (
                      <Gavel className="w-3 h-3" />
                    )}
                    {doc.type === "listing" ? "İlan" : "Mezat"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {doc.seller.isStore ? (
                      <Store className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-muted-foreground" />
                    )}
                    {doc.seller.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    {doc.buyer.name}
                  </div>
                </TableCell>
                <TableCell>{formatDate(doc.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownload(doc.documentUrl)}
                    >
                      <FileDown className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(doc.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleSendInvite(doc.buyer.id)}
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
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

export default Documents;
