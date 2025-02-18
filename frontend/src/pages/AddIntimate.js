import React, { useEffect, useState } from "react";
import "../App.css";
import apiClient from "../utils/interceptor";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const AddIntimate = () => {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const [productName, setProductName] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [receiveDate, setReceiveDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [supplierName, setSupplierName] = useState("");
  const [grNumber, setrNumber] = useState("");
  const [quantity, setQuantity] = useState("");
  const [measurementType, setMeasurementType] = useState("");
  const status = "Pending";
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName,
      type,
      lotNumber,
      receiveDate,
      supplierName,
      grNumber,
      quantity,
      measurementType,
      status,
    };

    try {
      const response = await apiClient.post(
        "/intimateProduct/addIntimateProduct",
        productData
      );

      if (response.status === 201) {
        message.success("Product added successfully!");
        setTimeout(() => {
          navigate("/intimate");
        }, 1000);
      } else {
        message.error("Failed to add product, please try again.");
      }
    } catch (error) {
      console.error("Error submitting product data:", error);
      if (error.response) {
        message.error(
          `Error: ${error.response.data.message || "Failed to add product."}`
        );
      } else {
        message.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-lg text-themeColor">
            Add Product
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Add new Product to intimate
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Product Name:
                <select
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a product
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
                Lot Number:
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Receive Date:
                <input
                  type="date"
                  required
                  value={receiveDate}
                  onChange={() =>
                    setReceiveDate(new Date().toISOString().split("T")[0])
                  }
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Supplier Name:
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Type:
                <select
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="" disabled>
                    Select a product type
                  </option>
                  <option value="Raw">Raw Material</option>
                  <option value="Packing">Packing Material</option>
                  <option value="Chemical">Chemical</option>
                </select>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Gr Number:
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={grNumber}
                  onChange={(e) => setrNumber(e.target.value)}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Quantity:
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <select
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    value={measurementType}
                    onChange={(e) => setMeasurementType(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Measurement Type
                    </option>
                    <option value="M">M</option>
                    <option value="Liter">Liter</option>
                    <option value="Kg">Kg</option>
                    <option value="Inch">Inch</option>
                    <option value="Centimeter">Centimeter</option>
                    <option value="Milimeter">Milimeter</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIntimate;
