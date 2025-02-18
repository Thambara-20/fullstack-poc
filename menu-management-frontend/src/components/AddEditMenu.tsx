import React from "react";
import type { Menu } from "../app/types/menu";

interface AddEditMenuProps {
  menu: Menu;
  menus?: Menu[];
  onChange: (updatedMenu: Menu) => void;
  onSave: () => void;
  mode: "add" | "edit";
}

// Utility function to calculate the menu depth.
const calculateDepth = (menu: Menu | null, menus?: Menu[]): number => {
  let depth = 0;
  let current = menu;
  while (current && current.parentId) {
    depth++;
    current = menus?.find((m) => m.id === current!.parentId) || null;
  }
  return depth;
};

const AddEditMenu: React.FC<AddEditMenuProps> = ({
  menu,
  menus,
  onChange,
  onSave,
  mode,
}) => {
  const parentName = menus?.find((m) => m.id === menu.parentId)?.name || "None";

  return (
    <div className="p-4 rounded w-full flex flex-col">
      <label className="block text-gray-400 mt-2">Menu ID</label>
      <input
        type="text"
        value={menu.id}
        readOnly
        className="border p-4 text-slate-800 w-full rounded-2xl bg-gray-100"
      />

      <label className="block text-gray-700 mt-2">Depth</label>
      <input
        type="text"
        value={calculateDepth(menu, menus)}
        readOnly
        className="border p-4 text-slate-800 w-1/2 rounded-2xl bg-gray-100"
      />

      <label className="block text-gray-700 mt-2">Parent Data</label>
      <input
        type="text"
        value={parentName}
        readOnly
        className="border p-4 text-slate-800 w-1/2 rounded-2xl bg-gray-100"
      />

      <label className="block text-gray-700 mt-2">Name</label>
      <input
        type="text"
        value={menu.name}
        onChange={(e) => onChange({ ...menu, name: e.target.value })}
        className="border p-4 text-slate-800 w-1/2 rounded-2xl"
      />

      <button
        onClick={onSave}
        className="mt-4 bg-blue-600 text-white p-4 rounded-full w-1/2"
      >
        {mode === "edit" ? "Save" : "Add"}
      </button>
    </div>
  );
};

export default AddEditMenu;
