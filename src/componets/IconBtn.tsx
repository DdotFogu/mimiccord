import { motion } from "motion/react";

type BtnProps = {
  svg: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  className?: string;
};

export const IconBtn = ({ svg, className }: BtnProps) => {
  return (
    <motion.span
      initial={{ backgroundColor: "#484b5000" }}
      whileHover={{ backgroundColor: "#484b50", transition: { duration: 0.1 } }}
      className={`min-w-8 min-h-8 flex justify-center items-center rounded-lg ${className}`}
    >
      {svg}
    </motion.span>
  );
};

export default IconBtn;
