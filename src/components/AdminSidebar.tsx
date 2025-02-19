
import { useState } from "react";
import {
  Users,
  LayoutDashboard,
  Settings,
  Package,
  Mail,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Kontrol Paneli", href: "#dashboard" },
  { icon: Users, label: "Kullanıcılar", href: "#users" },
  { icon: Package, label: "Ürünler", href: "#products" },
  { icon: Mail, label: "Mesajlar", href: "#messages" },
  { icon: Settings, label: "Ayarlar", href: "#settings" },
];

export const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 p-2 rounded-full bg-white shadow-lg z-50 lg:hidden transition-all hover:bg-gray-50"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-admin-foreground" />
        ) : (
          <Menu className="w-6 h-6 text-admin-foreground" />
        )}
      </button>
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-admin-foreground mb-8">
            Yönetici Paneli
          </h2>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-3 text-admin-muted hover:text-admin-foreground rounded-lg transition-all hover:bg-gray-50 group"
                  >
                    <item.icon className="w-5 h-5 mr-3 transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};
