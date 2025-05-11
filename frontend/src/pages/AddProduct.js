import {message} from 'antd';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import apiClient from '../utils/interceptor';

const AddProduct = () => {
  const [testIncrediantList, setTestIncrediantList] = useState([]);
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [productVariants, setProductVariants] = useState([
    {length: '', lengthUnit: 'Meter', width: '', widthUnit: 'Meter'},
  ]);
  const [tests, setTests] = useState([
    {
      testName: '',
      specifications: '',
      acceptanceCriteria: '',
      rejectionCriteria: '',
      instrument: '',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleAddVariant = () => {
    setProductVariants([
      ...productVariants,
      {length: '', lengthUnit: '', width: '', widthUnit: ''},
    ]);
  };

  const handleRemoveVariant = (index) => {
    setProductVariants(productVariants.filter((_, i) => i !== index));
  };

  const handleAddTest = () => {
    setTests([
      ...tests,
      {
        testName: '',
        specifications: '',
        acceptanceCriteria: '',
        rejectionCriteria: '',
        instrument: '',
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
      productVariants: productVariants.map((variant) => ({
        length: variant.length,
        lengthUnit: variant.lengthUnit,
        width: variant.width,
        widthUnit: variant.widthUnit,
      })),
      tests,
    };

    try {
      const response = await apiClient.post('/product/addProduct', productData);
      message.success('Product added successfully!');
      setTimeout(() => {
        navigate('/products');
      }, 1000);
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [instrumentsResponse, chemicalsResponse, mediasResponse] =
          await Promise.all([
            apiClient.get('/instrument/getAllInstruments'),
            apiClient.get('/chemical/getAllChemicals'),
            apiClient.get('/media/getAllMedia'),
          ]);

        const combinedList = [
          ...(instrumentsResponse.data || []),
          ...(chemicalsResponse.data || []),
          ...(mediasResponse.data || []),
        ];

        setTestIncrediantList(combinedList);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200 text-start">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div style={{fontFamily: 'Roboto, sans-serif'}}>
          <h1 className="font-bold text-lg md:text-lg text-themeColor">
            Add Product
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Add new Product to intimate
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
          <h2 className="font-semibold text-gray-700 mb-2">
            Product Variants:
          </h2>
          {productVariants.map((variant, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-2">
              <div className="flex gap-2 w-full">
                <input
                  type="number"
                  placeholder="Length"
                  required
                  value={variant.length}
                  onChange={(e) =>
                    setProductVariants(
                      productVariants.map((v, i) =>
                        i === index ? {...v, length: e.target.value} : v
                      )
                    )
                  }
                  className="px-3 py-2 w-9/12 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
                <select
                  required
                  className="w-3/12  px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={variant.lengthUnit}
                  onChange={(e) =>
                    setProductVariants(
                      productVariants.map((v, i) =>
                        i === index ? {...v, lengthUnit: e.target.value} : v
                      )
                    )
                  }
                >
                  <option value="" disabled>
                    Length
                  </option>
                  <option value="Meter">Meter</option>
                  <option value="Liter">Liter</option>
                  <option value="Kg">Kg</option>
                  <option value="Inch">Inch</option>
                  <option value="Centimeter">Centimeter</option>
                  <option value="Milimeter">Milimeter</option>
                </select>
              </div>
              <div className="flex gap-2 w-full">
                <input
                  type="number"
                  placeholder="Width (Optional)"
                  value={variant.width}
                  onChange={(e) =>
                    setProductVariants(
                      productVariants.map((v, i) =>
                        i === index ? {...v, width: e.target.value} : v
                      )
                    )
                  }
                  className="px-3 py-2 w-9/12 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
                />
                <select
                  required
                  className="w-3/12  px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  value={variant.widthUnit}
                  onChange={(e) =>
                    setProductVariants(
                      productVariants.map((v, i) =>
                        i === index ? {...v, widthUnit: e.target.value} : v
                      )
                    )
                  }
                >
                  <option value="" disabled>
                    Width
                  </option>
                  <option value="Meter">Meter</option>
                  <option value="Liter">Liter</option>
                  <option value="Kg">Kg</option>
                  <option value="Inch">Inch</option>
                  <option value="Centimeter">Centimeter</option>
                  <option value="Milimeter">Milimeter</option>
                </select>
              </div>
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
                      i === index ? {...t, testName: e.target.value} : t
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
                      i === index ? {...t, specifications: e.target.value} : t
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
                        ? {...t, acceptanceCriteria: e.target.value}
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
                        ? {...t, rejectionCriteria: e.target.value}
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
                      i === index ? {...t, instrument: e.target.value} : t
                    )
                  )
                }
                className="mb-2 block w-full px-3 py-2 border border-gray-300 bg-gray-50 shadow-sm rounded-md focus:outline-none focus:ring-themeColor focus:border-themeColor"
              >
                <option value="">Select Instrument/Chemical/Media</option>
                {testIncrediantList.map((icm) => (
                  <option key={icm._id} value={icm._id}>
                    {icm.chemicalName || icm.instrumentName || icm.mediaName}
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

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'SAVE'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
