import { message } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../utils/interceptor";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../utils/firbase.js";
const Qms = () => {
  const [products, setProducts] = useState([]); // Fetch projects from API
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected project
  const [file, setFile] = useState(null); // Store selected file

  const handleFileUpload = async () => {
    if (!file || !selectedProduct) {
      message.error("Please select a file and project.");
      return;
    }

    const fileRef = ref(storage, `qms/${selectedProduct}/${file.name}`);
    try {
      const snapshot = await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      // Save file info to MongoDB
      await apiClient.post("/file/upload", {
        productName: selectedProduct,
        fileName: file.name,
        fileUrl: downloadUrl,
      });

      message.success("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      message.error("File upload failed.");
    }
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/product/getAllProducts");

        setProducts(response.data.data || []);
      } catch (error) {
        message.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200">
    
      <div style={{ fontFamily: "Roboto, sans-serif" }}>
        <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
          QMS
        </h1>
        <p className="text-xs text-gray-500 text-start font-semibold">
          Quality Management System
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow cursor-pointer bg-gray-100"
            onClick={() => setSelectedProduct(product.productName)}
          >
            <h2 className="font-semibold text-themeColor">
              {product.productName}
            </h2>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">
            Upload File to {selectedProduct}
          </h3>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      )}
    </div>
  );
};

export default Qms;
