import React from "react";

type ButtonVariant = "main" | "gray" | "transparent";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	size?: ButtonSize;
	icon?: React.ReactNode;
	iconPosition?: "left" | "right";
	children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
	main: "bg-[#fff700] text-gray-900 hover:bg-yellow-400",
	gray: "bg-gray-200 text-gray-900 hover:bg-yellow-400",
	transparent: "bg-transparent text-gray-900",
};

const sizeClasses: Record<ButtonSize, string> = {
	xs: "text-xs",
	sm: "px-2 py-2 text-sm rounded-lg",
	md: "px-4 py-2 text-base rounded-md",
	lg: "px-6 py-3 text-lg rounded-lg",
	xl: "px-8 py-4 text-xl rounded-xl",
};

export const Button: React.FC<ButtonProps> = ({
	variant = "main",
	size = "md",
	icon,
	iconPosition = "left",
	children,
	className = "",
	...props
}) => {
	return (
		<button className={`group flex items-center justify-center gap-2 font-inter  transition duration-150 cursor-pointer ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
			{...props}
		>
			{icon && iconPosition === "left" && <span className="flex items-center">{icon}</span>}
			{children}
			{icon && iconPosition === "right" && <span className="flex items-center">{icon}</span>}
		</button>
	);
};
