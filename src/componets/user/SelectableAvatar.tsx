import Avatar from "./Avatar.tsx";

type AvatarProps = {
  size?: number;
  pfp: string;
  title?: string;
  htmlFor?: string;
  onClick?: () => void;
};

export const SelectableAvatar = ({
  size,
  pfp,
  title,
  htmlFor,
  onClick,
}: AvatarProps) => {
  return (
    <label
      onClick={() => (onClick ? onClick() : {})}
      htmlFor={htmlFor}
      className="cursor-pointer group relative"
    >
      <Avatar size={size} pfp={pfp} />
      <span className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
        {title}
      </span>
    </label>
  );
};

export default SelectableAvatar;
