import { AnimatePresence, motion } from "motion/react";

type Props = {
  children?: any;
  enabled: boolean;
};

export const Popup = ({ children, enabled }: Props) => {
  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.25 } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          className="w-full h-full fixed inset-0 flex flex-col justify-center items-center z-10 bg-transvoid"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
