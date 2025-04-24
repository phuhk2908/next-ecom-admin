"use client";

import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();


const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <div className="p-2">{children}</div>
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  );
};

export default Providers;
