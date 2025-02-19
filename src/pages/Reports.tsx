
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
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, AlertTriangle, MoreVertical } from "lucide-react";
import { format } from "date-fns";

interface Report {
  id: string;
  itemId: string;
  itemType: "listing" | "auction";
  itemTitle: string;
  reportCount: number;
  firstReportDate: Date;
  lastReportDate: Date;
  reports: {
    id: string;
    userId: string;
    userName: string;
    reportDate: Date;
    reason: string;
  }[];
}

// Örnek veri
const dummyReports: Report[] = [
  {
    id: "R1",
    itemId: "L1",
    itemType: "listing",
    itemTitle: "Rolex Daytona 2024",
    reportCount: 5,
    firstReportDate: new Date("2024-03-01"),
    lastReportDate: new Date("2024-03-15"),
    reports: [
      {
        id: "REP1",
        userId: "U1",
        userName: "Ahmet Yılmaz",
        reportDate: new Date("2024-03-01"),
        reason: "Sahte ürün şüphesi"
      },
      {
        id: "REP2",
        userId: "U2",
        userName: "Mehmet Demir",
        reportDate: new Date("2024-03-15"),
        reason: "Yanıltıcı bilgiler"
      }
    ]
  },
  {
    id: "R2",
    itemId: "A1",
    itemType: "auction",
    itemTitle: "Patek Philippe Nautilus Mezat",
    reportCount: 3,
    firstReportDate: new Date("2024-03-10"),
    lastReportDate: new Date("2024-03-12"),
    reports: [
      {
        id: "REP3",
        userId: "U3",
        userName: "Ali Kaya",
        reportDate: new Date("2024-03-10"),
        reason: "Usulsüz mezat şüphesi"
      }
    ]
  }
];

const Reports = () => {
  const [reports] = useState<Report[]>(dummyReports);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "listing" | "auction">("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.itemTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.itemType === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatDateTime = (date: Date) => {
    return format(date, "dd.MM.yyyy HH:mm");
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-admin-foreground">İlan ve Mezat Bildirimleri</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="İlan veya mezat ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                {typeFilter === "all" ? "Tüm Bildirimler" : 
                 typeFilter === "listing" ? "İlan Bildirimleri" : 
                 "Mezat Bildirimleri"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                Tüm Bildirimler
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("listing")}>
                İlan Bildirimleri
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTypeFilter("auction")}>
                Mezat Bildirimleri
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Başlık</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead className="text-center">Bildirim Sayısı</TableHead>
              <TableHead>İlk Bildirim</TableHead>
              <TableHead>Son Bildirim</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.itemTitle}</TableCell>
                <TableCell>
                  {report.itemType === "listing" ? "İlan" : "Mezat"}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    {report.reportCount}
                  </div>
                </TableCell>
                <TableCell>{formatDateTime(report.firstReportDate)}</TableCell>
                <TableCell>{formatDateTime(report.lastReportDate)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedReport(report)}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
              Bildirim Detayları: {selectedReport?.itemTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bildiren Kullanıcı</TableHead>
                  <TableHead>Bildirim Tarihi</TableHead>
                  <TableHead>Bildirim Nedeni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedReport?.reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.userName}</TableCell>
                    <TableCell>{formatDateTime(report.reportDate)}</TableCell>
                    <TableCell>{report.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reports;
