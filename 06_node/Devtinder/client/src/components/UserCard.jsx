import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const {_id, photoUrl, firstName, lastName, age, about, gender } = user;

  const handleSendRequest = async (status, userId) => {
    try {

      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials: true})
      dispatch(removeUserFeed(userId))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt={firstName + " pic"} className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions gap-4 mt-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          <button className="btn btn-error text-white" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
