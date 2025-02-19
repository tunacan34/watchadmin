
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
import { Plus, Package, Target, Trophy } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Booster {
  id: string;
  name: string;
  description: string;
  listingCount: number;
  promoCount: number;
  duration: number;
  price: number;
  type: string;
  userType: string;
}

const Boosters = () => {
  // Örnek veri oluşturma
  const dummyData: Booster[] = [
    {
      id: "1",
      name: "Başlangıç Paketi",
      description: "Yeni üyeler için ideal başlangıç paketi",
      listingCount: 5,
      promoCount: 1,
      duration: 30,
      price: 49.99,
      type: "listing",
      userType: "member"
    },
    {
      id: "2",
      name: "Standart Vitrin",
      description: "İlanlarınız vitrin bölümünde öne çıksın",
      listingCount: 10,
      promoCount: 2,
      duration: 30,
      price: 89.99,
      type: "showcase",
      userType: "member"
    },
    {
      id: "3",
      name: "Premium Arama",
      description: "Aramada en üst sıralarda yer alın",
      listingCount: 20,
      promoCount: 5,
      duration: 45,
      price: 159.99,
      type: "search",
      userType: "standard_store"
    },
    {
      id: "4",
      name: "Mini Paket",
      description: "Tek seferlik satışlar için uygun paket",
      listingCount: 3,
      promoCount: 0,
      duration: 15,
      price: 29.99,
      type: "listing",
      userType: "member"
    },
    {
      id: "5",
      name: "Gold Vitrin",
      description: "Vitrin bölümünde maksimum görünürlük",
      listingCount: 30,
      promoCount: 8,
      duration: 60,
      price: 249.99,
      type: "showcase",
      userType: "standard_store"
    },
    {
      id: "6",
      name: "Platinum Arama",
      description: "En üst sırada kalıcı görünürlük",
      listingCount: 50,
      promoCount: 15,
      duration: 90,
      price: 399.99,
      type: "search",
      userType: "standard_store"
    },
    {
      id: "7",
      name: "Ekonomik Vitrin",
      description: "Uygun fiyatlı vitrin paketi",
      listingCount: 8,
      promoCount: 1,
      duration: 30,
      price: 69.99,
      type: "showcase",
      userType: "member"
    },
    {
      id: "8",
      name: "Profesyonel Arama",
      description: "Aramada sürekli üst sıralarda olun",
      listingCount: 25,
      promoCount: 6,
      duration: 45,
      price: 199.99,
      type: "search",
      userType: "standard_store"
    },
    {
      id: "9",
      name: "Elite Vitrin",
      description: "Üst düzey vitrin görünürlüğü",
      listingCount: 40,
      promoCount: 12,
      duration: 60,
      price: 299.99,
      type: "showcase",
      userType: "standard_store"
    },
    {
      id: "10",
      name: "Haftalık Arama",
      description: "Kısa süreli arama optimizasyonu",
      listingCount: 4,
      promoCount: 1,
      duration: 7,
      price: 19.99,
      type: "search",
      userType: "member"
    },
    {
      id: "11",
      name: "Ultra Paket",
      description: "Maksimum ilan ve promosyon avantajı",
      listingCount: 60,
      promoCount: 20,
      duration: 90,
      price: 499.99,
      type: "listing",
      userType: "standard_store"
    },
    {
      id: "12",
      name: "Deneme Vitrin",
      description: "Vitrin özelliğini test edin",
      listingCount: 2,
      promoCount: 1,
      duration: 15,
      price: 14.99,
      type: "showcase",
      userType: "member"
    }
  ];

  const [boosters, setBoosters] = useState<Booster[]>(dummyData);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    listingCount: 0,
    promoCount: 0,
    duration: 0,
    price: 0,
    type: "listing",
    userType: "member",
  });
  const [open, setOpen] = useState(false);

  const totalListingCount = formData.listingCount + formData.promoCount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setFormData(prev => ({
      ...prev,
      [e.target.id]: value
    }));
  };

  const handleSubmit = () => {
    const newBooster: Booster = {
      id: Date.now().toString(),
      ...formData
    };
    
    setBoosters(prev => [...prev, newBooster]);
    setFormData({
      name: "",
      description: "",
      listingCount: 0,
      promoCount: 0,
      duration: 0,
      price: 0,
      type: "listing",
      userType: "member",
    });
    setOpen(false);
  };

  const getBoosterIcon = (type: string) => {
    switch (type) {
      case 'showcase':
        return <Trophy className="w-6 h-6 text-primary" />;
      case 'search':
        return <Target className="w-6 h-6 text-primary" />;
      default:
        return <Package className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold text-admin-foreground">DOPINGLER</h1>
        
        <Dialog open={open} onOpenChange={setOpen}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boosters.map((booster) => (
          <div 
            key={booster.id}
            className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-full bg-primary/10">
                {getBoosterIcon(booster.type)}
              </div>
              <div>
                <h3 className="font-semibold">{booster.name}</h3>
                <p className="text-sm text-muted-foreground">{booster.description}</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>İlan Adeti:</span>
                <span className="font-medium">{booster.listingCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Promosyon İlan:</span>
                <span className="font-medium">{booster.promoCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Toplam İlan:</span>
                <span className="font-medium">{booster.listingCount + booster.promoCount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Süre:</span>
                <span className="font-medium">{booster.duration} gün</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Hedef Kullanıcı:</span>
                <span className="font-medium">
                  {booster.userType === "member" ? "Normal Üye" : "Standart Mağaza"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-semibold">₺{booster.price}</span>
                <Button variant="outline" size="sm">Düzenle</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boosters;
