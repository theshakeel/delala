"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Megaphone, Folder, FileText } from "lucide-react";

export default function AdminAside() {
  const pathname = usePathname();

  const links = [
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Ads", href: "/admin/ads", icon: Megaphone },
    { name: "Categories", href: "/admin/categories", icon: Folder },
    { name: "Pages", href: "/admin/pages", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      <nav className="mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {links.map(({ name, href, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <li key={name}>
                <Link
                  href={href}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? "bg-emerald-50 text-emerald-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 ${
                      active ? "text-emerald-700" : "text-gray-500"
                    }`}
                  />
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
