import {Empty, message, Popconfirm} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';

const DispatchBay = () => {
  const [dispacthMaterialList, setDispatchMaterialList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDispatchMaterialList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/dispatch/dispatch');
      const dispatchData = response.data || [];
      setDispatchMaterialList(dispatchData);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDispatchMaterialList();
  }, []);
  const handleDispatch = async (id) => {
    try {
      await apiClient.put(`/dispatch/dispatch/${id}`);
      message.success('Dispatch Successfully!');
      fetchDispatchMaterialList();
    } catch (error) {
      console.error('Error processing request:', error);
      message.error();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div style={{fontFamily: 'Roboto, sans-serif'}}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            Dispatch
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            View your dispatched products
          </p>
        </div>
        <div className="flex gap-2">
          <button className="bg-themeGradient hover:bg-themeGradientHover text-white px-4 py-2 rounded-md mb-4 md:mb-0">
            <span className="font-semibold">View Report</span>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <div className="min-w-[800px] sm:min-w-full rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-600 text-start font-semibold">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Batch Number</th>
                    <th className="py-3 px-4">Dispatch By</th>
                    <th className="py-3 px-4">Dispatch Date</th>
                    <th className="py-3 px-4">Dispatch Quantity</th>
                    <th className="py-3 px-4">Dispatch to</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : dispacthMaterialList.length > 0 ? (
                    dispacthMaterialList.map((product) => (
                      <tr
                        key={product._id}
                        className="hover:bg-gray-50 border-t transition-colors duration-200 bg-white divide-y divide-gray-200 text-gray-600"
                      >
                        <td className="py-4 px-4">
                          {product.productName || 'N/A'}
                        </td>{' '}
                        <td className="py-4 px-4">
                          {product.batchNo || 'N/A'}
                        </td>
                        <td className="py-4 px-4">
                          {product.dispatchBy || ''}
                        </td>
                        <td className="py-4 px-4">
                          {product.dispatchDate
                            ? product.dispatchDate.split('T')[0]
                            : ''}
                        </td>
                        <td className="py-4 px-4">
                          {product.dispatchBy || ''}
                        </td>
                        <td className="py-4 px-4">
                          {product.dispatchBy || ''}
                        </td>
                        <td className="py-4 px-4">
                          <Popconfirm
                            title="Are you sure you want to dispatch this product?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => handleDispatch(product._id)}
                          >
                            <button className="py-1 px-4 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm">
                              Dispatch
                              <i class="ms-2 fa-solid fa-truck-fast"></i>
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-5">
                        <Empty description="No Products Found to Dispatch" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DispatchBay;
