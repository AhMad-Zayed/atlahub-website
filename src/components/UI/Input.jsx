export default function Input({ label, id, type = 'text', placeholder, required = false, className = '', ...props }) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-gray-200 font-semibold font-cairo text-sm uppercase tracking-wide">
          {label} {required && <span className="text-brand-blue-light">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-brand-blue-light focus:border-brand-blue outline-none transition-all font-tajawal shadow-sm"
        {...props}
      />
    </div>
  );
}