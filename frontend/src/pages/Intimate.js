import React, { useEffect, useState } from "react";
import { Empty, message } from "antd";
import { Link } from "react-router-dom";
import apiClient from "../utils/interceptor";

const Intimate = () => {
  const [intimateProducts, setIntimateProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIntimateProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/intimateProduct/getAllIntimateProducts");
        setIntimateProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        message.error("Failed to fetch intimate products.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchIntimateProducts();
  }, []);
  

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRefresh = () => {
    setStatus("");
  };

  const filteredProducts = intimateProducts.filter((product) => {
    return status ? product.status === status : true;
  });

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            Intimate
          </h1>
          <p className="text-xs text-gray-500 font-semibold">View and add your intimates</p>
        </div>
        <div className="flex gap-2">
          <button
            className="text-black border border-[#DCE3E3] px-3 py-1 rounded-md"
            onClick={handleRefresh}
          >
            <i className="fa-solid fa-arrow-rotate-right text-lg"></i>
          </button>
          <Link to="/addIntimate">
            <button className="text-white bg-themeGradient hover:bg-themeGradientHover px-3 py-1 rounded-md flex items-center gap-2">
              <i className="fa-solid fa-plus text-lg"></i>
              <span>Add Product to Intimate</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-4 flex justify-start">
        <select
          className="w-1/6 px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-themeColor focus:border-themeColor"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Complete">Complete</option>
        </select>
      </div>

      <div className="relative">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <div className="min-w-[800px] sm:min-w-full rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-600 text-start font-semibold">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Lot Number</th>
                    <th className="py-3 px-4">Gr Number</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">Loading...</td>
                    </tr>
                  ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <tr
                        key={product._id} // Use unique ID like _id from MongoDB
                        className="hover:bg-gray-50 border-t transition-colors duration-200 bg-white divide-y divide-gray-200 text-gray-600"
                      >
                        <td className="py-4 px-4">{product.productName || "N/A"}</td> {/* Ensure correct field */}
                        <td className="py-4 px-4">{product.lotNumber || "N/A"}</td>
                        <td className="py-4 px-4">{product.grNumber || "N/A"}</td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              product.status === "Pending"
                                ? "border-red-800 bg-red-100 text-red-800"
                                : product.status === "In Progress"
                                ? "border-yellow-500 bg-yellow-100 text-yellow-500"
                                : "border-green-800 bg-green-100 text-green-800"
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-5">
                        <Empty description="No Products Found to Intimate" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intimate;
