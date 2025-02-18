import React, { useEffect, useState } from "react";
import apiClient from "../utils/interceptor";
import { message } from "antd";

const Microbiological = () => {
  const [microbiologicalList, setMicrobiologicalList] = useState([]);
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [releaseNote, setReleaseNote] = useState("");
  const [remarks, setRemarks] = useState("");
  const [tests, setTests] = useState([]);

  const handleChange = (rowIndex, colIndex, value) => {
    if (value === "C" || value === "T" || value === "") {
      setTests((prevTests) => {
        const newTests = [...prevTests];
        newTests[rowIndex].values[colIndex] = value;

        const hasC = newTests.some((test) => test.values.includes("C"));
        setRemarks(hasC ? "Fail" : "Pass");

        return newTests;
      });
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await apiClient.get("/batch/getAllBatch");
        const activeBatch = response1.data.filter(
          (batch) => batch.status === true
        );

        const products = activeBatch;

        const response2 = await apiClient.get(
          "/etoSterlization/etoSterlization"
        );
        const productName =
          response2.data.data.length > 0
            ? response2.data.data[0].productName
            : "";

        const matchedProduct = products.find(
          (product) => product.productName === productName
        );
        setProducts(matchedProduct ? [matchedProduct] : []);
      } catch (error) {
        message.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = async (event) => {
    const selectedValue = event.target.value;
    const selectedProductObj = products.find(
      (product) => product.productName === selectedValue
    );

    setSelectedProduct(selectedProductObj);

    try {
      const response = await apiClient.get(
        `/microbiological/microbiological?productName=${selectedValue}`
      );

      // Ensure response contains valid data
      const previousData = response.data?.data || [];

      if (previousData.length > 0) {
        // Extract productName from the first object in the array
        setProductName(previousData[0].productName);
      } else {
        message.error("Product not found.");
      }

      console.log(
        "productName:",
        previousData.length > 0 ? previousData[0].productName : "N/A"
      );

      // Transform test data
      const transformedTests = previousData.flatMap((item) =>
        item.tests.map((test) => ({
          testDate: test.testDate.split("T")[0],
          values: test.result.split(","),
        }))
      );

      // Add a new test entry for the current date
      const currentDate = new Date().toISOString().split("T")[0];
      const newTest = {
        testDate: currentDate,
        values: Array(9).fill(""),
      };

      const updatedTests = [...transformedTests, newTest].slice(-14);
      setTests(updatedTests);
    } catch (error) {
      message.error("Failed to fetch previous data.");
    }
  };

  const fetchMicrobiologicalList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/microbiological/microbiological");
      const microbiologicalData = response.data.data || [];
      setMicrobiologicalList(microbiologicalData);
    } catch (error) {
      message.error("Failed to fetch Microbiological List.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMicrobiologicalList();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      productName: selectedProduct?.productName,
      remarks,
      releaseNote,
      tests: tests.map((test) => ({
        testDate: test.testDate,
        result: test.values.join(","),
      })),
      microbiologist: localStorage.getItem("userName"),
      batchNumber: selectedProduct?.batchNumber,
    };

    try {
      let response;

      if (selectedProduct?.productName) {
        const previousResponse = await apiClient.get(
          `/microbiological/microbiological?productName=${selectedProduct.productName}`
        );

        if (previousResponse.data.data?.length > 0) {
          response = await apiClient.put(
            `/microbiological/microbiological/${previousResponse.data.data[0]._id}`,
            payload
          );
        } else {
          response = await apiClient.post(
            "/microbiological/microbiological",
            payload
          );
        }
      }

      if (tests.length === 14) {
        await sendToStore();
      }

      setTests([]);
      setRemarks("");
      setSelectedProduct("");
      message.success("Test saved successfully.");
      fetchMicrobiologicalList();
    } catch (error) {
      message.error("Failed to save test.");
    }
  };
  const sendToStore = async () => {
    const payload = {
      productName,
      batchNo: selectedProduct?.batchNumber,
    };

    try {
      if (remarks === "Pass") {
        await apiClient.post(
          "/etoStoreForSterlization/etoStoreForSterlization",
          payload
        );
        message.success("Send to store successfully.");
      }
    } catch (error) {
      message.error("Failed to send to store.");
    }
  };
  return (
    <div className="text-start">
      <div className="mb-4 flex justify-between">
        <div className="flex gap-2">
          <select
            required
            value={selectedProduct ? selectedProduct.productName : ""}
            onChange={handleProductSelection}
            className="block w-52 px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
          >
            <option value="" disabled selected>
              Select Product
            </option>
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product._id} value={product.productName}>
                  {product.productName}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No Batch Available
              </option>
            )}
          </select>
          {selectedProduct && (
            <div className="block w-52 px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
              {selectedProduct?.batchNumber}
            </div>
          )}
        </div>
      </div>
      {selectedProduct && (
        <div className="p-2 border border-gray-300 rounded-md shadow-sm">
          <textarea
            type="date"
            value={releaseNote}
            onChange={(e) => setReleaseNote(e.target.value)}
            placeholder="Release Note..."
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm mb-2"
          />

          <div className="relative mb-4 w-full">
            {/* Outer wrapper to enforce scrolling */}
            <div className="overflow-x-auto w-full">
              {/* Inner wrapper to prevent layout shift */}
              <div className="min-w-[1000px] inline-block align-middle">
                <div className="overflow-hidden rounded-lg border border-gray-300">
                  <table className="w-full min-w-full table-auto divide-y divide-gray-200">
                    <thead className="bg-gray-100 text-gray-600 font-semibold">
                      <tr className="text-center border-b border-gray-300">
                        <th rowSpan={2} className="px-4 py-3 border-s">
                          Date
                        </th>
                        <th
                          colSpan={3}
                          className="px-4 py-3 border-s border-gray-300"
                        >
                          Fluid Thioglycolate Medium (30-35 °C)
                        </th>
                        <th
                          colSpan={3}
                          className="px-4 py-3 border-s border-gray-300"
                        >
                          Tryptone Soya Broth (20-25 °C)
                        </th>
                        <th
                          colSpan={3}
                          className="px-4 py-3 border-s border-gray-300"
                        >
                          Sabouraud Dextrose Agar (20-25 °C)
                        </th>
                      </tr>
                      <tr className="text-center">
                        {["Sample", "Negative Control", "Positive Control"].map(
                          (label, i) =>
                            Array(3)
                              .fill(null)
                              .map((_, j) => (
                                <th
                                  key={`${i}-${j}`}
                                  className="px-4 py-3 border-s border-gray-300 text-gray-700 font-semibold"
                                >
                                  {label}
                                </th>
                              ))
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {tests.map((test, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="px-4 py-2 border-t text-gray-800">
                            <input
                              type="date"
                              value={test.testDate}
                              className="border p-2 rounded-md w-full min-w-[140px]"
                              readOnly
                            />
                          </td>
                          {test.values.map((value, colIndex) => (
                            <td key={colIndex} className="px-4 py-2 border-t">
                              <input
                                type="text"
                                value={value}
                                maxLength={1}
                                onChange={(e) =>
                                  handleChange(
                                    rowIndex,
                                    colIndex,
                                    e.target.value.toUpperCase()
                                  )
                                }
                                className="border p-2 rounded-md w-14 text-center"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Remarks:
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm">
                {remarks}
              </div>
            </label>
          </div>

          <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
            <label className="block text-gray-700">
              Microbiologist Signature:
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm">
                {localStorage.getItem("userName")}
              </div>
            </label>
            <label className="block text-gray-700">
              QC Manager Signature:
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm"
              />
            </label>
          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-6 w-40 border text-gray-500 font-semibold rounded-md shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm"
            >
              SAVE
            </button>
          </div>
        </div>
      )}

      <div className="relative mt-4">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Batch Number</th>
                  <th className="py-3 px-4">Microbiologist</th>
                  <th className="py-3 px-4">Remarks</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : microbiologicalList.length > 0 ? (
                  microbiologicalList.map((microbiological) => (
                    <tr
                      key={microbiological._id}
                      className="hover:bg-gray-50 transition-colors text-center duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">
                        {microbiological.productName}
                      </td>
                      <td className="py-4 px-4">
                        {microbiological.batchNumber}
                      </td>
                      <td className="py-4 px-4">
                        {microbiological.microbiologist}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            microbiological.remarks === "Fail"
                              ? "border-red-800 bg-red-100 text-red-800"
                              : "border-green-800 bg-green-100 text-green-800"
                          }`}
                        >
                          {microbiological.remarks}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <i class="fa-regular fa-eye p-2 border border-gray-300 rounded-md hover:bg-white"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="flex flex-col items-center justify-center my-10">
                        <i className="fa-solid fa-box-open text-gray-400 text-5xl"></i>
                        <p className="text-gray-400 mt-4">No data found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microbiological;
