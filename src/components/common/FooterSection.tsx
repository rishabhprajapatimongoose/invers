import DecryptedText from "./DecryptedText";

const FooterSection = ({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative p-8 md:p-12  flex flex-col gap-8 md:gap-12 ${className}`}
  >
    <DecryptedText
      text={title}
      className="uppercase font-jetbrains text-lg md:text-xl text-zinc-400"
      encryptedClassName="uppercase font-jetbrains text-lg md:text-xl text-zinc-400"
      speed={100}
      animateOn="view"
    />

    {children}
  </div>
);
export default FooterSection;
