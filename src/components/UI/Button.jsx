export default function Button({ children, onClick, type = 'button', className = '', variant = 'primary', ...props }) {
  const baseStyle = "px-10 py-4 font-bold rounded-lg transition-all duration-500 font-cairo shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-blue-light/50 tracking-wide uppercase";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-blue to-brand-blue-light text-white shadow-[0_4px_20px_rgba(0,86,179,0.4)] hover:shadow-[0_8px_30px_rgba(0,170,255,0.6)] hover:-translate-y-1",
    outline: "bg-transparent border-2 border-gray-600 text-white hover:border-gray-300 hover:bg-white/5 backdrop-blur-sm",
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}