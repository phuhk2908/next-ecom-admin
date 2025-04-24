import { Home, LayoutGrid, Box } from "lucide-react";

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

export const categories = [
  {
    id: 1,
    name: "Electronics",
    path: "electronics",
    level: 0,
    slug: "electronics",
    description: "Electronic devices and accessories",
    productCount: 1240,
    children: [
      {
        id: 4,
        name: "Computers",
        path: "electronics.computers",
        level: 1,
        slug: "computers",
        description: "Desktop and laptop computers",
        productCount: 356,
        children: [
          {
            id: 7,
            name: "Laptops",
            path: "electronics.computers.laptops",
            level: 2,
            slug: "laptops",
            description: "Portable computers",
            productCount: 128,
            children: [],
          },
          {
            id: 8,
            name: "Desktops",
            path: "electronics.computers.desktops",
            level: 2,
            slug: "desktops",
            description: "Desktop computers",
            productCount: 87,
            children: [],
          },
          {
            id: 9,
            name: "Tablets",
            path: "electronics.computers.tablets",
            level: 2,
            slug: "tablets",
            description: "Tablet computers",
            productCount: 141,
            children: [],
          },
        ],
      },
      {
        id: 5,
        name: "Smartphones",
        path: "electronics.smartphones",
        level: 1,
        slug: "smartphones",
        description: "Mobile phones and accessories",
        productCount: 423,
        children: [],
      },
      {
        id: 6,
        name: "Audio",
        path: "electronics.audio",
        level: 1,
        slug: "audio",
        description: "Headphones, speakers and audio equipment",
        productCount: 461,
        children: [],
      },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    path: "clothing",
    level: 0,
    slug: "clothing",
    description: "Apparel and fashion items",
    productCount: 2156,
    children: [
      {
        id: 10,
        name: "Men's Clothing",
        path: "clothing.mens",
        level: 1,
        slug: "mens-clothing",
        description: "Clothing for men",
        productCount: 782,
        children: [],
      },
      {
        id: 11,
        name: "Women's Clothing",
        path: "clothing.womens",
        level: 1,
        slug: "womens-clothing",
        description: "Clothing for women",
        productCount: 1045,
        children: [],
      },
      {
        id: 12,
        name: "Children's Clothing",
        path: "clothing.childrens",
        level: 1,
        slug: "childrens-clothing",
        description: "Clothing for children",
        productCount: 329,
        children: [],
      },
    ],
  },
  {
    id: 3,
    name: "Home & Garden",
    path: "home_garden",
    level: 0,
    slug: "home-garden",
    description: "Home improvement and garden supplies",
    productCount: 1876,
    children: [],
  },
];
