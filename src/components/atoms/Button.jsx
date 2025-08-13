import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-primary hover:shadow-lg hover:shadow-primary-500/25 text-white border-transparent hover:scale-[1.02]",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border-gray-200 hover:border-gray-300 hover:shadow-md",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent hover:text-gray-900",
    accent: "bg-gradient-accent hover:shadow-lg hover:shadow-accent-500/25 text-white border-transparent hover:scale-[1.02]",
    outline: "bg-transparent hover:bg-primary-50 text-primary-600 border-primary-200 hover:border-primary-300"
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  }

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button