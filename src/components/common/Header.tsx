import { Plus } from "lucide-react";

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex justify-between px-6 py-4 
                 text-white mix-blend-difference pointer-events-none"
    >
      {/* Note: We use pointer-events-none on the header and pointer-events-auto 
          on children so the header doesn't block clicks on the page, 
          but the menu remains clickable.
      */}

      <h2 className="uppercase text-base font-semibold tracking-wider pointer-events-auto cursor-pointer">
        Inversa
      </h2>

      <div className="flex gap-2 items-center text-base font-medium tracking-wider pointer-events-auto cursor-pointer group">
        <span>Menu</span>
        <Plus
          size={20}
          className="transition-transform group-hover:rotate-90"
        />
      </div>
    </header>
  );
};

export default Header;
