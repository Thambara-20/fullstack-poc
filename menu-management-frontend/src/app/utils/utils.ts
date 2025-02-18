import { Menu } from "../types/menu";

const buildTree = (menus: Menu[]): Menu[] => {
  const menuMap: Record<string, Menu> = {};
  menus.forEach((menu) => (menuMap[menu.id] = { ...menu, children: [] }));
  const tree: Menu[] = [];
  menus.forEach((menu) => {
    if (menu.parentId) {
      menuMap[menu.parentId]?.children?.push(menuMap[menu.id]);
    } else {
      tree.push(menuMap[menu.id]);
    }
  });
  return tree;
};

const getAllMenuIds = (menus: Menu[]): string[] => {
  let ids: string[] = [];
  menus.forEach((menu) => {
    ids.push(menu.id);
    if (menu.children && menu.children.length > 0) {
      ids = ids.concat(getAllMenuIds(menu.children));
    }
  });
  return ids;
};

export { getAllMenuIds, buildTree };
