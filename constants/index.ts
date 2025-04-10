import {
  Home,
  LayoutGrid,
  Box,
  Blocks,
  ClipboardList,
  Settings,
} from "lucide-react";

interface ISidebarRoute {
  title: string;
  url: string;
  icon?: any;
  children?: ISidebarRoute[];
}

export const sidebarRoutes: ISidebarRoute[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Categories",
    url: "#",
    icon: LayoutGrid,
    children: [{ title: "Manage categories", url: "/categories" }],
  },
  {
    title: "Products",
    url: "#",
    icon: Box,
    children: [{ title: "Manage products", url: "/products" }],
  },
];
