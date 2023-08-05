import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  function registerUser(ev){
    ev.preventDefault();
    axios.post("/register", {username, password, email})
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64 ">
        <h1 className="text-4xl text-center mb-4 ">Register</h1>
        <form className="max-w-md  mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2  text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
