export const ButtonLoader = () => {
  return (
    <div className="relative">
      <div className="w-6 h-6 rounded-full absolute border-2 border-solid border-gray-200 -top-[12px]"></div>
      <div className="w-6 h-6 rounded-full animate-spin absolute border-2 border-solid border-blue-500 border-t-transparent border-l-transparent shadow-md -top-[12px]"></div>
    </div>
  );
};
