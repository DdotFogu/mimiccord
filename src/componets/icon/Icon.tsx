import { motion } from "motion/react";

const Delete = ({ size, className }: IconProps): React.ReactElement => {
  return (
    <motion.svg
      initial={{ fill: "#9D9EA5" }}
      whileHover={{ fill: "#FF746C", transition: { duration: 0.25 } }}
      className={`fill-mist ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
    </motion.svg>
  );
};

const Edit = ({ size, className }: IconProps): React.ReactElement => {
  return (
    <motion.svg
      initial={{ fill: "#9D9EA5" }}
      whileHover={{ fill: "#FFFFFF", transition: { duration: 0.25 } }}
      className={`fill-mist ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 -960 960 960"
      width={size}
    >
      <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z" />
    </motion.svg>
  );
};

const Close = ({ size, className }: IconProps): React.ReactElement => {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      className={`fill-mist ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"></path>
    </svg>
  );
};

const Add = ({ size, className }: IconProps): React.ReactElement => {
  return (
    <svg
      className={`fill-mist ${className}`}
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
    >
      <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </svg>
  );
};

const Crown = ({ size, className }: IconProps): React.ReactElement => {
  return (
    <motion.svg
      initial={{ fill: "#9D9EA5" }}
      whileHover={{ fill: "#d78900", transition: { duration: 0.25 } }}
      className={`fill-mist ${className}`}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-describedby="«rbf»"
      aria-hidden="true"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      width={size}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M5 18a1 1 0 0 0-1 1 3 3 0 0 0 3 3h10a3 3 0 0 0 3-3 1 1 0 0 0-1-1H5ZM3.04 7.76a1 1 0 0 0-1.52 1.15l2.25 6.42a1 1 0 0 0 .94.67h14.55a1 1 0 0 0 .95-.71l1.94-6.45a1 1 0 0 0-1.55-1.1l-4.11 3-3.55-5.33.82-.82a.83.83 0 0 0 0-1.18l-1.17-1.17a.83.83 0 0 0-1.18 0l-1.17 1.17a.83.83 0 0 0 0 1.18l.82.82-3.61 5.42-4.41-3.07Z"></path>
    </motion.svg>
  );
};

type IconProps = {
  id: string;
  size?: number;
  className?: string;
};

const iconMap: Record<
  string,
  ({ size, className }: IconProps) => React.ReactElement
> = {
  "icon-delete": Delete,
  "icon-edit": Edit,
  "icon-close": Close,
  "icon-add": Add,
  "icon-crown": Crown,
};

// should be able to pass in animation props into icon <- GOOD IDEA DO THIS

const Icon = ({ id, size = 24, className }: IconProps) => {
  const IconComponent = iconMap[id];

  if (!IconComponent) {
    return (
      <svg width={size} height={size} className={className}>
        <use href={`#${id}`} />
      </svg>
    );
  }

  return <IconComponent id={id} size={size} className={className} />;
};

export default Icon;
