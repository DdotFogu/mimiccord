import { AnimatePresence, motion } from "motion/react";
import Icon from "../icon/Icon.tsx";

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

export default Popup;

export const PopupWindow = ({
  children,
  width = 50,
  height = 75,
  title = "Window",
  subtitle = "",
  close = () => {},
}: WindowProps) => {
  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1, transition: { duration: 0.25 } }}
      exit={{ scale: 0.8, transition: { duration: 0.25 } }}
      className="bg-darkmist text-white rounded-2xl flex flex-col"
      style={{
        width: `${width}vw`,
        height: `${height}vh`,
      }}
    >
      <PopupHeader title={title} subtitle={subtitle} close={close} />
      <span className="overflow-y-auto p-1">{children}</span>
    </motion.span>
  );
};

type WindowProps = {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  title?: string;
  subtitle?: string;
  close: () => void;
};

type HeaderProps = {
  title?: string;
  subtitle?: string;
  close: () => void;
};

type CloseProps = {
  close: () => void;
};

const PopupClose = ({ close }: CloseProps) => {
  return (
    <button className="cursor-pointer ml-auto" onClick={() => close()}>
      <Icon
        id="icon-close"
        size={24}
        className="duration-200 fill-mist hover:fill-white"
      />
    </button>
  );
};

const PopupHeader = ({ title, subtitle, close }: HeaderProps) => {
  return (
    <div className="relative w-full h-fit bg-darkermist py-3 px-8 rounded-t-md flex flex-row items-center justify-center">
      <span className="font-bold text-white mr-auto shrink-0">{title}</span>

      <span className="absolute left-1/2 -translate-x-1/2 font-semibold text-mist hidden sm:block truncate max-w-[40%]">
        {subtitle}
      </span>

      <PopupClose close={close} />
    </div>
  );
};
