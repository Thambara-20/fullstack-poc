// app/page.tsx or components/Home.tsx
"use client";

import { useState } from "react";
import Sidebar, { SidebarItem, sidebarItems } from "@/components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import MenuManager from "./pages/Menus";
import MenuSelection from "@/components/MenuSelection";

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<SidebarItem>(
    sidebarItems[0]
  );

  console.log(selectedItem);

  const renderContent = () => {
    switch (selectedItem.label) {
      case "dashboard":
        return <Dashboard />;
      case "Menus":
        return <MenuManager />;
      case "Systems":
        return <Settings />;
      default:
        return <div>Select an option from the sidebar.</div>;
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
