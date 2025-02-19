
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";

const Boosters = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-admin-foreground">DOPINGLER</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Doping Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Doping Ekle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Doping Adı</Label>
                <Input id="name" placeholder="Doping adını giriniz" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Açıklama</Label>
                <Input id="description" placeholder="Doping açıklamasını giriniz" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Fiyat</Label>
                <Input 
                  id="price" 
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Süre (Gün)</Label>
                <Input 
                  id="duration" 
                  type="number"
                  placeholder="Gün sayısı giriniz"
                  min="1"
                />
              </div>
              <div className="mt-4">
                <Button className="w-full">Kaydet</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Boosters;
