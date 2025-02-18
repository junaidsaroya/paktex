import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const SignUp = ({ toggleForm, setLoged }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      message.error("All fields are required.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      message.error("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.status === 201) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user._id);

        message.success("Sign up successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (response.status === 400) {
        const errorData = await response.json();
        message.error(`Sign up failed: ${errorData.message}`);
      } else {
        message.error("An unexpected error occurred.");
      }
    } catch (error) {
      message.error("An error occurred during sign-up.");
      console.error("Sign-up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="max-w-md w-full bg-white py-6 px-8 rounded-2xl border-4 border-gray-200">
        <h2 className="text-2xl font-bold text-center text-themeColor mb-3">
          Sign Up
        </h2>
        <form onSubmit={handleSignUp} className="text-start">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-themeColor hover:bg-themeGradient text-white font-semibold rounded-md shadow-md hover:bg-themeColor2 transition-colors ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="hover:text-black">
            Already have an account?{" "}
            <button
              onClick={toggleForm}
              className="text-themeColor font-semibold hover:text-[#dc2626]"
            >
              Sign in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
