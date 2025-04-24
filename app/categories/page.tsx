"use client";

import CategoryHierarchy from "@/components/category-hierarchy";
import CategoryStats from "@/components/category-stats";

export default function CategoriesPage() {
  // const { categories, isLoading } = useCategories();

  return (
    <div className="grid grid-cols-3 gap-4 ">
      <div className="col-span-2">
        <CategoryHierarchy />;
      </div>
      <div className="col-span-1">
        <CategoryStats />
      </div>
    </div>
  );
}
