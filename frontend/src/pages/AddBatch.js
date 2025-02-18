import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/interceptor";

const AddBatch = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const navigate = useNavigate();
  const [batchNumber, setBatchNumber] = useState("");
  const [sterile, setSterile] = useState("true");
  const [expDate, setExpDate] = useState("");
  const [mfgDate, setMfgDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [batchLength, setBatchLength] = useState("");
  const [productSize, setProductSize] = useState([
    { length: "", lengthType: "", width: "", widthType: "" },
  ]);
  const [numberOfWorkers, setNumberOfWorkers] = useState("");
  const [perWorkerTarget, setPerWorkerTarget] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get("/product/getAllProducts");
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        message.error("Failed to fetch products.");
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = (event) => {
    const selectedValue = event.target.value;
    setSelectedProduct(selectedValue);
  };

  const handleProductSizeChange = (index, field, value) => {
    const updatedSizes = [...productSize];
    updatedSizes[index][field] = value;
    setProductSize(updatedSizes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const batchData = {
      productName: selectedProduct,
      batchNumber,
      sterile,
      startDate,
      endDate,
      mfgDate,
      expDate,
      batchLength,
      productSize,
      numberOfWorkers,
      perWorkerTarget,
    };

    try {
      const response = await apiClient.post("/batch/addBatch", batchData);
      message.success("Batch added successfully!");
      setTimeout(() => {
        navigate("/batch");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding batch:", error);
      message.error("Failed to add batch.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-lg text-themeColor">
            Add Batch
          </h1>
          <p className="text-xs text-gray-500 font-semibold">Add new Batch</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Product:
                <select
                  required
                  value={selectedProduct}
                  onChange={handleProductSelection}
                  className="block w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                >
                  <option value="" disabled selected>
                    Select Product
                  </option>
                  {products.map((product) => (
                    <option key={product._id} value={product.productName}>
                      {product.productName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                MFG Date:
                <input
                  type="month" // Change the input type to "month"
                  required
                  value={mfgDate}
                  onChange={(e) => setMfgDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Batch Start Date:
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <h2 className="text-gray-700 ">Batch Size:</h2>
              <input
                type="number"
                placeholder="Length"
                value={batchLength}
                onChange={(e) => setBatchLength(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Number of Workers:
                <input
                  type="text"
                  value={numberOfWorkers}
                  onChange={(e) => setNumberOfWorkers(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 ">Type:</label>
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="true"
                    checked={sterile === "true"}
                    onChange={() => setSterile("true")}
                  />
                  <span className="ml-2">Sterile</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="false"
                    checked={sterile === "false"}
                    onChange={() => setSterile("false")}
                  />
                  <span className="ml-2">Non-Sterile</span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Batch Number:
                <input
                  type="text"
                  required
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                EXP Date:
                <input
                  type="month"
                  required
                  value={expDate}
                  onChange={(e) => setExpDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Batch End Date:
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>

            <div className="mb-4">
              <h2 className="text-gray-700">Product Size:</h2>
              {productSize.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                  {/* Length Input */}
                  <input
                    type="number"
                    placeholder="Length"
                    value={item.length}
                    onChange={(e) =>
                      handleProductSizeChange(index, "length", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  />
                  {/* Length Type Dropdown */}
                  <select
                    value={item.lengthType}
                    onChange={(e) =>
                      handleProductSizeChange(
                        index,
                        "lengthType",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="M">M</option>
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Inch">Inch</option>
                    <option value="Centimeter">Centimeter</option>
                    <option value="Millimeter">Millimeter</option>
                  </select>
                  {/* Width Input */}
                  <input
                    type="number"
                    placeholder="Width (Optional)"
                    value={item.width}
                    onChange={(e) =>
                      handleProductSizeChange(index, "width", e.target.value)
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  />
                  {/* Width Type Dropdown */}
                  <select
                    value={item.widthType}
                    onChange={(e) =>
                      handleProductSizeChange(
                        index,
                        "widthType",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  >
                    <option value="" disabled>
                      Select Type
                    </option>
                    <option value="M">M</option>
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Inch">Inch</option>
                    <option value="Centimeter">Centimeter</option>
                    <option value="Millimeter">Millimeter</option>
                  </select>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Per Worker Target:
                <input
                  type="text"
                  value={perWorkerTarget}
                  onChange={(e) => setPerWorkerTarget(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="py-2 px-6 w-40 bg-themeGradient text-white font-semibold rounded-md shadow-sm"
            disabled={loading}
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBatch;
