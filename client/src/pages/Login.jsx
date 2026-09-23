import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const [loginData , setLoginData] = useState({
    login : "",
    password :""
  })
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()

    const response = await fetch("http://localhost:3000/api/auth/login",{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({
        login : loginData.login,
        password : loginData.password
      })
    })
    const data = await response.json()
    if (response.ok) {
      alert(data.message);
      localStorage.setItem("token",data.token)
      navigate("/")
    } else {
      alert(data.message);
    }
  }


  return (
    <div className="min-h-screen bg-[#08090D] text-white">

      <main className="flex min-h-screen items-center justify-center px-6">

        <div className="w-full max-w-[420px]">

          {/* Login heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">
              LOGIN
            </h1>
            <div className="mt-3 h-[2px] w-10 bg-orange-500" />
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Username / Email */}
            <div>
              <label
                htmlFor="login"
                className="mb-2 block text-sm font-medium text-white/60"
              >
                Username or Email
              </label>

              <input  id="login"  type="text"  placeholder="Enter your username or email" value={loginData.login} onChange={handleChange}
                className="w-full border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500/70 focus:bg-white/[0.05]" />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/60"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-white/35 transition hover:text-orange-400"
                >
                  Forgot password?
                </Link>
              </div>

              <input  id="password"  type="password"  placeholder="Enter your password" value={loginData.password} onChange={handleChange}
                className="w-full border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500/70 focus:bg-white/[0.05]"/>
            </div>

            {/* Login button */}
            <button type="submit"
              className="mt-2 w-full bg-orange-500 py-3.5 text-sm font-semibold text-black transition duration-200 hover:bg-orange-400 active:scale-[0.99]">
              LOGIN
            </button>

          </form>

          {/* Register */}
          <div className="mt-8 text-center text-sm">
            <span className="text-white/35">
              Don't have an account?
            </span>

            <Link
              to="/register"
              className="ml-2 font-medium text-orange-400 transition hover:text-orange-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;