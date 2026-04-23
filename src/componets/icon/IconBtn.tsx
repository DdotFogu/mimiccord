import { motion } from "motion/react";

type BtnProps = {
  svg: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  size?: number;
  className?: string;
  onClick?: () => void;
};

export const IconBtn = ({ svg, size = 32, className, onClick }: BtnProps) => {
  return (
    <button className={className} onClick={() => (onClick ? onClick() : {})}>
      <motion.span
        initial={{ backgroundColor: "#484b5000" }}
        whileHover={{
          backgroundColor: "#484b50",
          transition: { duration: 0.1 },
        }}
        style={{ minWidth: size, minHeight: size }}
        className="flex justify-center items-center rounded-lg"
      >
        {svg}
      </motion.span>
    </button>
  );
};

export default IconBtn;
