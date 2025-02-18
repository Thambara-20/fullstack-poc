export interface Menu {
  id: string;
  name: string;
  parentId?: string | null;
  children?: Menu[];
}

export interface SidebarItem {
  label: string;
  href: string;
  active?: boolean;
  image: string;
  uiImage: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Systems",
    href: "#",
    image: "/icons/folder.png",
    uiImage: "/icons/submenu-light.png",
  },
  {
    label: "System Code",
    href: "#",
    image: "/icons/menu.png",
    uiImage: "/icons/submenu-light.png",
  },
  {
    label: "Menus",
    href: "#",
    active: true,
    image: "/icons/submenu-dark.svg",
    uiImage: "/icons/submenu-light.png",
  },
  {
    label: "API List",
    href: "#",
    image: "/icons/menu.png",
    uiImage: "/icons/submenu-light.png",
  },
  {
    label: "Users & Group",
    href: "#",
    image: "/icons/menu.png",
    uiImage: "/icons/submenu-light.png",
  },
  {
    label: "Competition",
    href: "#",
    image: "/icons/folder.png",
    uiImage: "/icons/submenu-light.png",
  },
];
