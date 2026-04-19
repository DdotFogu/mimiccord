type IconProps = {
  id: string;
  size?: number;
  className?: string;
};

const Icon = ({ id, size = 24, className }: IconProps) => (
  <svg width={size} height={size} className={className}>
    <use href={`#${id}`} />
  </svg>
);

export default Icon;
