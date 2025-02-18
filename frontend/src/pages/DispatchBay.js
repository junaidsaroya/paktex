import { Empty, message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../utils/interceptor";

const DispatchBay = () => {
  const [rawMaterialList, setRawMaterialList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRawMaterialList = async () => {
    setLoading(true);
    try {
      const rawResponse = await apiClient.get(
        "/rawMaterialStore/rawMaterialStore"
      );
      const rawMaterialData = rawResponse.data || [];

      const packingResponse = await apiClient.get(
        "/packingMaterialStore/packingMaterialStore"
      );
      const packingMaterialData = packingResponse.data || [];

      const chemicalResponse = await apiClient.get(
        "/chemicalMaterialStore/chemicalMaterialStore"
      );
      const chemicalMaterialData = chemicalResponse.data || [];

      // Combine all data
      const data = [
        ...rawMaterialData,
        ...packingMaterialData,
        ...chemicalMaterialData,
      ];

      // Filter items where dispatch is `true`
      const filteredData = data.filter((item) => item.dispatch === true);

      setRawMaterialList(filteredData);
    } catch (error) {
      message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRawMaterialList();
  }, []);
  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            Dispatch
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            View your dispatched products
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-themeGradient hover:bg-themeGradientHover text-white px-4 py-2 rounded-md mb-4 md:mb-0">
            <span className="font-semibold">View Report</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <div className="min-w-[800px] sm:min-w-full rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-600 text-start font-semibold">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Batch Number</th>
                    <th className="py-3 px-4">Dispatch By</th>
                    <th className="py-3 px-4">Dispatch Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : rawMaterialList.length > 0 ? (
                    rawMaterialList.map((product) => (
                      <tr
                        key={product._id} // Use unique ID like _id from MongoDB
                        className="hover:bg-gray-50 border-t transition-colors duration-200 bg-white divide-y divide-gray-200 text-gray-600"
                      >
                        <td className="py-4 px-4">
                          {product.productName || "N/A"}
                        </td>{" "}
                        {/* Ensure correct field */}
                        <td className="py-4 px-4">
                          {product.batchNo || "N/A"}
                        </td>
                        <td className="py-4 px-4">
                          {product.dispatchBy || "N/A"}
                        </td>
                        <td className="py-4 px-4">
                          {product.dispatchDate
                            ? product.dispatchDate.split("T")[0]
                            : "N/A"}
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

export default DispatchBay;
