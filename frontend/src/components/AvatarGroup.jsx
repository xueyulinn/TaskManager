const AvatarGroup = ({ maxVisible, avatars }) => {
  return (
    <div className=" flex items-center ">
      {avatars.slice(0, maxVisible).map((curAvatar, index) => (
        <img
          src={curAvatar}
          key={index}
          alt={`Avatar ${index}`}
          className="h-10 w-10 rounded-full border-2 border-white"
        />
      ))}
      {avatars.length > maxVisible && (
        <div className=" text-sm md:text-base font-medium ml-2 text-slate-500">{`${
          avatars.length - maxVisible
        }+`}</div>
      )}
    </div>
  );
};

export default AvatarGroup;
