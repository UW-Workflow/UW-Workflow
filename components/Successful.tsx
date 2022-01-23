const Successful = ({ header, message }) => {
  return (
    //Your logged in page
    <div className="min-w-400">
      <div className="mt-3 grid grid-cols-1 gap-2 justify-items-center">
        <img src="/Vector.svg" className="self-center" />
        <h2 className="text-xl font-bold text-center text-black">{header}</h2>
        <p className="mt-2 text-xs text-gray-600 text-center">{message}</p>
      </div>
    </div>
  );
};

export default Successful;
