"use client";

import { sidebarRoutes } from "@/constants";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { ChevronRight, Settings2, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarFooter,
} from "./sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import Link from "next/link";

const AppSidebar = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<Record<string, boolean>>(
    {}
  );

  const toggleItem = (title: string) => {
    setIsSubMenuOpen((prev: any) => ({ ...prev, [title]: !prev[title] }));
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarRoutes.map((item) =>
                item.children ? (
                  <Collapsible
                    key={item.title}
                    open={isSubMenuOpen[item.title]}
                    onOpenChange={() => toggleItem(item.title)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton asChild>
                          <div className="flex w-full justify-between">
                            <div className="flex items-center gap-2">
                              <item.icon className="size-4" />
                              <span>{item.title}</span>
                            </div>

                            <ChevronRight
                              className={cn(
                                "duration-300",
                                isSubMenuOpen[item.title] && "rotate-90"
                              )}
                            />
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <SidebarMenuSub>
                          {item.children.map((subItem) => (
                            <SidebarMenuButton key={subItem.title} asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          ))}
                          <SidebarMenuSubItem />
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-full w-full justify-between" variant="outline">
              <div className="flex items-center space-x-1">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-xs">Email</span>
              </div>
              <Settings2 />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end">
            <DropdownMenuItem>
              Logout
              <DropdownMenuShortcut>
                <LogOut className="size-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
