
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Boosters = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    listingCount: 0,
    promoCount: 0,
    duration: 0,
    price: 0,
    type: "listing", // listing, showcase, search, auction
    userType: "member", // member, standard_store
  });

  const totalListingCount = formData.listingCount + formData.promoCount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.id]: value
    }));
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
    // TODO: API call to save booster
  };

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
              <DialogTitle>İlan Dopingi Ekle</DialogTitle>
              <DialogDescription>
                Normal üyeler ve standart mağazalar için ilan yayınlama hakkı
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Doping Adı</Label>
                <Input 
                  id="name" 
                  placeholder="Örn: 10 İlan Paketi"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Açıklama</Label>
                <Input 
                  id="description" 
                  placeholder="Doping açıklamasını giriniz"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label>Kimler Alabilir?</Label>
                <RadioGroup 
                  defaultValue={formData.userType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, userType: value }))}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="member" id="member" />
                    <Label htmlFor="member">Normal Üye</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard_store" id="standard_store" />
                    <Label htmlFor="standard_store">Standart Mağaza</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="listingCount">İlan Adeti</Label>
                <Input 
                  id="listingCount" 
                  type="number"
                  placeholder="0"
                  min="1"
                  value={formData.listingCount || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="promoCount">Promosyon İlan Adeti</Label>
                <Input 
                  id="promoCount" 
                  type="number"
                  placeholder="0"
                  min="0"
                  value={formData.promoCount || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label>Toplam Yayınlanabilecek İlan Adeti</Label>
                <div className="px-3 py-2 border rounded-md bg-muted">
                  {totalListingCount}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Kullanım Hakkı Süresi (Gün)</Label>
                <Input 
                  id="duration" 
                  type="number"
                  placeholder="Gün sayısı giriniz"
                  min="1"
                  value={formData.duration || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Fiyat (₺)</Label>
                <Input 
                  id="price" 
                  type="number"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  value={formData.price || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mt-4">
                <Button className="w-full" onClick={handleSubmit}>
                  Kaydet
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Boosters;
