import clsx from 'clsx';
import type { MouseEvent, ReactElement, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps {
	variant?: ButtonVariant;
	children: ReactNode;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	type?: ButtonType;
	className?: string;
}

const baseButtonClassNames =
	'px-4 py-2 rounded-lg font-medium transition-colors';

const variantButtonClassNames: Record<ButtonVariant, string> = {
	primary: 'bg-blue-600 text-white',
	secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
};

const getButtonClassNames = (
	variant: ButtonVariant,
	className?: string,
	disabled?: boolean
): string => {
	return clsx(
		baseButtonClassNames,
		variantButtonClassNames[variant],
		{
			'opacity-50 cursor-not-allowed': disabled,
		},
		className
	);
};

export function Button({
	children,
	type = 'button',
	variant = 'secondary',
	className,
	disabled,
	onClick,
}: ButtonProps): ReactElement {
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		if (!disabled) {
			onClick?.(event);
		}
	};

	return (
		<button
			type={type}
			disabled={disabled}
			aria-disabled={disabled || undefined}
			onClick={handleClick}
			className={getButtonClassNames(variant, className, disabled)}
		>
			{children}
		</button>
	);
}
