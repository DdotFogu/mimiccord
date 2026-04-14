import { motion, AnimatePresence } from "motion/react";

type Props = {
    children?: any
    enabled: boolean
}

export const Popup = ( { children, enabled }:Props ) => {
    return(
        <AnimatePresence>
            { enabled && (
            <motion.div
            initial={{
                opacity:0
            }}
            animate={{
                opacity:100,
                transition:{duration:0.25}
            }}
            exit={{
                opacity:0,
                transition:{duration:0.25}
            }}

            className="
            w-full
            h-full
            bg-transvoid
            fixed
            inset-0
            flex
            flex-col
            justify-center
            items-center
            z-10
            "
            >
                { children }
            </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Popup;