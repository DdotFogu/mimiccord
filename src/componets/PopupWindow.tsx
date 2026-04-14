import { motion  } from "motion/react"

type WindowProps = {
    children?: any,
    width?: number,
    height?: number,
    title?: string,
    subtitle?: string,
    close?: () => void,
}

type HeaderProps = {
    title?: string,
    subtitle?: string,
    close?: () => void
}

type CloseProps = {
    close?: () => void
}

const PopupClose = ({ 
    close 
}: CloseProps) => {
    return(
        <button
        className="
        fill-mist
        cursor-pointer
        duration-200
        hover:fill-white
        ml-auto
        "
        onClick={() => close()}
        >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            height="28px" 
            width="28px" 
            viewBox="0 -960 960 960" 
            >
                <path d="m351.83-277.74-74.09-74.09L405.35-480 277.74-607.17l74.09-74.09L480-553.65l127.17-127.61 74.09 74.09L553.65-480l127.61 128.17-74.09 74.09L480-405.35 351.83-277.74Z"/>
            </svg>
        </button>
    );
}

const PopupHeader = ({ 
    title,
    subtitle,
    close,
}: HeaderProps) => {
    return(
        <div
        className="
        w-full
        h-fit
        bg-darkermist
        py-3
        px-8
        rounded-md
        flex
        flex-row
        items-center
        justify-center
        "
        >
            <span
            className="
            font-bold
            text-white
            mr-auto
            "
            >
                { title }
            </span>

            <span
            className="
            font-semibold
            text-mist
            hidden 
            sm:block
            "
            >
                { subtitle }
            </span>
            
            <PopupClose 
            close={ close }
            />
        </div>
    )
}

export const PopupWindow = ({ 
    children,
    width = 50, 
    height = 75,
    title = "Window",
    subtitle = "",
    close = () => {}
}:WindowProps) => {
    return(
        <motion.span
            initial={{ 
                scale: 0.8
            }}
            animate={{
                scale: 1,
                transition:{duration: 0.25}
            }}
            exit={{
                scale: 0.8,
                transition:{duration: 0.25}
            }}

            className="
            bg-darkmist 
            text-white
            rounded-2xl
            flex
            flex-row
            "
            style={{
            width: `${ width }vw`,
            height: `${ height }vh`
            }}
        >
            <PopupHeader 
            title={ title }
            subtitle={ subtitle }
            close={ close }
            />
            
            { children }
        </motion.span>
    );
}

export default PopupWindow;