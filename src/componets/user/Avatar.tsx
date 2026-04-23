type AvatarProps = {
  size?: number;
  pfp: string;
  alt?: string;
  className?: string;
};

export const Avatar = ({
  size = 40,
  pfp,
  alt = "user submitted avatar picture",
  className = "rounded-full object-cover",
}: AvatarProps) => {
  return (
    <img
      className={className}
      style={{ width: size, height: size, minWidth: size }}
      src={pfp}
      alt={alt}
    />
  );
};

export default Avatar;
