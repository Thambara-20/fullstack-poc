import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Menu } from "../app/types/menu";

// 1) Get all menus
export const fetchMenus = createAsyncThunk("menu/fetchMenus", async () => {
  const res = await axios.get("/api/menus"); // calls Next route, which calls NestJS
  return res.data as Menu[];
});

// 2) Get specific menu
export const fetchMenuById = createAsyncThunk(
  "menu/fetchMenuById",
  async (id: string) => {
    const res = await axios.get(`/api/menus/${id}`);
    return res.data as Menu;
  }
);

// 4) Add item hierarchically
export const addMenu = createAsyncThunk(
  "menu/addMenu",
  async (menuData: Partial<Menu>) => {
    const res = await axios.post("/api/menus", menuData);
    return res.data as Menu;
  }
);

// 5) Update item
export const updateMenu = createAsyncThunk(
  "menu/updateMenu",
  async ({ id, data }: { id: string; data: Partial<Menu> }) => {
    const res = await axios.put(`/api/menus/${id}`, data);
    return res.data as Menu;
  }
);

// 6) Delete item
export const removeMenu = createAsyncThunk(
  "menu/removeMenu",
  async (id: string) => {
    await axios.delete(`/api/menus/${id}`);
    return id;
  }
);

interface MenuState {
  menus: Menu[];
  currentMenu: Menu | null;
}

const initialState: MenuState = {
  menus: [],
  currentMenu: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    // 7) Save menu can be considered an 'updateMenu' or a local action
  },
  extraReducers: (builder) => {
    // GET MENUS
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.menus = action.payload;
    });

    // GET SPECIFIC MENU
    builder.addCase(fetchMenuById.fulfilled, (state, action) => {
      state.currentMenu = action.payload;
    });

    // CREATE MENU
    builder.addCase(addMenu.fulfilled, (state, action) => {
      state.menus.push(action.payload);
    });

    // UPDATE MENU
    builder.addCase(updateMenu.fulfilled, (state, action) => {
      const updated = action.payload;
      // recursively update in menus
      function updateRecursively(list: Menu[]): Menu[] {
        return list.map((m) => {
          if (m.id === updated.id) {
            return updated;
          }
          if (m.children) {
            return { ...m, children: updateRecursively(m.children) };
          }
          return m;
        });
      }
      state.menus = updateRecursively(state.menus);
    });

    // DELETE MENU
    builder.addCase(removeMenu.fulfilled, (state, action) => {
      const id = action.payload;
      // recursively remove from menus
      function removeRecursively(list: Menu[]): Menu[] {
        return list
          .filter((m) => m.id !== id)
          .map((m) => {
            if (m.children) {
              m.children = removeRecursively(m.children);
            }
            return m;
          });
      }
      state.menus = removeRecursively(state.menus);
      // reset currentMenu if needed
      if (state.currentMenu && state.currentMenu.id === id) {
        state.currentMenu = null;
      }
    });
  },
});

export default menuSlice.reducer;
