const UserCard = ({user}) => {
    const {photoUrl, firstName, lastName, age, about, gender} = user;
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={photoUrl}
          alt={firstName + " pic"}
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>
          {about}
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
