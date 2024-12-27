function Avatar({ user }) {
  return (
    <div className="flex gap-5 items-center">
      <img
        className="bg-slate-300 rounded-full
        "
        src={user.photoURL}
        alt="img"
      />
      <p className="text-2xl  font-bold ">{user.displayName}</p>
    </div>
  );
}

export default Avatar;
