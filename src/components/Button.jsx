const Button = ({ className, onClick, type = "button", text, style }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={`relative inline-block py-2 text-[15px] font-semibold uppercase cursor-pointer primary-gradient border-none transform -skew-x-[21deg] transition-all duration-500 hover:text-white 
      before:absolute before:top-0 before:bottom-0 before:left-0 before:right-full before:card-gradient before:opacity-0 before:z-[-1] before:transition-all before:duration-500 
      hover:before:right-0 hover:before:opacity-100 ${className}`}
    >
      <span className="inline-block skew-x-[21deg]">{text}</span>
    </button>
  );
};

export default Button;
