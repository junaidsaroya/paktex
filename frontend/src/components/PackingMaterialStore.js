import {message, Popconfirm} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';

const PackingMaterialStore = () => {
  const [packingMaterialList, setPackingMaterialList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPackingMaterialList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/store/store');
      const rawMaterialData = response.data || [];

      const filteredData = rawMaterialData.filter(
        (item) => item.type === 'Packing'
      );
      setPackingMaterialList(filteredData);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPackingMaterialList();
  }, []);
  const handleDispense = async (id) => {
    try {
      await apiClient.patch(`/store/process-request/${id}`);
      message.success('Material request processed successfully!');
      fetchPackingMaterialList();
    } catch (error) {
      console.error('Error processing request:', error);
      message.error();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-start">
      <div className="flex justify-end my-2">
        <button className="bg-themeGradient hover:bg-themeGradientHover text-white px-4 py-2 rounded-md mb-4 md:mb-0">
          <span className="font-semibold">View Report</span>
        </button>
      </div>
      <div className="relative">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Request</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : packingMaterialList.length > 0 ? (
                  packingMaterialList.map((packingMaterial) => (
                    <tr
                      key={packingMaterial._id}
                      className="hover:bg-gray-50 transition-colors text-center duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">
                        {packingMaterial.productName}
                      </td>
                      <td className="py-4 px-4">
                        {packingMaterial.quantity}{' '}
                        {packingMaterial.quantityUnit}
                        <td className="py-4 px-4">
                          {packingMaterial.requestMaterial &&
                          packingMaterial.requestMaterial !== '0'
                            ? `${packingMaterial.requestMaterial} Meter`
                            : ''}
                        </td>
                      </td>
                      <td className="py-4 px-4">
                        <Popconfirm
                          title="Are you sure you want to dispatch this product?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleDispense(packingMaterial._id)}
                        >
                          {packingMaterial.requestMaterial &&
                          packingMaterial.requestMaterial !== '0' ? (
                            <button className="py-1 px-4 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm">
                              Dispence
                            </button>
                          ) : null}
                        </Popconfirm>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">
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

export default PackingMaterialStore;
