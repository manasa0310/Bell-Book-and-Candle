const ToggleButton = ({ isPhysical, toggleCopyType }) => {
  return (
    <div
      className="relative  w-24 h-10 flex-shrink-0  bg-gray-200 rounded-full cursor-pointer select-none"
      onClick={toggleCopyType}>
      {/* Background for the Toggle Switch */}
      <div
        className={`absolute left-0.5 right-0.5 top-0.5 bottom-0.5 rounded-full transition-all duration-300 ease-in-out ${
          isPhysical ? 'bg-[#395e8f]' : 'bg-[#395e8f]'
        }`}>
        {/* Text */}
      </div>

      {/* Toggle Circle */}
      <div
        className={`absolute w-8 h-8 bg-white rounded-full shadow top-1 transform transition duration-300 ease-in-out ${
          isPhysical ? 'translate-x-[60px]' : 'translate-x-1'
        }`}></div>
    </div>
  );
};

export default ToggleButton;
