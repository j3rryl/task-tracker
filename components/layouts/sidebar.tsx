"use client";
import { useState } from "react";
import {
  Bell,
  ClipboardEdit,
  LayoutDashboard,
  Menu,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tasks", label: "Tasks", icon: ClipboardEdit },
    { href: "/settings", label: "Settings", icon: Settings },
  ];
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 min-h-screen flex flex-col ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block`}
      >
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Task Tracker</h2>
        </div>
        <nav className="flex-grow">
          <ul className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={`w-full justify-start my-2 mx-2 text-base ${
                      isActive
                        ? "bg-primary text-white hover:bg-primary hover:text-white"
                        : ""
                    }`}
                    asChild
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.label}
                    </Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between md:justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center justify-end space-x-4">
              <Input
                type="search"
                placeholder="Search..."
                className="hidden md:block"
              />
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        {children}
      </div>
    </div>
  );
}
