"use client";

import { categories as initCategories} from "@/constants";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ChevronRight,
  MoreHorizontal,
  Edit,
  FolderPlus,
  Trash2,
  FolderTree,
  Plus,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

const CategoryHierarchy = () => {
  const [categories, setCategories] = useState(initCategories);
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [parentForNewCategory, setParentForNewCategory] = useState<any>(null);

  const toggleExpand = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = (newCategory: any) => {
    if (parentForNewCategory) {
      // Add as child to specific parent
      const updatedCategories = addCategoryToParent(
        categories,
        parentForNewCategory.id,
        newCategory
      );
      setCategories(updatedCategories);
      // Expand the parent to show the new child
      if (!expandedCategories.includes(parentForNewCategory.id)) {
        setExpandedCategories([...expandedCategories, parentForNewCategory.id]);
      }
    } else {
      // Add as top-level category
      setCategories([...categories, { ...newCategory, children: [] }]);
    }
    setParentForNewCategory(null);
  };

  const addCategoryToParent = (
    cats: any[],
    parentId: number,
    newCategory: any
  ): any[] => {
    return cats.map((cat) => {
      if (cat.id === parentId) {
        return {
          ...cat,
          children: [...(cat.children || []), { ...newCategory, children: [] }],
        };
      } else if (cat.children && cat.children.length > 0) {
        return {
          ...cat,
          children: addCategoryToParent(cat.children, parentId, newCategory),
        };
      }
      return cat;
    });
  };

  const handleUpdateCategory = (updatedCategory: any) => {
    const newCategories = updateCategoryInTree(categories, updatedCategory);
    setCategories(newCategories);
  };

  const updateCategoryInTree = (cats: any[], updatedCat: any): any[] => {
    return cats.map((cat) => {
      if (cat.id === updatedCat.id) {
        return { ...cat, ...updatedCat, children: cat.children };
      } else if (cat.children && cat.children.length > 0) {
        return {
          ...cat,
          children: updateCategoryInTree(cat.children, updatedCat),
        };
      }
      return cat;
    });
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;

    const newCategories = deleteCategoryFromTree(
      categories,
      selectedCategory.id
    );
    setCategories(newCategories);
    setIsDeleteDialogOpen(false);
    setSelectedCategory(null);

    toast.success(`${selectedCategory.name} has been successfully deleted.`);
  };

  const deleteCategoryFromTree = (cats: any[], categoryId: number): any[] => {
    return cats
      .filter((cat) => cat.id !== categoryId)
      .map((cat) => {
        if (cat.children && cat.children.length > 0) {
          return {
            ...cat,
            children: deleteCategoryFromTree(cat.children, categoryId),
          };
        }
        return cat;
      });
  };

  const openAddDialog = (parent: any = null) => {
    setParentForNewCategory(parent);
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (category: any) => {
    setSelectedCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const renderCategory = (category: any, depth = 0) => {
    const isExpanded = expandedCategories.includes(category.id);
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category.id} className="animate-in fade-in-50">
        <div
          className={`
            flex items-center p-3 rounded-lg mb-1 hover:bg-gray-100 transition-colors
            ${depth === 0 ? "bg-white shadow-sm" : ""}
          `}
        >
          <div className="flex-1 flex items-center">
            {hasChildren && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 mr-1"
                onClick={() => toggleExpand(category.id)}
              >
                <ChevronRight
                  className={`h-4 w-4 transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                />
              </Button>
            )}

            {!hasChildren && <div className="w-8 mr-1" />}

            <div className="ml-1">
              <div className="font-medium">{category.name}</div>
              {category.description && (
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {category.description}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5">
              {category.productCount} products
            </Badge>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => openEditDialog(category)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => openAddDialog(category)}>
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Add subcategory
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => openDeleteDialog(category)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="pl-8 border-l border-gray-200 ml-4 space-y-1 my-2">
            {category.children.map((child: any) =>
              renderCategory(child, depth + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  const getTotalCategoryCount = (cats: any[]): number => {
    return cats.reduce((count, cat) => {
      return (
        count + 1 + (cat.children ? getTotalCategoryCount(cat.children) : 0)
      );
    }, 0);
  };

  const getTotalProductCount = (cats: any[]): number => {
    return cats.reduce((count, cat) => {
      return (
        count +
        cat.productCount +
        (cat.children ? getTotalProductCount(cat.children) : 0)
      );
    }, 0);
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Category Hierarchy</CardTitle>
              <CardDescription>Manage your product categories</CardDescription>
            </div>
            <Button size="sm" onClick={() => openAddDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {categories.map((category) => renderCategory(category))}
        </CardContent>
        <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <FolderTree className="h-4 w-4 mr-2" />
            {getTotalProductCount(categories)} products in{" "}
            {getTotalCategoryCount(categories)} categories
          </div>
        </CardFooter>
      </Card>

      {/* <AddCategoryDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddCategory={handleAddCategory}
        categories={categories}
      />

      <EditCategoryDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdateCategory={handleUpdateCategory}
        category={selectedCategory}
        categories={categories}
      /> */}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCategory?.children?.length > 0
                ? `This will delete "${selectedCategory?.name}" and all its subcategories. This action cannot be undone.`
                : `This will delete "${selectedCategory?.name}". This action cannot be undone.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CategoryHierarchy;
