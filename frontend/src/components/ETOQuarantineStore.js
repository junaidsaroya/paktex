import {message} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';

const ETOQuarantineStore = () => {
  const [etoQuarantineList, setETOQuarantineList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchETOQuarantineList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        '/etoQuarantineStore/etoQuarantineStore'
      );
      const etoQuarantineData = response.data || [];
      setETOQuarantineList(etoQuarantineData);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchETOQuarantineList();
  }, []);

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
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : etoQuarantineList.length > 0 ? (
                  etoQuarantineList.map((etoQuarantine) => (
                    <tr
                      key={etoQuarantine._id}
                      className="hover:bg-gray-50 transition-colors text-center duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">{etoQuarantine.productName}</td>
                      <td className="py-4 px-4">{etoQuarantine.batchNo}</td>
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

export default ETOQuarantineStore;
