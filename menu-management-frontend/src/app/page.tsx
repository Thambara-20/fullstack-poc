// app/page.tsx or components/Home.tsx
"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MenuManager from "./pages/Menus";
import MenuSelection from "@/components/MenuSelection";
import { SidebarItem, sidebarItems } from "./types/menu";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<SidebarItem>(
    sidebarItems[2]
  );

  console.log(selectedItem);

  const renderContent = () => {
    switch (selectedItem.label) {
      case "Menus":
        return <MenuManager />;
      default:
        return <p>Not implemeted.</p>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-lvh overflow-auto">
      <Sidebar
        sidebarItems={sidebarItems}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
      />

      <main className="flex-1 p-6 space-y-4 overflow-auto bg-white h-lvh">
        <MenuSelection selectedItem={selectedItem} />
        {renderContent()}
      </main>
    </div>
  );
}
