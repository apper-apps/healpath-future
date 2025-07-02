import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "left",
  disabled = false,
  loading = false,
  className = "",
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "btn-primary focus:ring-primary-500",
    secondary: "btn-secondary focus:ring-secondary-500",
    accent: "btn-accent focus:ring-accent-500",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} ${className}`;

  const iconComponent = loading ? (
    <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
  ) : icon ? (
    <ApperIcon name={icon} className="w-4 h-4" />
  ) : null;

  return (
    <motion.button
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {iconComponent && iconPosition === "left" && (
        <span className={children ? "mr-2" : ""}>{iconComponent}</span>
      )}
      {loading ? "Loading..." : children}
      {iconComponent && iconPosition === "right" && (
        <span className={children ? "ml-2" : ""}>{iconComponent}</span>
      )}
    </motion.button>
  );
};

export default Button;