import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/interceptor";

const AddInstrument = () => {
  const navigate = useNavigate();
  const [staffData, setStaffData] = useState("");
  const [instrumentName, setInstrumentName] = useState("");
  const [company, setCompany] = useState("");
  const [modal, setModal] = useState("");
  const [size, setSize] = useState("");
  const [code, setCode] = useState("");
  const [staff, setStaff] = useState("");
  const [workingRange, setWorkingRange] = useState("");
  const [labAddress, setLabAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const instrumentData = {
      instrumentName,
      company,
      modal,
      size,
      code,
      staff,
      workingRange,
      labAddress,
    };

    try {
      // Make API call with the token in the headers
      const response = await apiClient.post(
        "/instrument/addInstrument",
        instrumentData
      );

      message.success("Instrument added successfully!");
      setTimeout(() => {
        navigate("/instruments");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding instrument:", error);
      message.error("Failed to add instrument.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    setLoading(true);
  
    try {
      const { data: usersData } = await apiClient.get('/auth/getAllUsers');
      setStaffData(usersData || []);
    } catch (error) {
      console.error("Error fetching staff data:", error);
      message.error("Failed to fetch staff data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-lg text-themeColor">
            Add Instrument
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Add new instrument
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Instrument Name:
                <input
                  type="text"
                  required
                  value={instrumentName}
                  onChange={(e) => setInstrumentName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Modal:
                <input
                  type="text"
                  required
                  value={modal}
                  onChange={(e) => setModal(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Instrument Code:
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Working Range:
                <input
                  type="text"
                  required
                  value={workingRange}
                  onChange={(e) => setWorkingRange(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Comany:
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Size:
                <input
                  type="text"
                  required
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Staff:
                <select
                  required
                  value={staff}
                  onChange={(e) => setStaff(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                >
                  <option value="" disabled>
                    Select Staff
                  </option>
                  {staffData && staffData.length > 0 ? (
                    staffData.map((staffMember) => (
                      <option key={staffMember.id} value={staffMember.name}>
                        {staffMember.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No staff available</option>
                  )}
                </select>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Lab Address:
                <input
                  type="text"
                  required
                  value={labAddress}
                  onChange={(e) => setLabAddress(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-10 text-center">
          <button
            type="submit"
            className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2"
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddInstrument;
