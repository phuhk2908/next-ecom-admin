"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useCategory } from "@/hooks/use-categories";
import { useEffect } from "react";

// Define the schema
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "inactive"]),
});

// Define the type from the schema
type CategoryFormValues = z.infer<typeof categorySchema>;

type CategoryFormProps = {
  mode: "create" | "edit";
  categoryId: string;
};

const CategoryForm = ({ mode, categoryId }: CategoryFormProps) => {
  const isEdit = mode === "edit";
  const { category } = useCategory(categoryId);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "inactive",
    },
  });

  useEffect(() => {
    if (isEdit && category) {
      form.reset({
        name: category.name,
        description: category.description,
        status: category.status,
      });
    }
  }, [form, category, isEdit]);

  const onSubmit = (values: CategoryFormValues) => {
    console.log(values);
  };

  return (
    <Sheet>
      <SheetTrigger>{isEdit ? "Edit" : "Create"}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit" : "Create"} category</SheetTitle>
          <SheetDescription>
            Make changes to your category here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormDescription>The name of the category.</FormDescription>
                  <FormControl>
                    <Input placeholder="Activewear" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormDescription>
                    A short description of the category.
                  </FormDescription>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Clothing for workouts and sports."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value === "active"}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? "active" : "inactive");
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default CategoryForm;
