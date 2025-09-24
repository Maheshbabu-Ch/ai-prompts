import { useState } from "react";
import { 
  Sparkles, 
  Users, 
  User, 
  Baby, 
  Heart, 
  Wand2, 
  Trees, 
  Palette,
  Grid3X3,
  Upload
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { categories } from "@/data/prompts";
import { useAuthStatus } from "@/hooks/useAuthStatus";

const categoryIcons: Record<string, any> = {
  "All": Grid3X3,
  "Women": Users,
  "Men": User,
  "Kids": Baby,
  "Anime": Sparkles,
  "Couple": Heart,
  "Fantasy": Wand2,
  "Nature": Trees,
  "Abstract": Palette,
};

export function AppSidebar() {
  const isLoggedIn = useAuthStatus();
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const isMobile = useIsMobile();

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const getNavClassName = ({ isActive }: { isActive: boolean }) =>
    `flex items-center w-full transition-colors duration-200 ${
      isActive 
        ? "bg-primary text-primary-foreground font-medium shadow-sm" 
        : "hover:bg-secondary/80 text-foreground/80 hover:text-foreground"
    }`;

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r bg-gradient-subtle`}>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                AI Prompts
              </h1>
              <p className="text-xs text-muted-foreground">Gallery & Collection</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {categories.map((category) => {
                const Icon = categoryIcons[category] || Grid3X3;
                const isActive = currentPath === `/category/${category.toLowerCase()}` || 
                                (currentPath === "/" && category === "All");
                
                return (
                  <SidebarMenuItem key={category}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={category === "All" ? "/" : `/category/${category.toLowerCase()}`}
                        className={getNavClassName({ isActive })}
                        onClick={handleNavClick}
                      >
                        <Icon className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} transition-transform hover:scale-110`} />
                        {!collapsed && <span className="truncate">{category}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              {isLoggedIn && (
                <SidebarGroup>
                  <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
                    Admin
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu className="space-y-1">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to="/admin/upload"
                            className={getNavClassName({ isActive: currentPath === "/admin/upload" })}
                            onClick={handleNavClick}
                          >
                            <Upload className={`${collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"} transition-transform hover:scale-110`} />
                            {!collapsed && <span className="truncate">Upload</span>}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}