import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {

      const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password}, {withCredentials: true});

      dispatch(addUser(res.data.data))
      return navigate("/profile")

    } catch (err) {
      console.log(err)
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center my-10 ">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="text-center mb-4 text-2xl">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>
          <div>
            <fieldset className="fieldset gap-4">
              {!isLoginForm && (
                <>
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
                </>
              )}

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
            <button onClick={isLoginForm ? handleLogin : handleSignUp} className="btn btn-primary">
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="text-xs text-white/80 cursor-pointer mt-4" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "New User? Signup Here" : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
