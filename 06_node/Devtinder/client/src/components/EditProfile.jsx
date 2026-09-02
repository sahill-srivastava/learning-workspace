import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const handleEditProfile = async () => {
    setSuccessMsg("");
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          photoUrl,
          about,
          gender,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data));
      setSuccessMsg(res?.data?.message);
      setShowSuccessMsg(true);
      setTimeout(() => {
        setShowSuccessMsg(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data);
    }
  };

  return (
    <div className="flex gap-4 justify-center my-10">
      <div>
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="text-center mb-4 text-2xl">Edit Profile</h2>

            <div>
              <fieldset className="fieldset gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email">PhotoUrl</label>
                  <input
                    id="text"
                    value={photoUrl}
                    type="text"
                    className="input"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">First Name</label>
                  <input
                    id="text"
                    value={firstName}
                    type="text"
                    className="input"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Last Name</label>
                  <input
                    id="text"
                    value={lastName}
                    type="text"
                    className="input"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Age</label>
                  <input
                    id="text"
                    value={age}
                    type="text"
                    className="input"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Gender</label>
                  <input
                    id="text"
                    value={gender}
                    type="text"
                    className="input"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">About</label>
                  <input
                    id="text"
                    value={about}
                    type="text"
                    className="input"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>
              </fieldset>
            </div>
            {showSuccessMsg && <p className="text-green-600">{successMsg}</p>}
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center mt-5">
              <button onClick={handleEditProfile} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ photoUrl, firstName, lastName, age, gender, about }} />
    </div>
  );
};

export default EditProfile;
