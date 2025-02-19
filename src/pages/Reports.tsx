
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Search, Send } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  sentAt: Date;
  recipientCount: number;
}

// Örnek veriler
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "Sistem Bakımı",
    message: "Yarın 02:00-04:00 arası sistem bakımda olacaktır.",
    sentAt: new Date("2024-03-15T10:00:00"),
    recipientCount: 1250
  },
  {
    id: "2",
    title: "Yeni Özellik",
    message: "Artık ilanlarınıza video ekleyebilirsiniz!",
    sentAt: new Date("2024-03-14T15:30:00"),
    recipientCount: 1500
  }
];

const Reports = () => {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSendNotification = () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      toast({
        title: "Hata",
        description: "Başlık ve mesaj alanları boş bırakılamaz.",
        variant: "destructive",
      });
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      title: newTitle,
      message: newMessage,
      sentAt: new Date(),
      recipientCount: 1500 // Örnek değer
    };

    setNotifications([newNotification, ...notifications]);
    setNewTitle("");
    setNewMessage("");

    toast({
      title: "Bildirim gönderildi",
      description: "Bildirim tüm kullanıcılara başarıyla gönderildi.",
    });
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-admin-foreground">Bildirimler</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yeni Bildirim Gönder</CardTitle>
          <CardDescription>
            Tüm kullanıcılara toplu bildirim gönder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              placeholder="Bildirim başlığı"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Mesaj</Label>
            <Textarea
              id="message"
              placeholder="Bildirim mesajı"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={4}
            />
          </div>
          <Button
            className="w-full"
            onClick={handleSendNotification}
          >
            <Send className="w-4 h-4 mr-2" />
            Bildirimi Gönder
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-admin-foreground">Gönderilen Bildirimler</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Bildirimlerde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[300px]"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlık</TableHead>
                <TableHead>Mesaj</TableHead>
                <TableHead>Gönderilme Tarihi</TableHead>
                <TableHead>Alıcı Sayısı</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotifications.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-muted-foreground" />
                      {notification.title}
                    </div>
                  </TableCell>
                  <TableCell>{notification.message}</TableCell>
                  <TableCell>
                    {format(notification.sentAt, "dd.MM.yyyy HH:mm")}
                  </TableCell>
                  <TableCell>{notification.recipientCount.toLocaleString()} kullanıcı</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
