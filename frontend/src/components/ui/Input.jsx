





export const Input = ({ label, error, className, rightIcon, ...props }) => {
    return (
        <div className="w-full flex flex-col text-start gap-auto">
            {label && <label className="block mb-1 font-medium">{label}</label>}

            <div className="relative">
                <input
                    className={`w-full p-[10px] rounded-md border 
                        ${error ? "border-red-500" : "border-gray-300"}
                        bg-white text-black
                        focus:outline-none focus:border-blue-500
                        ${className}`}
                    {...props}
                />

                {rightIcon && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200">
                        {rightIcon}
                    </span>
                )}

                {error && (
                    <p className="mt-1 text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}