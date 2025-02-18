import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/interceptor";

const AddProduct = () => {
  const [instruments, setInstruments] = useState([]);
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [productVariants, setProductVariants] = useState([
    { length: "", width: "" },
  ]);
  const [tests, setTests] = useState([
    {
      testName: "",
      specifications: "",
      acceptanceCriteria: "",
      rejectionCriteria: "",
      instrument: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddVariant = () => {
    setProductVariants([...productVariants, { length: "", width: "" }]);
  };

  const handleRemoveVariant = (index) => {
    setProductVariants(productVariants.filter((_, i) => i !== index));
  };

  const handleAddTest = () => {
    setTests([
      ...tests,
      {
        testName: "",
        specifications: "",
        acceptanceCriteria: "",
        rejectionCriteria: "",
        instrument: "",
      },
    ]);
  };

  const handleRemoveTest = (index) => {
    setTests(tests.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      productName,
      productVariants: productVariants,
      tests,
    };

    try {
      const response = await apiClient.post("/product/addProduct", productData);
      message.success("Product added successfully!");
      setTimeout(() => {
        navigate("/products");
      }, 1000);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      message.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const response = await apiClient.get("/instrument/getAllInstruments");
        setInstruments(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        message.error("Failed to fetch products.");
      }
    };

    fetchInstruments();
  }, []);

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
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Product Name:
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
            />
          </label>
        </div>

        {/* Product Variants */}
        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">
            Product Variants:
          </h2>
          {productVariants.map((variant, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder="Length"
                required
                value={variant.length}
                onChange={(e) =>
                  setProductVariants(
                    productVariants.map((v, i) =>
                      i === index ? { ...v, length: e.target.value } : v
                    )
                  )
                }
                className="px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
              <input
                type="text"
                placeholder="Width (Optional)"
                value={variant.width}
                onChange={(e) =>
                  setProductVariants(
                    productVariants.map((v, i) =>
                      i === index ? { ...v, width: e.target.value } : v
                    )
                  )
                }
                className="px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(index)}
                  className="col-span-2 text-red-500 text-sm text-left"
                >
                  Remove Variant <i class="fa-regular fa-trash-can"></i>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddVariant}
            className="mt-2 text-themeColor text-sm px-2 py-1 border border-themeColor rounded-md hover:text-white hover:bg-themeColor"
          >
            + Add Variant
          </button>
        </div>

        {/* Tests */}
        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">Tests:</h2>
          {tests.map((test, index) => (
            <div key={index} className="border-b-2 border-gray-200 mb-4 pb-2">
              <input
                type="text"
                placeholder="Test Name"
                value={test.testName}
                required
                onChange={(e) =>
                  setTests(
                    tests.map((t, i) =>
                      i === index ? { ...t, testName: e.target.value } : t
                    )
                  )
                }
                className="mb-2 block w-full px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
              <input
                type="text"
                placeholder="Specifications"
                value={test.specifications}
                required
                onChange={(e) =>
                  setTests(
                    tests.map((t, i) =>
                      i === index ? { ...t, specifications: e.target.value } : t
                    )
                  )
                }
                className="mb-2 block w-full px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
              <input
                type="text"
                placeholder="Acceptance Criteria"
                value={test.acceptanceCriteria}
                required
                onChange={(e) =>
                  setTests(
                    tests.map((t, i) =>
                      i === index
                        ? { ...t, acceptanceCriteria: e.target.value }
                        : t
                    )
                  )
                }
                className="mb-2 block w-full px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
              <input
                type="text"
                placeholder="Rejection Criteria"
                value={test.rejectionCriteria}
                required
                onChange={(e) =>
                  setTests(
                    tests.map((t, i) =>
                      i === index
                        ? { ...t, rejectionCriteria: e.target.value }
                        : t
                    )
                  )
                }
                className="mb-2 block w-full px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
              <select
                value={test.instrument}
                required
                onChange={(e) =>
                  setTests(
                    tests.map((t, i) =>
                      i === index ? { ...t, instrument: e.target.value } : t
                    )
                  )
                }
                className="mb-2 block w-full px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              >
                <option value="">Select Instrument</option>
                {instruments.map((instrument) => (
                  <option
                    key={instrument._id}
                    value={instrument.instrumentName}
                  >
                    {instrument.instrumentName}
                  </option>
                ))}
              </select>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveTest(index)}
                  className="text-red-500 text-sm"
                >
                  Remove Test <i class="fa-regular fa-trash-can"></i>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTest}
            className="text-themeColor text-sm px-2 py-1 border border-themeColor rounded-md hover:text-white hover:bg-themeColor"
          >
            + Add Test
          </button>
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

export default AddProduct;
