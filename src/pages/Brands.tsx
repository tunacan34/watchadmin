
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, Plus, ChevronDown } from "lucide-react";

interface SubModel {
  id: string;
  name: string;
  year: string;
  description: string;
}

interface Brand {
  id: string;
  name: string;
  subModels: SubModel[];
  isExpanded?: boolean;
}

const Brands = () => {
  // Dummy data
  const initialBrands: Brand[] = [
    {
      id: "1",
      name: "Rolex",
      subModels: [
        { id: "1-1", name: "Daytona", year: "2024", description: "Chronograph model" },
        { id: "1-2", name: "Submariner", year: "2024", description: "Diving watch" },
        { id: "1-3", name: "DateJust", year: "2024", description: "Classic model" }
      ]
    },
    {
      id: "2",
      name: "Patek Philippe",
      subModels: [
        { id: "2-1", name: "Nautilus", year: "2024", description: "Sport elegant" },
        { id: "2-2", name: "Calatrava", year: "2024", description: "Dress watch" }
      ]
    },
    {
      id: "3",
      name: "Audemars Piguet",
      subModels: [
        { id: "3-1", name: "Royal Oak", year: "2024", description: "Luxury sports watch" },
        { id: "3-2", name: "Code 11.59", year: "2024", description: "Contemporary design" }
      ]
    }
  ];

  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [newBrandName, setNewBrandName] = useState("");
  const [newSubModel, setNewSubModel] = useState<Partial<SubModel>>({
    name: "",
    year: "",
    description: ""
  });

  const handleToggleBrand = (brandId: string) => {
    setBrands(brands.map(brand => 
      brand.id === brandId 
        ? { ...brand, isExpanded: !brand.isExpanded }
        : brand
    ));
  };

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

  const handleAddSubModel = (brandId: string) => {
    if (newSubModel.name && newSubModel.year) {
      const updatedBrands = brands.map(brand => {
        if (brand.id === brandId) {
          return {
            ...brand,
            subModels: [...brand.subModels, {
              id: `${brandId}-${brand.subModels.length + 1}`,
              name: newSubModel.name,
              year: newSubModel.year,
              description: newSubModel.description || ""
            }]
          };
        }
        return brand;
      });
      setBrands(updatedBrands);
      setNewSubModel({ name: "", year: "", description: "" });
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

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Marka / Model</TableHead>
              <TableHead>Yıl</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead className="text-right">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <>
                <TableRow key={brand.id} className="bg-muted/50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      className="p-0 hover:bg-transparent"
                      onClick={() => handleToggleBrand(brand.id)}
                    >
                      {brand.isExpanded ? (
                        <ChevronDown className="w-4 h-4 mr-2" />
                      ) : (
                        <ChevronRight className="w-4 h-4 mr-2" />
                      )}
                      <span className="font-medium">{brand.name}</span>
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Alt Model Ekle
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{brand.name} - Yeni Alt Model Ekle</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="modelName">Model Adı</Label>
                            <Input
                              id="modelName"
                              value={newSubModel.name}
                              onChange={(e) => setNewSubModel({...newSubModel, name: e.target.value})}
                              placeholder="Model adını giriniz"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="modelYear">Yıl</Label>
                            <Input
                              id="modelYear"
                              value={newSubModel.year}
                              onChange={(e) => setNewSubModel({...newSubModel, year: e.target.value})}
                              placeholder="Model yılını giriniz"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="modelDesc">Açıklama</Label>
                            <Input
                              id="modelDesc"
                              value={newSubModel.description}
                              onChange={(e) => setNewSubModel({...newSubModel, description: e.target.value})}
                              placeholder="Model açıklamasını giriniz"
                            />
                          </div>
                          <Button onClick={() => handleAddSubModel(brand.id)}>Ekle</Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
                {brand.isExpanded && brand.subModels.map((subModel) => (
                  <TableRow key={subModel.id}>
                    <TableCell className="pl-12">
                      {subModel.name}
                    </TableCell>
                    <TableCell>{subModel.year}</TableCell>
                    <TableCell>{subModel.description}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Brands;
