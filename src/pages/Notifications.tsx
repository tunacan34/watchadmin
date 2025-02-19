
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, Search, Send, Users, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  memberNo: string;
  phone: string;
  email: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  sentAt: Date;
  recipientCount: number;
  recipients?: string[];
}

// Örnek kullanıcı verileri
const dummyUsers: User[] = [
  { id: "1", name: "Ahmet Yılmaz", memberNo: "M001", phone: "532 123 4567", email: "ahmet@example.com" },
  { id: "2", name: "Ayşe Demir", memberNo: "M002", phone: "533 234 5678", email: "ayse@example.com" },
  { id: "3", name: "Mehmet Kaya", memberNo: "M003", phone: "534 345 6789", email: "mehmet@example.com" },
];

// Örnek bildirim verileri
const dummyNotifications: Notification[] = [
  {
    id: "1",
    title: "Sistem Bakımı",
    message: "Yarın 02:00-04:00 arası sistem bakımda olacaktır.",
    sentAt: new Date("2024-03-15T10:00:00"),
    recipientCount: 1250,
    recipients: ["all"]
  },
  {
    id: "2",
    title: "Yeni Özellik",
    message: "Artık ilanlarınıza video ekleyebilirsiniz!",
    sentAt: new Date("2024-03-14T15:30:00"),
    recipientCount: 1500,
    recipients: ["1", "2"]
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(dummyNotifications);
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [notificationType, setNotificationType] = useState<"all" | "selected">("all");
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

    if (notificationType === "selected" && selectedUsers.length === 0) {
      toast({
        title: "Hata",
        description: "En az bir kullanıcı seçmelisiniz.",
        variant: "destructive",
      });
      return;
    }

    const newNotification: Notification = {
      id: Date.now().toString(),
      title: newTitle,
      message: newMessage,
      sentAt: new Date(),
      recipientCount: notificationType === "all" ? 1500 : selectedUsers.length,
      recipients: notificationType === "all" ? ["all"] : selectedUsers.map(u => u.id)
    };

    setNotifications([newNotification, ...notifications]);
    setNewTitle("");
    setNewMessage("");
    setSelectedUsers([]);
    setNotificationType("all");

    toast({
      title: "Bildirim gönderildi",
      description: `Bildirim ${notificationType === "all" ? "tüm kullanıcılara" : "seçili kullanıcılara"} başarıyla gönderildi.`,
    });
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = dummyUsers.filter(user =>
    !selectedUsers.find(u => u.id === user.id) &&
    (user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.memberNo.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
    user.phone.includes(userSearchQuery))
  );

  const handleSelectUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setUserSearchQuery("");
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter(u => u.id !== userId));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-admin-foreground">Bildirimler</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yeni Bildirim Gönder</CardTitle>
          <CardDescription>
            Tüm kullanıcılara veya seçili kullanıcılara bildirim gönder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Bildirim Türü</Label>
            <Select
              value={notificationType}
              onValueChange={(value: "all" | "selected") => setNotificationType(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bildirim türü seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kullanıcılar</SelectItem>
                <SelectItem value="selected">Seçili Kullanıcılar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {notificationType === "selected" && (
            <div className="space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Kullanıcı Ara</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="İsim, üye no veya telefon ile ara..."
                    value={userSearchQuery}
                    onChange={(e) => setUserSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {userSearchQuery && (
                  <div className="mt-2 border rounded-lg divide-y max-h-40 overflow-auto">
                    {filteredUsers.map((user) => (
                      <button
                        key={user.id}
                        onClick={() => handleSelectUser(user)}
                        className="w-full p-2 text-left hover:bg-gray-50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Üye No: {user.memberNo} · Tel: {user.phone}
                          </div>
                        </div>
                        <UserCheck className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {selectedUsers.length > 0 && (
                <div className="space-y-2">
                  <Label>Seçili Kullanıcılar ({selectedUsers.length})</Label>
                  <div className="space-y-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center justify-between p-2 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Üye No: {user.memberNo} · Tel: {user.phone}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveUser(user.id)}
                        >
                          Kaldır
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
            {notificationType === "all" ? "Tüm Kullanıcılara Gönder" : "Seçili Kullanıcılara Gönder"}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items
-center justify-between">
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
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      {notification.recipientCount.toLocaleString()} kullanıcı
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
