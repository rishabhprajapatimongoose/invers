type NotchedButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const NotchedButton = ({
  children,
  onClick,
  className,
}: NotchedButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer
        ${className || "bg-black text-white"}
        notched-btn
        rounded-sm  
        relative overflow-hidden
        px-5 py-3
        font-jetbrains text-sm uppercase
      `}
    >
      {children}
    </button>
  );
};

export default NotchedButton;
