'use client';
interface ButtonProps {
  children?: React.ReactNode;
  onClick?: (e: any) => void;
  disable?: boolean;
  error?: string | null;
  icon?: any;
  type?: any;
  bgColor?: 'red' | 'gray' | 'green';
}

const Button = ({
  children,
  onClick,
  disable = true,
  error,
  type,
  icon,
  bgColor,
  ...props
}: ButtonProps) => {
  const colorClasses = () => {
    if (!disable) {
      return 'bg-gray-400 cursor-not-allowed';
    } else if (error) {
      return 'bg-red-500 hover:bg-red-600';
    } else if (bgColor === 'gray') {
      return 'bg-gray-400 hover:bg-gray-500';
    } else if (bgColor === 'green') {
      return 'bg-bs-success hover:bg-hover-success';
    } else if (bgColor === 'red') {
      return 'bg-red-500 hover:bg-red-600';
    }
    return 'bg-indigo-600 hover:bg-indigo-700';
  };

  const Icon = icon;
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={!disable}
      {...props}
      className={`w-full text-sm text-nowrap px-3 py-2 text-white flex items-center gap-2 justify-center capitalize rounded-sm transition-colors 
            ${colorClasses()} 
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
