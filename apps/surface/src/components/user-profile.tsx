"use client";

import {
  UserIcon,
  SettingsIcon,
  BellIcon,
  LogOutIcon,
  CreditCardIcon,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/useAuthStore";
import { useTransition } from "react";
import { logoutAction } from "@/lib/auth";
import { useHasHydrated } from "@/hooks/use-hydrated";

const listItems = [
  {
    icon: UserIcon,
    property: "Profile",
  },
  {
    icon: SettingsIcon,
    property: "Settings",
  },
  {
    icon: CreditCardIcon,
    property: "Billing",
  },
  {
    icon: BellIcon,
    property: "Notifications",
  },
];

const DropdownMenuUser = () => {
  const { state, isMobile } = useSidebar();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isPending, startTransition] = useTransition();

  const isHydrated = useHasHydrated();

  const handleLogout = () => {
    startTransition(async () => {
      logout();
      await logoutAction();
    });
  };

  const isCollapsed = state === "collapsed";

  if (!isHydrated || !isAuthenticated || !user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`bg-secondary flex items-center rounded-lg focus-visible:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
          isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2.5"
        }`}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              user.avatar ||
              "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
            }
            alt={user.name}
          />
          <AvatarFallback className="text-xs">
            {user.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div className="flex flex-col text-start leading-none gap-0.5">
            <span className="max-w-[17ch] truncate text-sm font-semibold">
              {user.name}
            </span>
            <span className="text-muted-foreground max-w-[20ch] truncate text-[10px]">
              {user.email}
            </span>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {listItems.map((item, index) => (
            <DropdownMenuItem key={index} className="cursor-pointer">
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.property}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>{isPending ? "Signing out..." : "Sign Out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuUser;
