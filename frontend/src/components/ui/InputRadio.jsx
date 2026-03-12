import { forwardRef } from "react";


export const InputRadio = forwardRef(({ label, type="radio", value, error, className, ...props }, ref) => {

    return (
        <div className="space-y-1">
            <label className="flex gap-[6px] cursor-pointer items-center">
                <input type={type} value={value} ref={ref} {...props} 
                    className={`w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 ${className}`}
                />
                <span className="text-sm text-gray-700">{label}</span>
            </label>

            {error && (
                <p className="text-xs text-red-500">{error}</p>
            )}
        </div>
    );
});