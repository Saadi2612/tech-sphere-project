import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterStyle.css";
import Home from "../Home";
import { useAuth } from "../ContextAuth/Auth";
import { Link, useNavigate,useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
function Login() {
  //states for email,phone , name , password
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  //display data of user using Auth fron context API
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error("There is an toast  error");
      }
    } catch (error) {
      console.log(error);
      toast.error("There is an undefined  error");
    }
  };

  return (
    <div>
      <div>
        <Header />
      </div>
      <div class="get2">
        <div className="containerss">
          <h2>Buyer Login </h2>
          <form onSubmit={handleSubmit}>
            <div></div>

            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                required
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div>
              <input
                class="input1"
                value={password}
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button
              class="w-full px-12 py-2 flex justify-center rounded-lg text-gray-50 font-normal tracking-wide bg-[#6441a5] hover:scale-105 ease-in duration-200"
              type="submit"
            >
              Login
            </button>
            <span>
              <Link to="/ForgotPassword"> Forgot Password?</Link>
            </span>

            <span>
              Don't have an account? <Link to="/Register"> Sign up</Link>
            </span>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default Login;
