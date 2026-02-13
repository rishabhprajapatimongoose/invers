import { Plus } from "lucide-react";

type Props = {
  onMenuOpen: () => void;
};

const Header = ({ onMenuOpen }: Props) => {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 
                 flex justify-between px-6 py-4 
                 pointer-events-none"
    >
      <h2
        className="uppercase text-base font-semibold tracking-wider 
                   pointer-events-auto cursor-pointer 
                   text-white mix-blend-difference"
      >
        Inversa
      </h2>

      <div
        onClick={onMenuOpen}
        className="flex gap-2 items-center text-base 
                   font-medium tracking-wider 
                   pointer-events-auto cursor-pointer 
                   group text-white mix-blend-difference"
      >
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
