import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Plus, Search, Image } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface SubModel {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  subModels: SubModel[];
}

const Brands = () => {
  const initialBrands: Brand[] = [
    {
      id: "1",
      name: "Rolex",
      logoUrl: "https://example.com/rolex-logo.png",
      subModels: [
        { id: "1-1", name: "Daytona" },
        { id: "1-2", name: "Submariner" },
        { id: "1-3", name: "DateJust" }
      ]
    },
    {
      id: "2",
      name: "Patek Philippe",
      subModels: [
        { id: "2-1", name: "Nautilus" },
        { id: "2-2", name: "Calatrava" }
      ]
    },
    {
      id: "3",
      name: "Audemars Piguet",
      logoUrl: "https://example.com/ap-logo.png",
      subModels: [
        { id: "3-1", name: "Royal Oak" },
        { id: "3-2", name: "Code 11.59" }
      ]
    }
  ];

  const [brands, setBrands] = useState<Brand[]>(initialBrands.sort((a, b) => a.name.localeCompare(b.name)));
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandLogo, setNewBrandLogo] = useState("");
  const [newModels, setNewModels] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingModels, setIsAddingModels] = useState(false);

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewBrandLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBrand = () => {
    if (newBrandName.trim()) {
      const newBrand: Brand = {
        id: `${brands.length + 1}`,
        name: newBrandName,
        logoUrl: newBrandLogo.trim() || undefined,
        subModels: []
      };
      const updatedBrands = [...brands, newBrand].sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      setBrands(updatedBrands);
      setNewBrandName("");
      setNewBrandLogo("");
    }
  };

  const handleAddSubModels = (brandId: string) => {
    if (newModels.trim()) {
      const modelNames = newModels
        .split('\n')
        .map(name => name.trim())
        .filter(name => name.length > 0);

      const updatedBrands = brands.map(brand => {
        if (brand.id === brandId) {
          const newSubModels = modelNames.map((name, index) => ({
            id: `${brandId}-${brand.subModels.length + index + 1}`,
            name
          }));
          
          const allModels = [...brand.subModels, ...newSubModels].sort((a, b) => 
            a.name.localeCompare(b.name)
          );
          
          return {
            ...brand,
            subModels: allModels
          };
        }
        return brand;
      });

      setBrands(updatedBrands);
      setNewModels("");
      setIsAddingModels(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-admin-foreground">MARKA MODEL</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Marka Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Yeni Marka Ekle</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Marka Adı</Label>
                <Input
                  id="name"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="Marka adını giriniz"
                />
              </div>
              <div className="grid gap-2">
                <Label>Logo</Label>
                <div className="space-y-4">
                  {newBrandLogo && (
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={newBrandLogo} alt="Yüklenen Logo" />
                        <AvatarFallback>{newBrandName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setNewBrandLogo("")}
                      >
                        Logoyu Kaldır
                      </Button>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="url"
                        value={newBrandLogo}
                        onChange={(e) => setNewBrandLogo(e.target.value)}
                        placeholder="veya logo URL'si girin"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <Button onClick={handleAddBrand}>Ekle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Markalar</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Marka ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px]">
              {filteredBrands.map((brand) => (
                <Button
                  key={brand.id}
                  variant="ghost"
                  className="w-full justify-start rounded-none border-b last:border-0"
                  onClick={() => setSelectedBrand(brand)}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={brand.logoUrl} alt={brand.name} />
                    <AvatarFallback className="text-xs">{brand.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  {brand.name}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedBrand && (
          <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedBrand.logoUrl} alt={selectedBrand.name} />
                  <AvatarFallback className="text-sm">{selectedBrand.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-lg">{selectedBrand.name} Modelleri</CardTitle>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') {
                            const updatedBrands = brands.map(brand => 
                              brand.id === selectedBrand.id 
                                ? { ...brand, logoUrl: reader.result }
                                : brand
                            );
                            setBrands(updatedBrands);
                          }
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                >
                  <Image className="w-4 h-4 mr-2" />
                  Logo Ekle
                </Button>
                {!isAddingModels && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddingModels(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Model Ekle
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[450px]">
                <div className="space-y-3">
                  {isAddingModels && (
                    <div className="space-y-3 border rounded-md p-3 bg-muted/50">
                      <Textarea
                        value={newModels}
                        onChange={(e) => setNewModels(e.target.value)}
                        placeholder="Her satıra bir model yazın:&#10;Datejust&#10;Submariner&#10;GMT-Master II"
                        className="min-h-[100px]"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setIsAddingModels(false)}
                        >
                          İptal
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleAddSubModels(selectedBrand.id)}
                        >
                          Ekle
                        </Button>
                      </div>
                    </div>
                  )}
                  {selectedBrand.subModels.map((model) => (
                    <div
                      key={model.id}
                      className="flex items-center px-4 py-2 text-sm border rounded-md"
                    >
                      {model.name}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Brands;
