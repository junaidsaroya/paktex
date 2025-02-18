import React, { useEffect, useState } from "react";
import { Popconfirm, Modal, message } from "antd";
import "../App.css";
import AddTeamMember from "../components/AddTeamMember";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Team = () => {
  // Static user list
  const [users, setUsers] = useState("");
  const [status, setStatus] = useState("");
  const [access, setAccess] = useState("");
  const [addTeamModalVisible, setAddTeamModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUserData = async () => {
    setLoading(true); // Ensure loader is shown during the API call
    const token = localStorage.getItem("token");
    if (!token) {
      message.error("Not authenticated");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const { data: usersData } = await axios.get(
        `${API_BASE_URL}/auth/getAllUsers`,
        config
      );
      setUsers(usersData || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleAccessChange = (e) => {
    setAccess(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`${API_BASE_URL}/auth/deleteUser/${id}`, config);
      message.success("Member deleted successfully");
      fetchUserData();
    } catch (error) {
      message.error("Failed to delete Member");
    }
  };

  const filteredUsers = Array.isArray(users)
  ? users.filter((user) => {
      const statusMatch = status === "" || user.status.toString() === status;
      const accessMatch = access === "" || user.access.includes(access);
      return statusMatch && accessMatch;
    })
  : [];


  const handleAddTeam = () => {
    setAddTeamModalVisible(true);
  };

  const handleModalClose = () => {
    setAddTeamModalVisible(false);
  };

  const handleSuccess = () => {
    setAddTeamModalVisible(false);
    fetchUserData();
  };

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            Team
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Manage your team
          </p>
        </div>
        <div className="flex gap-3 items-center mt-2 md:mt-0">
          <button className="text-black border border-[#DCE3E3] px-3 py-1 rounded-md mb-4 md:mb-0">
            <i className="fa-solid fa-arrow-rotate-right text-lg"></i>
          </button>
          <button
            className="bg-themeGradient hover:bg-themeGradientHover text-white px-2 py-1 rounded-md mb-4 md:mb-0 flex items-center"
            onClick={handleAddTeam}
          >
            <i className="fa-solid fa-plus text-xl"></i>
            <span className="font-semibold ms-2">Add User</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div class="spinner"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:space-x-3 my-4">
            <div className="flex flex-col md:w-1/6 mb-3 md:mb-0">
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="w-full rounded-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-themeColor focus:border-themeColor"
              >
                <option value="">All</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            <div className="flex flex-col md:w-1/6 mb-3 md:mb-0">
              <select
                id="access"
                value={access}
                onChange={handleAccessChange}
                className="w-full rounded-md px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-themeColor focus:border-themeColor"
              >
                <option value="">All Access</option>
                <option value="Intimate">Intimate</option>
                <option value="LIMS First">LIMS First</option>
                <option value="LIMS Second">LIMS Second</option>
                <option value="Production">Production</option>
                <option value="GLP">GLP</option>
                <option value="QMS">QMS</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <div className="max-h-[500px] scrollbar-hide">
              <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                    <tr className="">
                      <th className="py-3 px-4 text-left">User</th>
                      <th className="py-3 px-4">Access</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <tr
                          key={user._id}
                          className="hover:bg-gray-50 transition-colors duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 me-2 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center  border border-gray-200 font-bold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                              {user.name}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {Array.isArray(user.access)
                              ? user.access.map((access, index) => (
                                  <span key={index}>
                                    {access}
                                    <br />
                                  </span>
                                ))
                              : user.access}
                          </td>

                          <td className="py-4 px-4">{user.email}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center">
                              <div
                                className={`relative inline-block w-11 h-5 transition duration-200 ease-linear rounded-full cursor-default ${
                                  user.status ? "bg-themeColor" : "bg-gray-300"
                                }`}
                              >
                                <span
                                  className={`absolute block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                    user.status
                                      ? "translate-x-6"
                                      : "translate-x-0"
                                  }`}
                                ></span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 space-x-2">
                            <div className="flex gap-2 justify-center">
                              <i className="fa-regular fa-pen-to-square"></i>
                              <Popconfirm
                                title="Are you sure you want to delete this user?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => handleDelete(user._id)}
                              >
                                <i className="fa-regular fa-trash-can"></i>
                              </Popconfirm>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">
                          <div className="flex flex-col items-center justify-center my-10">
                            <i className="fa-solid fa-user-large-slash text-gray-400 text-5xl"></i>
                            <p className="text-gray-400 mt-4">
                              No members found
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal
        visible={addTeamModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <AddTeamMember onSuccess={handleSuccess} />
      </Modal>
    </div>
  );
};

export default Team;
