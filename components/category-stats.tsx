import { Layers, TrendingUp, ShoppingBag } from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

const CategoryStats = () => {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          Category Overview
        </CardTitle>
        <CardDescription>Summary of your category structure</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Total Categories</div>
              <div className="text-2xl font-bold">15</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Deepest Level</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <ShoppingBag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium">Total Products</div>
              <div className="text-2xl font-bold">5,272</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryStats;
