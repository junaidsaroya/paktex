import {message} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';
import dayjs from 'dayjs';

const ProductionDashboard = () => {
  const [batch, setBatch] = useState('');
  const [todayProduction, setTodayProduction] = useState([]);
  useEffect(() => {
    const batchCount = async () => {
      try {
        const response = await apiClient.get('/count/batch');
        setBatch(response.data || []);
      } catch (error) {
        message.error('Failed to fetch intimate products.');
      }
    };
    const todaysProduction = async () => {
      try {
        const response = await apiClient.get('/production/production');
        const allProductions = response.data || [];

        const today = dayjs().format('YYYY-MM-DD');

        const todaysProductions = allProductions.filter(
          (item) => dayjs(item.createdAt).format('YYYY-MM-DD') === today
        );

        setTodayProduction(todaysProductions);
      } catch (error) {
        message.error(
          error.message || "Error fetching today's production data"
        );
      }
    };
    batchCount();
    todaysProduction();
  }, []);
  return (
    <div className=" flex flex-col space-y-3">
      <div className="py-2 px-4 w-full bg-blue-100 shadow-md rounded-xl border border-gray-200 transition duration-300">
        <div className="text-left flex justify-between pr-10 py-3 items-center">
          <h2 className="text-xl font-bold text-blue-900">Active Batches</h2>
          <p className="text-black text-xl font-semibold">
            {batch.activeBatches}
          </p>
        </div>
      </div>
      <div className="py-2 px-4 bg-green-100 shadow-md rounded-xl border border-gray-200 transition duration-300">
        <div className="text-left">
          <h2 className="text-xl font-bold text-green-800">
            Today's Production
          </h2>

          {todayProduction.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className=" text-gray-700 font-semibold">
                  <th className="px-4 py-2 text-left">Product</th>
                  <th className="px-4 py-2 text-center">Batch</th>
                  <th className="px-4 py-2 text-center">Packs</th>
                  <th className="px-4 py-2 text-center">Material Usage</th>
                </tr>
              </thead>
              <tbody>
                {todayProduction.map((prod) => (
                  <tr
                    key={prod._id}
                    className="border-t border-gray-400 transition-colors duration-200 text-center  text-gray-600"
                  >
                    <td className="px-4 py-2 text-black text-left">
                      {prod.productName}
                    </td>
                    <td className="px-4 py-2 text-black">{prod.batchNumber}</td>
                    <td className="px-4 py-2 text-black">{prod.todayPacks}</td>
                    <td className="px-4 py-2 text-black">
                      {prod.todayMaterialUsage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-700 text-md font-semibold">
              No production data for today.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;
