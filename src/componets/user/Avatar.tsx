type AvatarProps = {
  size?: number;
  pfp: string;
  alt?: string;
};

export const Avatar = ({
  size = 40,
  pfp,
  alt = "user submitted avatar picture",
}: AvatarProps) => {
  return (
    <img
      className="rounded-full object-cover"
      style={{ width: size, height: size, minWidth: size }}
      src={pfp}
      alt={alt}
    />
  );
};

export default Avatar;
