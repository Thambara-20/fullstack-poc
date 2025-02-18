import Image from "next/image";

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

const Sidebar = ({
  selectedItem,
  sidebarItems,
  setSelectedItem,
}: {
  sidebarItems: SidebarItem[];
  selectedItem: SidebarItem;
  setSelectedItem: (item: SidebarItem) => void;
}) => (
  <aside className="w-full h-full p-4">
    <div className="flex items-center gap-2 p-1">
      <Image
        src={"/icons/svg-gobbler.png"}
        alt="CLOIT Logo"
        width={60}
        height={50}
        className="hidden md:block"
      />
    </div>
    <nav className="mt-4 bg-gray-800 rounded-xl p-3 gap-2">
      {sidebarItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className={`flex items-center gap-3 p-3 rounded-2xl font-bold ${
            item === selectedItem
              ? "bg-lime-400 text-black"
              : "hover:bg-gray-700 text-gray-500"
          }`}
          onClick={() => setSelectedItem(item)}
        >
          <Image src={item.image} alt={item.label} width={20} height={20} />
          <span className="hidden md:inline">{item.label}</span>
        </a>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
