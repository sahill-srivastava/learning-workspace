import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="mb-10 text-bold text-4xl">Connections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              className="bg-base-300 p-5 rounded-2xl flex gap-2.5"
              key={_id}
            >
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
