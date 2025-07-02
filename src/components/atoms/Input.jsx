import { forwardRef } from "react";
import ApperIcon from "@/components/ApperIcon";

const Input = forwardRef(({ 
  label, 
  error, 
  icon, 
  type = "text", 
  className = "",
  containerClassName = "",
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-4 py-3 border border-gray-200 rounded-lg 
    focus:ring-2 focus:ring-primary-500 focus:border-primary-500 
    transition-colors duration-200 placeholder-gray-400
    ${icon ? 'pl-11' : ''}
    ${error ? 'border-error focus:ring-error focus:border-error' : ''}
    ${className}
  `;

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="w-5 h-5 text-gray-400" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;