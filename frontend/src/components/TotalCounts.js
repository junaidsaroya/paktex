import { message } from "antd";
import React, { useEffect, useState } from "react";
import apiClient from "../utils/interceptor";

const TotalCounts = () => {
  const [product, setProduct] = useState("");
  const [chemical, setChemical] = useState("");
  const [media, setMedia] = useState("");
  const [instrument, setInstrument] = useState("");
  const [batch, setBatch] = useState("");
  useEffect(() => {
    const productCount = async () => {
      try {
        const response = await apiClient.get("/count/product");
        setProduct(response.data || []);
      } catch (error) {
        message.error("Failed to fetch intimate products.");
      }
    };
    const chemicalCount = async () => {
        try {
          const response = await apiClient.get("/count/chemical");
          setChemical(response.data || []);
        } catch (error) {
          message.error("Failed to fetch intimate chemical.");
        }
      };
      const mediaCount = async () => {
        try {
          const response = await apiClient.get("/count/media");
          setMedia(response.data || []);
        } catch (error) {
          message.error("Failed to fetch intimate media.");
        }
      };
      const instrumentCount = async () => {
        try {
          const response = await apiClient.get("/count/instrument");
          setInstrument(response.data || []);
        } catch (error) {
          message.error("Failed to fetch intimate instruments.");
        }
      };
      const batchCount = async () => {
        try {
          const response = await apiClient.get("/count/batch");
          setBatch(response.data || []);
        } catch (error) {
          message.error("Failed to fetch batch.");
        }
      };

    productCount();
    mediaCount();
    instrumentCount();
    chemicalCount();
    batchCount();
  }, []);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 w-full">
      {/* Products Card */}
      <div className="flex items-center p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
          <i className="fa-solid fa-layer-group text-2xl"></i>
        </div>
        <div className="ml-8">
          <h2 className="text-lg font-semibold">Products</h2>
          <p className="text-gray-700 text-2xl font-bold">{product.totalProducts}</p>
        </div>
      </div>

      {/* Chemical Card */}
      <div className="flex items-center p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="p-3 bg-green-100 text-green-600 rounded-full">
          <i className="fa-solid fa-industry text-2xl"></i>
        </div>
        <div className="ml-8">
          <h2 className="text-lg font-semibold">Chemical</h2>
          <p className="text-gray-700 text-2xl font-bold">{chemical.totalChemicals}</p>
        </div>
      </div>

      {/* Instrument Card */}
      <div className="flex items-center p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="p-3 bg-red-100 text-red-600 rounded-full">
          <i className="fa-solid fa-wrench text-2xl"></i>
        </div>
        <div className="ml-8">
          <h2 className="text-lg font-semibold">Instrument</h2>
          <p className="text-gray-700 text-2xl font-bold">{instrument.totalInstruments}</p>
        </div>
      </div>

      {/* Media Card */}
      <div className="flex items-center p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
          <i className="fa-solid fa-flask text-2xl"></i>
        </div>
        <div className="ml-8">
          <h2 className="text-lg font-semibold">Media</h2>
          <p className="text-gray-700 text-2xl font-bold">{media.totalMedias}</p>
        </div>
      </div>

      {/* Batches Card */}
      <div className="flex items-center p-5 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
          <i className="fa-solid fa-boxes-stacked text-2xl"></i>
        </div>
        <div className="ml-8">
          <h2 className="text-lg font-semibold">Batches</h2>
          <p className="text-gray-700 text-2xl font-bold">{batch.totalBatches}</p>
        </div>
      </div>
    </div>
  );
};

export default TotalCounts;
