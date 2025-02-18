// components/MenuManager.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenus, addMenu, updateMenu, removeMenu } from "@/redux/menuSlice";
import type { Menu } from "../types/menu";
import { MenuTree } from "@/components/MenuTree";
import { AppDispatch } from "@/redux/store";
import { v4 as uuidv4 } from "uuid";
import { getAllMenuIds, buildTree } from "../utils/utils";
import AddEditMenu from "@/components/AddEditMenu";

export default function MenuManager() {
  const dispatch: AppDispatch = useDispatch();
  const menus = useSelector(
    (state: { menu: { menus: Menu[] } }) => state.menu.menus
  );

  const [expandedItems, setExpandedItems] = useState<Set<string>>(
    new Set(["1", "2", "3"])
  );
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [addMenuItem, setAddMenuItem] = useState<Menu | null>(null);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  const structuredMenus = buildTree(menus);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddMenu = () => {
    if (addMenuItem) {
      dispatch(
        addMenu({ name: addMenuItem.name, parentId: addMenuItem.parentId })
      );
      setAddMenuItem(null);
    }
  };

  const handleAddSubMenu = (parentMenuId: string) => {
    const newMenu: Menu = {
      parentId: parentMenuId,
      name: "",
      id: uuidv4(),
    };
    setAddMenuItem(newMenu);
    setSelectedMenu(null);
  };

  const handleEditClick = (menu: Menu) => {
    setSelectedMenu(menu);
    setAddMenuItem(null);
  };

  const handleSaveMenu = () => {
    if (selectedMenu) {
      dispatch(
        updateMenu({ id: selectedMenu.id, data: { name: selectedMenu.name } })
      );
      setSelectedMenu(null);
      dispatch(fetchMenus());
    }
  };

  const handleDeleteMenu = (id: string) => {
    dispatch(removeMenu(id));
    dispatch(fetchMenus());
  };

  const expandAll = () => {
    const allIds = getAllMenuIds(structuredMenus);
    setExpandedItems(new Set(allIds));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="scrollbar-hide overflow-y-auto h-5/6">
      <div>
        <label className="block text-gray-700 mt-4 text-sm">Menu</label>
        <select className="border p-3 w-1/3 rounded-2xl text-slate-800">
          {menus.map((menu, index) => (
            <option key={index}>{menu?.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 mt-4">
        {/* Menu Selection */}
        <button
          className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800"
          onClick={expandAll}
        >
          Expand All
        </button>
        <button
          className="border px-6 py-2 rounded-full text-slate-800 hover:bg-gray-100"
          onClick={collapseAll}
        >
          Collapse All
        </button>
      </div>

      <div className="flex flex-col md:flex-row w-full mt-6">
        <div className="bg-white p-4 rounded w-full md:w-1/2">
          {structuredMenus.map((menu) => (
            <MenuTree
              key={menu.id}
              item={menu}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
              onAddClick={handleAddSubMenu}
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteMenu}
              onClick={() => setSelectedMenu(menu)}
            />
          ))}
          {structuredMenus.length === 0 && (
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-gray-400 text-center">No menus found</p>
              <button
                onClick={() =>
                  setAddMenuItem({ id: uuidv4(), name: "", parentId: null })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-full"
              >
                Add +
              </button>
            </div>
          )}
        </div>

        {(selectedMenu || addMenuItem) && (
          <div className="p-1 rounded w-full md:w-1/2">
            <AddEditMenu
              menu={selectedMenu || (addMenuItem as Menu)}
              menus={menus}
              onChange={(updatedMenu: Menu) => {
                if (selectedMenu) {
                  setSelectedMenu(updatedMenu);
                } else if (addMenuItem) {
                  setAddMenuItem(updatedMenu);
                }
              }}
              onSave={selectedMenu ? handleSaveMenu : handleAddMenu}
              mode={selectedMenu ? "edit" : "add"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
