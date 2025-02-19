
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Search, Filter, MessageSquare, Reply, Check, AlertOctagon, XOctagon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SupportRequest {
  id: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "completed";
  createdAt: string;
  sender: {
    name: string;
    email: string;
    id: string;
  };
  messages: {
    id: string;
    message: string;
    sender: "user" | "support";
    createdAt: string;
  }[];
}

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "new" | "in-progress" | "completed">("all");
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Örnek destek talepleri
  const supportRequests: SupportRequest[] = [
    {
      id: "SR001",
      subject: "Saat Teslim Sorunu",
      message: "Sipariş ettiğim saat hala teslim edilmedi.",
      status: "new",
      createdAt: "2024-03-20T10:30:00",
      sender: {
        name: "Ahmet Yılmaz",
        email: "ahmet@example.com",
        id: "USER001"
      },
      messages: [
        {
          id: "MSG001",
          message: "Sipariş ettiğim saat hala teslim edilmedi.",
          sender: "user",
          createdAt: "2024-03-20T10:30:00"
        }
      ]
    },
    // Örnek veriler eklenebilir
  ];

  const filteredRequests = supportRequests.filter(request => {
    const matchesSearch = request.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.sender.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <div className="flex items-center text-blue-500"><AlertOctagon className="w-4 h-4 mr-1" /> Yeni</div>;
      case "in-progress":
        return <div className="flex items-center text-yellow-500"><AlertOctagon className="w-4 h-4 mr-1" /> Devam Ediyor</div>;
      case "completed":
        return <div className="flex items-center text-green-500"><Check className="w-4 h-4 mr-1" /> Tamamlandı</div>;
      default:
        return null;
    }
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

  const handleReply = () => {
    if (!selectedRequest || !replyMessage.trim()) return;
    
    console.log("Yanıt gönderiliyor:", {
      requestId: selectedRequest.id,
      message: replyMessage
    });
    
    setReplyMessage("");
    setSelectedRequest(null);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-semibold text-admin-foreground">Destek Talepleri</h1>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Destek talebi veya gönderen ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            onClick={() => setStatusFilter("all")}
          >
            <Filter className="w-4 h-4 mr-2" />
            Tümü
          </Button>
          <Button
            variant={statusFilter === "new" ? "default" : "outline"}
            onClick={() => setStatusFilter("new")}
          >
            Yeni
          </Button>
          <Button
            variant={statusFilter === "in-progress" ? "default" : "outline"}
            onClick={() => setStatusFilter("in-progress")}
          >
            Devam Eden
          </Button>
          <Button
            variant={statusFilter === "completed" ? "default" : "outline"}
            onClick={() => setStatusFilter("completed")}
          >
            Tamamlanan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{request.subject}</CardTitle>
                  <CardDescription>{request.sender.name}</CardDescription>
                </div>
                {getStatusBadge(request.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
              <p className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</p>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRequest(request)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Mesajlar ({request.messages.length})
              </Button>
              <Button size="sm" onClick={() => setSelectedRequest(request)}>
                <Reply className="w-4 h-4 mr-2" />
                Cevapla
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedRequest?.subject}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              {selectedRequest?.messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.sender === "user" ? "bg-muted ml-auto" : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs mt-2 opacity-70">{formatDate(message.createdAt)}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply">Yanıtınız</Label>
              <Textarea
                id="reply"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                İptal
              </Button>
              <Button onClick={handleReply}>
                <Reply className="w-4 h-4 mr-2" />
                Yanıtla
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;
