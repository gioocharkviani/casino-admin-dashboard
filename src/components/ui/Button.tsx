'use client';
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disable?: boolean;
  error?: string | null;
  icon?: any;
}

const Button = ({
  children,
  onClick,
  disable = true,
  error,
  icon,
  ...rest
}: ButtonProps) => {
  const Icon = icon;
  return (
    <button
      onClick={onClick}
      disabled={!disable}
      {...rest}
      className={`w-full text-sm px-3 py-2 text-white flex items-center gap-2 justify-center capitalize rounded-sm transition-colors 
            ${
              !disable
                ? 'bg-gray-400 cursor-not-allowed'
                : error
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-indigo-600 hover:bg-indigo-700'
            } 
            focus:outline-none focus:ring-2 ${
              error ? 'focus:ring-red-500' : 'focus:ring-indigo-500'
            }`}
    >
      {icon && <Icon />}
      {children}
    </button>
  );
};

export default Button;
