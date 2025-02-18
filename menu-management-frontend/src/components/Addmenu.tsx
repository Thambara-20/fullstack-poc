"use client";

interface AddMenuComponentProps {
  menuName: string;
  setMenuName: (value: string) => void;
  parentId: string | null;
  handleAddMenu: () => void;
}

const AddMenuComponent: React.FC<AddMenuComponentProps> = ({
  menuName,
  setMenuName,
  parentId,
  handleAddMenu,
}) => (
  <div className="flex gap-2">
    <input
      type="text"
      value={menuName}
      onChange={(e) => setMenuName(e.target.value)}
      placeholder={parentId ? "New Submenu Name" : "New Menu Name"}
      className="border p-2 flex-1 rounded"
    />
    <button
      onClick={handleAddMenu}
      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
    >
      Add {parentId ? "Submenu" : "Menu"}
    </button>
  </div>
);

export default AddMenuComponent;
