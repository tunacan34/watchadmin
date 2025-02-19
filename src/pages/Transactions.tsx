
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Store, Trophy, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  type: "booster" | "store_subscription";
  boosterType?: "listing" | "showcase" | "search";
  storeType?: "standard" | "premium";
  name: string;
  price: number;
  status: "completed" | "pending" | "failed";
  purchaseDate: string;
  startDate: string;
  endDate: string;
}

const Transactions = () => {
  // Örnek işlem verileri
  const transactions: Transaction[] = [
    {
      id: "1",
      customerId: "USR001",
      customerName: "Ahmet Yılmaz",
      type: "booster",
      boosterType: "listing",
      name: "10 İlan Paketi",
      price: 99.99,
      status: "completed",
      purchaseDate: "2024-03-15T10:30:00",
      startDate: "2024-03-15T10:30:00",
      endDate: "2024-04-15T10:30:00"
    },
    {
      id: "2",
      customerId: "USR002",
      customerName: "Mehmet Demir",
      type: "store_subscription",
      storeType: "standard",
      name: "Standart Mağaza Aboneliği",
      price: 299.99,
      status: "completed",
      purchaseDate: "2024-03-14T15:45:00",
      startDate: "2024-03-15T00:00:00",
      endDate: "2024-06-15T00:00:00"
    },
    {
      id: "3",
      customerId: "USR003",
      customerName: "Ayşe Kaya",
      type: "booster",
      boosterType: "showcase",
      name: "Premium Vitrin",
      price: 149.99,
      status: "pending",
      purchaseDate: "2024-03-16T09:15:00",
      startDate: "2024-03-16T09:15:00",
      endDate: "2024-04-16T09:15:00"
    },
    {
      id: "4",
      customerId: "USR004",
      customerName: "Can Özkan",
      type: "store_subscription",
      storeType: "premium",
      name: "Premium Mağaza Aboneliği",
      price: 599.99,
      status: "completed",
      purchaseDate: "2024-03-13T11:20:00",
      startDate: "2024-03-14T00:00:00",
      endDate: "2024-09-14T00:00:00"
    },
    {
      id: "5",
      customerId: "USR005",
      customerName: "Zeynep Aydın",
      type: "booster",
      boosterType: "search",
      name: "Arama Dopingi",
      price: 79.99,
      status: "failed",
      purchaseDate: "2024-03-16T14:30:00",
      startDate: "2024-03-16T14:30:00",
      endDate: "2024-04-16T14:30:00"
    }
  ];

  const getTypeIcon = (transaction: Transaction) => {
    if (transaction.type === "store_subscription") {
      return <Store className="w-5 h-5" />;
    }
    
    switch (transaction.boosterType) {
      case "showcase":
        return <Trophy className="w-5 h-5" />;
      case "search":
        return <Target className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Tamamlandı</Badge>;
      case "pending":
        return <Badge variant="secondary">Bekliyor</Badge>;
      case "failed":
        return <Badge variant="destructive">Başarısız</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
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
      <h1 className="text-3xl font-semibold text-admin-foreground mb-6">İŞLEMLER</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tür</TableHead>
              <TableHead>Müşteri</TableHead>
              <TableHead>Ürün</TableHead>
              <TableHead className="text-right">Tutar</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Satın Alma</TableHead>
              <TableHead>Başlangıç</TableHead>
              <TableHead>Bitiş</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(transaction)}
                    <span>
                      {transaction.type === "store_subscription" 
                        ? "Mağaza" 
                        : "Doping"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{transaction.customerName}</div>
                    <div className="text-sm text-muted-foreground">{transaction.customerId}</div>
                  </div>
                </TableCell>
                <TableCell>{transaction.name}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatPrice(transaction.price)}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell>{formatDate(transaction.purchaseDate)}</TableCell>
                <TableCell>{formatDate(transaction.startDate)}</TableCell>
                <TableCell>{formatDate(transaction.endDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
