import { message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/interceptor";

const AddChemical = () => {
  const navigate = useNavigate();
  const [chemicalName, setChemicalName] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [expDate, setExpDate] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const chemicalData = {
      chemicalName,
      batchNo,
      mfgDate,
      expDate,
      brand,
    };

    try {
      // Make API call with the token in the headers
      const response = await apiClient.post('/chemical/addChemical', chemicalData);

      message.success("Chemical added successfully!");
      setTimeout(() => {
        navigate("/chemicals");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding chemical:", error);
      message.error("Failed to add chemical.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-lg text-themeColor">
            Add Chemical
          </h1>
          <p className="text-xs text-gray-500 font-semibold">Add new chemical</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Chemical Name:
            <input
              type="text"
              required
              value={chemicalName}
              onChange={(e) => setChemicalName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
            />
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Batch No:
                <input
                  type="text"
                  required
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                MFG Date:
                <input
                  type="date"
                  required
                  value={mfgDate}
                  onChange={(e) => setMfgDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Brand:
                <input
                  type="text"
                  required
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                EXP Date:
                <input
                  type="Date"
                  required
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
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

export default AddChemical;
