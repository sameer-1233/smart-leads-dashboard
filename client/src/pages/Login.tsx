import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {
  FaLock,
  FaEnvelope,
} from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        https://smart-leads-dashboard-s2d3.onrender.com/api/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex-col justify-center items-center p-12">

        <h1 className="text-5xl font-bold mb-6">
          Smart Leads CRM
        </h1>

        <p className="text-xl text-center leading-9 text-blue-100">

          Manage your leads, customers,
          and sales professionally with
          a modern CRM dashboard.

        </p>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex justify-center items-center bg-gray-100">

        <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl">

          <h2 className="text-4xl font-bold text-center text-gray-800 mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Login to continue
          </p>

          {/* EMAIL */}

          <div className="mb-5">

            <label className="block mb-2 font-medium">
              Email
            </label>

            <div className="flex items-center border rounded-xl px-4">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full p-4 outline-none rounded-xl"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mb-8">

            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4">

              <FaLock className="text-gray-400" />

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full p-4 outline-none rounded-xl"
              />

            </div>

          </div>

          {/* BUTTON */}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white p-4 rounded-xl text-lg font-semibold shadow-lg"
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
}

export default Login;