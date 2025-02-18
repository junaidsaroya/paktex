import React, { useState } from "react";
import axios from "axios";
import { Input, message, Select } from "antd";
const { Option } = Select;

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AddTeamMember = ({ onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState([]);
  const [loading, setLoading] = useState(false);
  const showPassword = useState(false);

  const parentId = localStorage.getItem("userId");

  if (!parentId) {
    message.error("You must be logged in to add a sub-user.");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !access || !parentId) {
      message.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        message.error("You are not authorized to perform this action.");
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/auth/createUser`, {
        name,
        email,
        password,
        access,
        parentId,
      });

      if (response.status === 201) {
        message.success("Member added successfully!");
        setName("");
        setEmail("");
        setPassword("");
        setAccess("View");

        if (onSuccess) {
          onSuccess();
        }
      } else {
        message.error("Failed to add sub-user. Please try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to add sub-user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white">
      <h2 className="text-left text-2xl font-semibold text-themeColor border-b">
        Add Member
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
            placeholder="Enter name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
            placeholder="Enter email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <Input.Password
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
            placeholder="Enter sub-user password"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="access"
          >
            Access
          </label>
          <Select
            id="access"
            value={access}
            onChange={(value) => setAccess(value)}
            className="w-full rounded-lg"
            mode="multiple"
            placeholder="Add Access"
          >
            <Option value="Intimate">Intimate</Option>
            <Option value="LIMS First">LIMS First</Option>
            <Option value="LIMS Second">LIMS Second</Option>
            <Option value="Production">Production</Option>
            <Option value="GLP">GLP</Option>
            <Option value="QMS">QMS</Option>
          </Select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default AddTeamMember;
