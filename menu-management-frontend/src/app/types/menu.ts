export interface Menu {
  id: string;
  name: string;
  parentId?: string | null;
  children?: Menu[];
}
