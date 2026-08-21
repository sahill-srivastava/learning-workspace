const UserCard = ({user}) => {
    console.log("user: ", user)
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={user?.photoUrl}
          alt={user?.firstName + " pic"}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{user?.firstName + " " + user?.lastName}</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions gap-4 mt-4">
          <button className="btn btn-primary">Interested</button>
          <button className="btn btn-error text-white">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
