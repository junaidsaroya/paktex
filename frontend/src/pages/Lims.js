import React, { useEffect, useState } from "react";
import apiClient from "../utils/interceptor";
import { message, Popconfirm } from "antd";
import { setIntimateProducts } from "../slices/app";
import { useSelector, useDispatch } from "react-redux";
const Lims = () => {
  const [tests, setTests] = useState([
    {
      testName: "",
      specifications: "",
      result: "",
      status: "",
    },
  ]);
  const [qcNumber, setQcNumber] = useState("");
  const [remarks, setRemarks] = useState("");
  const dispatch = useDispatch();
  const { intimateProducts } = useSelector((state) => state.app);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productType, setProductType] = useState("");
  const [statusChangeId, setStatusChangeId] = useState("");
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const fetchIntimateProducts = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        "/intimateProduct/getAllIntimateProducts"
      );
      dispatch(setIntimateProducts(response.data.data || []));
    } catch (error) {
      message.error("Failed to fetch intimate products.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchIntimateProducts();
  }, []);
  const getProductType = async (selectedProduct) => {
    setLoading(true);
  
    try {
      const response = await apiClient.get("/intimateProduct/getAllIntimateProducts");
      const products = response.data.data || [];
  
      // Find the product that matches the selectedProduct's name
      const selectedProductData = products.find(
        (product) => product.productName === selectedProduct.productName
      );
      console.log("selectedProductData:", selectedProductData);
      if (selectedProductData) {
        setProductType(selectedProductData.type); // Save the product type in state
        console.log("ProductType:", productType);
      } else {
        message.warning("No matching product found.");
        setProductType(""); // Reset state if no match is found
      }
    } catch (error) {
      // message.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleStartTest = (product) => {
    setSelectedProduct(product);
    getProductType(product);
    
  };
  useEffect(() => {
    if (productType) {
      generateQCNumber(productType);
    }
  }, [productType]);

  const handleCancel = () => {
    setSelectedProduct(null);
  };
  const handleCollect = async (id) => {
    try {
      const status = "In Progress";
      await apiClient.put(`/intimateProduct/statusUpdate/${id}`, { status });
      fetchIntimateProducts();
      message.success("Collected successfully.");
    } catch (error) {
      console.error("Error saving test:", error);
      message.error("Failed to collect.");
    }
  };
  const handleComplete = async (id) => {
    try {
      const status = "Complete";
      await apiClient.put(`/intimateProduct/statusUpdate/${id}`, { status });
      fetchIntimateProducts();
    } catch (error) {
      console.error("Error saving test:", error);
      message.error("Failed to complete.");
    }
  };
  const handleSubmit = async () => {
    const payload = {
      releaseDate,
      qcNumber,
      remarks,
      tests: tests.map((test) => ({
        testName: test.testName,
        specifications: test.specifications,
        result: test.result,
        status: test.status || "",
      })),
    };
    try {
      await apiClient.post("/lims/lims", payload);
      setReleaseDate("");
      setQcNumber("");
      setTests([]);
      setRemarks("");
      setSelectedProduct(null);
      await handleComplete(statusChangeId);
      message.success("Test completed successfully.");
    } catch (error) {
      message.error("Failed to save test.");
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/product/getAllProducts");
        const products = response.data.data || [];
        const selectedProductData = products.find(
          (product) => product.productName === selectedProduct.productName
        );
        setTests(selectedProductData?.tests || []);
      } catch (error) {
        message.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    if (selectedProduct) {
      fetchProducts();
    }
  }, [selectedProduct]);
  const updateTestField = (index, value) => {
    setTests((prevTests) => {
      const newTests = [...prevTests];
      const selectedTest = newTests[index];

      const acceptanceCriteria = selectedTest?.acceptanceCriteria || "";
      const result = String(value || "").trim();

      newTests[index].result = result;

      newTests[index].status = acceptanceCriteria === result ? "Pass" : "Fail";

      const hasFail = newTests.some((test) => test.status === "Fail");
      setRemarks(hasFail ? "Fail" : "Pass");

      return newTests;
    });
  };
  const generateQCNumber = (productType) => {
    const currentYear = new Date().getFullYear().toString().slice(-2); // Get last 2 digits of the year
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0"); // Get zero-padded month
  
    // Determine prefix based on productType
    let prefix = "";
    if (productType === "Packing") {
      prefix = "PM";
    } else if (productType === "Chemical") {
      prefix = "CM";
    } else if (productType === "Raw") {
      prefix = "RM";
    } else {
      message.error("Invalid product type.");
      return;
    }
  
    let newQcNumber = `${prefix}${currentYear}${currentMonth}0001`;
  
    // Filter products with status "Completed" and matching productType
    const completedProducts = intimateProducts.filter(
      (product) => product.status === "Complete" 
    );
    if (completedProducts.length > 0) {
      const lastQcNumber = completedProducts[completedProducts.length - 1]?.qcNumber;
  
      if (lastQcNumber && lastQcNumber.startsWith(`${prefix}${currentYear}${currentMonth}`)) {
        const lastNumber = parseInt(lastQcNumber.slice(-4), 10) + 1;
        newQcNumber = `${prefix}${currentYear}${currentMonth}${String(lastNumber).padStart(4, "0")}`;
      } else {
        // If no QC number exists for the current month, start from 0001
        newQcNumber = `${prefix}${currentYear}${currentMonth}0001`;
      }
    }
  
    setQcNumber(newQcNumber);
  };
  

  return (
    <div className="px-4 py-2 rounded-xl bg-white min-h-screen border border-2 border-gray-200 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-lg text-themeColor">
            Bulk Raw Material Analysis
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Analyis intimate products
          </p>
        </div>
      </div>

      <div className="relative mb-4">
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
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <thead className="bg-[#E8F9FF]">
                  <tr>
                    <th colSpan="5" className="py-3 px-4 text-start">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-themeColor text-white cursor-pointer">
                        Pending
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : intimateProducts.filter(
                      (product) => product.status === "Pending"
                    ).length > 0 ? (
                    intimateProducts
                      .filter((product) => product.status === "Pending")
                      .map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50 border-t transition-colors duration-200 bg-white divide-y divide-gray-200 text-gray-600 text-center"
                        >
                          <td className="py-4 px-4">
                            {product.productName || "N/A"}
                          </td>
                          <td className="py-4 px-4">
                            {product.lotNumber || "N/A"}
                          </td>
                          <td className="py-4 px-4">
                            {product.grNumber || "N/A"}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-800 bg-red-100 text-red-800">
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className="px-2.5 py-1 rounded-full text-xs font-medium bg-themeColor text-white cursor-pointer"
                              onClick={() => handleCollect(product._id)}
                            >
                              Collect
                            </span>
                          </td>
                        </tr>
                      ))
                  ) : null}
                </tbody>
                <thead className="bg-[#E8F9FF]">
                  <tr>
                    <th colSpan="5" className="py-3 px-4 text-start">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-themeColor text-white cursor-pointer">
                        In Progress
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : intimateProducts.filter(
                      (product) => product.status === "In Progress"
                    ).length > 0 ? (
                    intimateProducts
                      .filter((product) => product.status === "In Progress")
                      .map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-gray-50 border-t transition-colors duration-200 bg-white divide-y divide-gray-200 text-gray-600 text-center"
                        >
                          <td className="py-4 px-4">
                            {product.productName || "N/A"}
                          </td>
                          <td className="py-4 px-4">
                            {product.lotNumber || "N/A"}
                          </td>
                          <td className="py-4 px-4">
                            {product.grNumber || "N/A"}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-yellow-500 bg-yellow-100 text-yellow-500">
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className="px-2.5 py-1 rounded-full text-xs font-medium bg-themeColor text-white cursor-pointer"
                              onClick={() => {
                                handleStartTest(product);
                                setStatusChangeId(product._id);
                              }}
                            >
                              Start Test
                            </span>
                          </td>
                        </tr>
                      ))
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <div className="p-2 border border-gray-300 rounded-md shadow-sm">
          <div className="w-full p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Product Name:
                  </span>{" "}
                  {selectedProduct.productName}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Release Date:
                  </span>{" "}
                  <input
                    type="date"
                    required
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="max-w-96 w-52 px-3 py-1 border-b border-gray-400 bg-transparent focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  />
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Supplier Name:
                  </span>{" "}
                  {selectedProduct.supplierName}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">QC#</span>{" "}
                  {qcNumber}
                </div>
              </div>

              <div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">Gr No:</span>{" "}
                  {selectedProduct.grNumber}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Receive Date:
                  </span>{" "}
                  {new Date(selectedProduct.receiveDate).toLocaleDateString()}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">Lot No:</span>{" "}
                  {selectedProduct.lotNumber}
                </div>
              </div>
            </div>
          </div>
          <div className="relative mb-4">
            <div className="max-h-[500px] scrollbar-hide">
              <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Test Name
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Specifications
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Results
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border-b text-gray-800">
                          <input
                            type="text"
                            readOnly
                            value={test.testName || ""} // Bind input value to test.testName
                            onChange={(e) =>
                              setTests((prevTests) => {
                                const newTests = [...prevTests];
                                newTests[index] = {
                                  ...newTests[index],
                                  testName: e.target.value,
                                }; // Update testName
                                return newTests;
                              })
                            }
                            className="border p-2 rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          <input
                            type="text"
                            readOnly
                            value={test.specifications || ""} // Bind input value to test.specifications
                            onChange={(e) =>
                              setTests((prevTests) => {
                                const newTests = [...prevTests];
                                newTests[index] = {
                                  ...newTests[index],
                                  specifications: e.target.value,
                                }; // Update specifications
                                return newTests;
                              })
                            }
                            className="border p-2 rounded-md"
                          />
                        </td>
                        <td className="py-2 px-4 border-b">
                          <input
                            type="text"
                            value={tests[index]?.result} // Set the value from the state
                            onChange={(e) =>
                              updateTestField(index, e.target.value)
                            }
                            onBlur={(e) =>
                              updateTestField(index, e.target.value)
                            } // Trigger on focus out
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                updateTestField(index, e.target.value); // Trigger on Enter press
                              }
                            }}
                            className="border p-2 rounded-md"
                          />
                        </td>
                        <td className="px-4 py-2 border-b text-gray-800">
                          {/* Compare acceptanceCriteria with the result, ensuring both are strings and trimmed */}
                          {test.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Remarks:
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
                {remarks}
              </div>
            </label>
          </div>
          <div className="mt-10 justify-center flex gap-2">
            <button
              type="submit"
              onClick={handleCancel}
              className="py-2 px-6 w-40 border text-gray-500 font-semibold rounded-md shadow-sm"
            >
              Cancel
            </button>
            <Popconfirm
              title="Do you want to print Label?"
              okText="Yes"
              cancelText="No"
              onCancel={handleSubmit} // Runs only handleSubmit when "No" is clicked
              onConfirm={() => {
                handleSubmit(); // Runs handleSubmit
                // handlePrint();  // Runs handlePrint if "Yes" is clicked
              }}
            >
              <button
                type="button"
                className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm"
              >
                SAVE
              </button>
            </Popconfirm>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lims;
