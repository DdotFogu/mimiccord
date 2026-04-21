import { motion } from "motion/react";

type BtnProps = {
  svg: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  className?: string;
  onClick?: () => void;
};

export const IconBtn = ({ svg, className, onClick }: BtnProps) => {
  return (
    <button
      className={`${className}`}
      onClick={() => (onClick ? onClick() : {})}
    >
      <motion.span
        initial={{ backgroundColor: "#484b5000" }}
        whileHover={{
          backgroundColor: "#484b50",
          transition: { duration: 0.1 },
        }}
        className={`min-w-8 min-h-8 flex justify-center items-center rounded-lg`}
      >
        {svg}
      </motion.span>
    </button>
  );
};

export default IconBtn;
