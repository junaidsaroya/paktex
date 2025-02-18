import { Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../utils/interceptor";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/product/getAllProducts");
        setProducts(response.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        message.error("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRefresh = () => {
    setStatus("");
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/product/deleteProduct/${id}`);
      message.success("Product deleted successfully!");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product.");
    }
  };

  const filteredProducts = products.filter((product) => {
    const statusMatch = status === "" || product.status.toString() === status;
    return statusMatch;
  });

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div style={{ fontFamily: "Roboto, sans-serif" }}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            Products
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Manage your products
          </p>
        </div>
        <div className="flex gap-3 items-center mt-2 md:mt-0">
          <button
            onClick={handleRefresh}
            className="text-black border border-[#DCE3E3] px-3 py-1 rounded-md mb-4 md:mb-0"
          >
            <i className="fa-solid fa-arrow-rotate-right text-lg"></i>
          </button>
          <Link to="/addProduct">
            <button className="bg-themeGradient hover:bg-themeGradientHover text-white px-2 py-1 rounded-md mb-4 md:mb-0 flex items-center">
              <i className="fa-solid fa-plus text-xl"></i>
              <span className="font-semibold ms-2">Add Product</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-3 my-4">
        <div className="flex flex-col md:w-1/6 mb-3 md:mb-0">
          <select
            id="status"
            value={status}
            onChange={handleStatusChange}
            className="w-full rounded-md px-3 py-2 border border-gray-300 bg-gray-50 rounded-lg focus:outline-none focus:ring-themeColor focus:border-themeColor"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="relative">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition-colors duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">{product.productName}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-center">
                          <div
                            className={`relative inline-block w-11 h-5 transition duration-200 ease-linear rounded-full cursor-default ${
                              product.status ? "bg-themeColor" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                product.status
                                  ? "translate-x-6"
                                  : "translate-x-0"
                              }`}
                            ></span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 space-x-2">
                        <div className="flex gap-2 justify-center">
                          {/* <i className="fa-regular fa-eye"></i>
                          <i className="fa-regular fa-pen-to-square"></i> */}
                          <Popconfirm
                            title="Are you sure you want to delete this product?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDelete(product._id)}
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </Popconfirm>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">
                      <div className="flex flex-col items-center justify-center my-10">
                        <i className="fa-solid fa-box-open text-gray-400 text-5xl"></i>
                        <p className="text-gray-400 mt-4">No products found</p>
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

export default Products;
