import { useState, useEffect } from "react";
import { SidebarItem } from "@/app/types/menu";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  sidebarItems: SidebarItem[];
  selectedItem: SidebarItem;
  setSelectedItem: Dispatch<SetStateAction<SidebarItem>>;
}

const Sidebar = ({
  sidebarItems,
  selectedItem,
  setSelectedItem,
}: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`bg-neutral-50 text-white p-4 transition-all duration-300
          w-full md:bg-gray-900
          ${isCollapsed ? "h-16 md:w-20 md:h-auto" : "h-fit md:w-64 md:h-full"}
      `}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2 p-1">
            <Image
              src="/icons/svg-gobbler.png"
              alt="CLOIT Logo"
              width={60}
              height={50}
            />
          </div>
        )}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`pl-4 pb-2 bg-white md:bg-gray-900 rounded text-sm w-full ${
            !isCollapsed ? "md:w-12" : ""
          }`}
        >
          <img
            src={
              isMobile ? "/icons/header-right.png" : "/icons/header-left.png"
            }
            alt="Toggle Sidebar"
          />
        </button>
      </div>

      <nav
        className={`mt-1 bg-gray-800 rounded-xl ${
          isCollapsed ? "p-0 gap-0 bg-transparent" : "p-2 gap-2"
        }`}
      >
        {sidebarItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`flex items-center gap-3 p-4 rounded-2xl font-bold mt-2 ${
              item === selectedItem
                ? "bg-lime-400 text-black"
                : "hover:bg-gray-700 text-gray-500"
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <Image src={item.image} alt={item.label} width={20} height={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
