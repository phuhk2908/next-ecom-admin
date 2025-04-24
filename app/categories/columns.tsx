"use client";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, Router } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import moment from "moment";
import { Switch } from "@/components/ui/switch";
import CategoryForm from "./category-form";

import { categoryApi } from "@/services/category";
import { useCategories } from "@/hooks/use-categories";

export type Category = {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive";
  createdAt: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { refetch } = useCategories();
      const isActive = row.original.status === "active";

      return (
        <Switch
          checked={isActive}
          onCheckedChange={async () => {
            await categoryApi.updateCategoryStatus(row.original.id, {
              status: isActive ? "inactive" : "active",
            });
            refetch();
          }}
          className="data-[state=checked]:bg-green-500"
        />
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return <>{moment(row.original.createdAt).format("DD/MM/YYYY")}</>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(category.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <CategoryForm mode="create" categoryId={row.original.id} />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <CategoryForm mode="edit" categoryId={row.original.id} />
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
