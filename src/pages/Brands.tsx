
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
import { ChevronRight, Plus, Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SubModel {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
  subModels: SubModel[];
}

const Brands = () => {
  // Dummy data
  const initialBrands: Brand[] = [
    {
      id: "1",
      name: "Rolex",
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
      subModels: [
        { id: "3-1", name: "Royal Oak" },
        { id: "3-2", name: "Code 11.59" }
      ]
    }
  ];

  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [newModels, setNewModels] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingModels, setIsAddingModels] = useState(false);

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBrand = () => {
    if (newBrandName.trim()) {
      const newBrand: Brand = {
        id: `${brands.length + 1}`,
        name: newBrandName,
        subModels: []
      };
      setBrands([...brands, newBrand]);
      setNewBrandName("");
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
          
          return {
            ...brand,
            subModels: [...brand.subModels, ...newSubModels]
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
          <DialogContent>
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
              <Button onClick={handleAddBrand}>Ekle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-6">
        {/* Marka Listesi */}
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
                  <ChevronRight className="w-4 h-4 mr-2" />
                  {brand.name}
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Alt Modeller */}
        {selectedBrand && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg">{selectedBrand.name} Modelleri</CardTitle>
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
