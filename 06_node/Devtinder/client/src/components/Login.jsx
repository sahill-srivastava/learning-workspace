import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {

      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      return navigate("/");

    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong")
    }
  };

  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="text-center mb-4 text-2xl">Login</h2>
          <div>
            <fieldset className="fieldset gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Id</label>
                <input
                  id="text"
                  value={emailId}
                  type="text"
                  className="input"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="text"
                  value={password}
                  type="text"
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-5">
            <button onClick={handleLogin} className="btn btn-primary">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
