import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmaiId] = useState("sahil@gmail.com");
  const [password, setPassword] = useState("Sahil@123");

  const handleLogin = async () => {
     try {

       const res = await axios.post("http://localhost:3000/login", {
          emailId, password
        })

        console.log(res)

     } catch (err) {
       console.log(err)
     }
  }


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
                  onChange={(e) => setEmaiId(e.target.value)}
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
          <div className="card-actions justify-center mt-5">
            <button
            onClick={handleLogin}
            className="btn btn-primary">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
