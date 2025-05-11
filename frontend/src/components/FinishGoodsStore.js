import {message, Popconfirm} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';

const FinishGoodsStore = () => {
  const [finishGoodList, setFinishGoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchFinishGoodList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/finishGoodStore/finishGoodStore');
      const finishGoodsData = response.data || [];
      setFinishGoodList(finishGoodsData);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFinishGoodList();
  }, []);
  const handleDispatch = async (etoSterlization) => {
    try {
      await apiClient.post('/dispatch/dispatch', {
        productName: etoSterlization.productName,
        batchNo: etoSterlization.batchNo,
      });
      message.success('Send To Dispatch successfully.');
      fetchFinishGoodList();
      deleteFromFinishGoodStore(etoSterlization);
    } catch (error) {
      message.error('Failed to send.');
    }
  };
  const deleteFromFinishGoodStore = async (etoSterlization) => {
    try {
      await apiClient.delete(
        `/finishGoodStore/finishGoodStore/${encodeURIComponent(
          etoSterlization._id
        )}`
      );
    } catch (error) {
      console.error('Error deleting batch:', error);
      message.error('Failed to delete batch.');
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
                  <th className="py-3 px-4">Batch Number</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : finishGoodList.length > 0 ? (
                  finishGoodList.map((etoSterlization) => (
                    <tr
                      key={etoSterlization._id}
                      className="hover:bg-gray-50 transition-colors text-center duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">
                        {etoSterlization.productName}
                      </td>
                      <td className="py-4 px-4">{etoSterlization.batchNo}</td>
                      <td className="py-4 px-4">
                        <Popconfirm
                          title="Are you sure you want to send this product to dispatch bay?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => handleDispatch(etoSterlization)}
                        >
                          <button className="py-1 px-4 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm">
                            Send To Dispatch
                          </button>
                        </Popconfirm>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">
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

export default FinishGoodsStore;
