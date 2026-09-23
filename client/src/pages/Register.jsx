import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:3000/api/auth/register",{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify({
        email : formData.email,
        username : formData.username,
        password : formData.password
      })
    })
    const data = await response.json()
    console.log(data)
  }
  return (
    <div className="min-h-screen bg-[#08090D] text-white">

      <main className="flex min-h-screen items-center justify-center px-6 pt-28 pb-16">

        <div className="relative w-full max-w-[430px]">

          {/* Small corner detail */}
          <div className="absolute -left-px -top-px h-10 w-10 border-l-2 border-t-2 border-orange-500" />

          <div className="border border-white/10 bg-[#0B0C10] px-8 py-10 sm:px-10">


            <div className="mb-9">
              <h1 className="text-3xl font-semibold tracking-tight"> CREATE ACCOUNT </h1>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium text-white/50">
                  Email
                </label>

                <input
                  id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange}
                  className="w-full border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500 focus:bg-white/[0.04]" />
              </div>

              {/* Username */}
              <div>
                <label htmlFor="username" className="mb-2 block text-xs font-medium text-white/50">
                  Username
                </label>

                <input value={formData.username} onChange={handleChange}
                  id="username" type="text" placeholder="Choose a username"
                  className="w-full border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500 focus:bg-white/[0.04]" />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-medium text-white/50">
                  Password
                </label>

                <input id="password" type="password" placeholder="Create a password" value={formData.password} onChange={handleChange}
                  className="w-full border border-white/10 bg-white/[0.025] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-orange-500 focus:bg-white/[0.04]" />
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-xs font-medium text-white/50"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword} onChange={handleChange}
                  className="w-full border border-white/10 bg-white/[0.025]
                             px-4 py-3.5 text-sm text-white
                             outline-none transition
                             placeholder:text-white/20
                             focus:border-orange-500
                             focus:bg-white/[0.04]"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-between bg-orange-500 px-5 py-3.5 text-sm font-semibold text-black transition hover:bg-orange-400"
              >
                <span>Create account</span>

                <span className="text-lg transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>

            </form>

            {/* Login */}
            <div className="mt-7 text-center text-sm">
              <span className="text-white/30">
                Already have an account?
              </span>

              <Link
                to="/login"
                className="ml-2 text-orange-400 transition hover:text-orange-300"
              >
                Login
              </Link>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Register;