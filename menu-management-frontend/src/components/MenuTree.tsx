"use client";

import { ChevronDown, ChevronRight, Plus, Trash } from "lucide-react";
import type { Menu } from "../app/types/menu";

interface MenuTreeProps {
  item: Menu;
  depth?: number;
  expandedItems: Set<string>;
  toggleItem: (id: string) => void;
  onAddClick?: (parentId: string) => void;
  onEditClick?: (menu: Menu) => void;
  onDeleteClick?: (id: string) => void;
  onClick?: (id: string) => void;
}

export function MenuTree({
  item,
  depth = 0,
  expandedItems,
  toggleItem,
  onAddClick,
  onEditClick,
  onDeleteClick,
  onClick,
}: MenuTreeProps) {
  const isExpanded = expandedItems.has(item.id);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="relative">
      <div
        className={`group flex items-center gap-2 cursor-pointer py-1.5 hover:bg-gray-50 rounded px-2 ${
          depth === 0 ? "font-medium" : ""
        }`}
        onClick={() => {
          hasChildren && toggleItem(item.id);
          onClick?.(item.id);
        }}
      >
        {hasChildren && (
          <span className="text-gray-400">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
        <span
          className="text-gray-900"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick?.(item);
          }}
        >
          {item.name}
        </span>
        {/* Button container visible only on hover */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onAddClick?.(item.id);
            }}
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white p-1 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick?.(item.id);
            }}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="ml-3 pl-4 border-l border-gray-200">
          {item.children?.map((child) => (
            <MenuTree
              key={child.id}
              item={child}
              depth={depth + 1}
              expandedItems={expandedItems}
              toggleItem={toggleItem}
              onAddClick={onAddClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
