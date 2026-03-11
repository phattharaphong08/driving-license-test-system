


export const Button = ({ variant = "submit", className, children, leftIcon, rightIcon, ...prop }) => {

    const variantClass = {
        submit: "bg-[#17B530] text-white hover:bg-[#B5E6BF] hover:text-[#17B530]",
        end: "bg-[#E53E3E] text-white hover:bg-[#FEB2B2] hover:text-[#E53E3E]",
    };

    return (

        <button
            {...prop}
            className={`${variantClass[variant] || ""} w-full p-[10px] border-none rounded-[6px] cursor-pointer ${className}`}
        >
            {leftIcon && <span className="flex items-center">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </button>
    )
}