import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RegisterStyle.css";
import Home from "../Home";
import { useAuth } from "../ContextAuth/Auth";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function ForgotPassword() {
  //states for email,phone , name , password
  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [phone, setphone] = useState("");

  //display data of user using Auth fron context API
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/forgot-password",
        {
          email,
          newpassword,
          phone,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/Login");
      } else {
        toast.error("There is an error");
      }
    } catch (error) {
      console.log(error);
      toast.error("There is an error");
    }
  };

  return (
    <div>
      <div class="get2">
        <div className="containerss">
          <h2>Reset Password </h2>
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
            <input
              class="input1"
              value={phone}
              type="text"
              placeholder="Enter your phone number"
              required
              onChange={(e) => setphone(e.target.value)}
            />

            <div>
              <input
                class="input1"
                value={newpassword}
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setnewpassword(e.target.value)}
              />
            </div>

            <button class="button1" type="submit">
              Submit
            </button>

            <span>
              Already Login? <Link to="/Login"> Sign up</Link>
            </span>
          </form>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
