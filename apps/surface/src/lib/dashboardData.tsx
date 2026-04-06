import { Logo } from "@/components/logo";
import { Route } from "@/types/nav-types";
import {
  Bolt,
  Calendar,
  CalendarSync,
  FilePenLine,
  Home,
  ImageUp,
  LayoutTemplate,
  TrendingUp,
  Images,
} from "lucide-react";  

export const dashboardRoutes: Route[] = [
  {
    id: "home",
    title: "Home",
    icon: <Home className="size-4" />,
    link: "/dashboard",
  },
  {
    id: "platforms",
    title: "Platforms",
    icon: <LayoutTemplate className="size-4" />,
    link: "/dashboard/platforms",
    subs: [
      {
        title: "LinkedIn",
        link: "/dashboard/platforms/linkedin",
        // icon: <Package2 className="size-4" />,
      },
      {
        title: "Twitter",
        link: "/dashboard/platforms/twitter",
        // icon: <LinkIcon className="size-4" />,
      },
      {
        title: "Facebook",
        link: "/dashboard/platforms/facebook",
        // icon: <Percent className="size-4" />,
      },
    ],
  },
  // {
  //   id: "usage-billing",
  //   title: "Usage Billing",
  //   icon: <PieChart className="size-4" />,
  //   link: "#",
  //   subs: [
  //     {
  //       title: "Meters",
  //       link: "#",
  //       icon: <PieChart className="size-4" />,
  //     },
  //     {
  //       title: "Events",
  //       link: "#",
  //       icon: <Activity className="size-4" />,
  //     },
  //   ],
  // },
  {
    id: "analytics",
    title: "Analytics",
    icon: <TrendingUp className="size-4" />,
    link: "/dashboard/analytics",
  },
  {
    id: "all-posts",
    title: "All Post's",
    icon: <ImageUp className="size-4" />,
    link: "/dashboard/all-posts",
  },
  {
    id: "calendar",
    title: "Calendar",
    icon: <Calendar className="size-4" />,
    link: "/dashboard/calendar",
  },
  {
    id: "queues",
    title: "Queues",
    icon: <CalendarSync className="size-4" />,
    link: "/dashboard/queues",
  },
  {
    id: "media",
    title: "Media",
    icon: <Images className="size-4" />,
    link: "/dashboard/media",
  },
  {
    id: "drafts",
    title: "Drafts",
    icon: <FilePenLine className="size-4" />,
    link: "/dashboard/drafts",
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Bolt className="size-4" />,
    link: "/dashboard/settings",
  },
];

export const teams = [
  { id: "1", name: "Alpha Inc.", logo: Logo, plan: "user1@example.com" },
  { id: "2", name: "Beta Corp.", logo: Logo, plan: "user1@example.com" },
  { id: "3", name: "Gamma Tech", logo: Logo, plan: "user1@example.com" },
];

export const dummyUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};
