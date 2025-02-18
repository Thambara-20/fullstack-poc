import Image from "next/image";

interface MenuItem {
  label: string;
  uiImage: string;
}

interface MenuSelectionProps {
  selectedItem: MenuItem;
}

const MenuSelection: React.FC<MenuSelectionProps> = ({ selectedItem }) => {
  return (
    <div>
      {/* Folder Path */}
      <div className="flex items-center gap-2 text-gray-800 text-sm mb-6">
        <Image src="/icons/folder.png" alt="Folder" width={20} height={20} />
        <span>/ {selectedItem.label}</span>
      </div>

      {/* Selected Item */}
      <div className="flex items-center gap-2 mt-4 p-2 rounded-lg">
        <img
          src={selectedItem.uiImage}
          alt={selectedItem.label}
          width={40}
          height={40}
          className="rounded"
        />
        <h1 className="text-2xl font-bold text-black font-sans">
          {selectedItem.label}
        </h1>
      </div>
    </div>
  );
};

export default MenuSelection;
