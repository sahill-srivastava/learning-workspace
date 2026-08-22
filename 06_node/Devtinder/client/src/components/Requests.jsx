import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1>No requests Found</h1>;

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="mb-10 text-bold text-4xl">Requests</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div className="bg-base-300 p-5 rounded-2xl flex gap-2.5" key={_id}>
              <div>
                <img
                  className="w-20 rounded-lg"
                  src={photoUrl}
                  alt={firstName + " image"}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h2>{firstName + " " + lastName}</h2>
                <p className="text-xs">{age + " " + gender}</p>
                <p>{about}</p>
                <div className="mt-4 flex gap-4">
                  <button className="btn btn-primary">Accept</button>
                  <button className="btn btn-secondary">Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
