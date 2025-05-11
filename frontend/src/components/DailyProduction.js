import {message} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';
import dayjs from 'dayjs';

const DailyProduction = () => {
  const [productionList, setProductionList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [todayPacks, setTodayPacks] = useState('');
  const [packSize, setPackSize] = useState('');
  const [perPackMaterial, setPerPackMaterial] = useState('');

  useEffect(() => {
    const fetchProductions = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/production/production');
        const allProductions = response.data || [];

        const today = dayjs().format('YYYY-MM-DD');

        const todaysProductions = allProductions.filter(
          (item) => dayjs(item.createdAt).format('YYYY-MM-DD') === today
        );

        setProductionList(todaysProductions);
      } catch (error) {
        console.error('Error fetching production list:', error);
        message.error('Failed to fetch production list.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductions();
  }, []);

  const handleEditClick = (production) => {
    setEditingId(production._id);
    setTodayPacks(production.todayPacks);
    setPackSize(production.packSize);
    setPerPackMaterial(production.perPackMaterial);
  };
  const handleCancelClick = () => {
    setEditingId('');
    setTodayPacks('');
  };

  const handleSaveClick = async (production) => {
    try {
      const bandageArea =
        production.bandageLength * 100 * production.bandageWidth;
      const totalBandages = packSize * perPackMaterial;
      const todayMaterialUsage = Math.floor(
        (totalBandages * bandageArea) / 10000
      );
      const response = await apiClient.patch(
        `/production/production/${production._id}`,
        {
          todayPacks: Number(todayPacks),
          todayMaterialUsage: todayMaterialUsage,
        }
      );

      setProductionList((prevList) =>
        prevList.map((item) =>
          item._id === production._id
            ? {...item, ...response.data.production}
            : item
        )
      );

      setEditingId(null);
      message.success('Production updated successfully.');
    } catch (error) {
      console.error('Error updating production:', error);
      message.error(
        error.response?.data?.message || 'Failed to update production.'
      );
    }
  };
  return (
    <div className="">
      <div className="relative">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600 text-sm border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Batch Number</th>
                  <th className="py-3 px-4">Batch Start Date</th>
                  <th className="py-3 px-4">Batch End Date</th>
                  <th className="py-3 px-4">Pack Size</th>
                  <th className="py-3 px-4">Total Packs</th>
                  <th className="py-3 px-4">Total Material</th>
                  <th className="py-3 px-4">Today's Packs</th>
                  <th className="py-3 px-4">Remaining Packs</th>
                  <th className="py-3 px-4">Remaining Material</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : productionList.length > 0 ? (
                  productionList.map((production) => (
                    <tr
                      key={production._id}
                      className="hover:bg-gray-50 transition-colors duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">{production.productName}</td>
                      <td className="py-4 px-4">{production.batchNumber}</td>
                      <td className="py-4 px-4">
                        {new Date(production.startDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        {new Date(production.endDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">{production.packSize}</td>
                      <td className="py-4 px-4">{production.totalPacks}</td>
                      <td className="py-4 px-4">
                        {production.totalMaterialUsage}
                      </td>
                      <td className="py-4 px-4">
                        {editingId === production._id ? (
                          <input
                            type="number"
                            value={todayPacks}
                            onChange={(e) => setTodayPacks(e.target.value)}
                            className="w-20 p-1 border rounded"
                          />
                        ) : (
                          production.todayPacks
                        )}
                      </td>
                      <td className="py-4 px-4">{production.remainingPacks}</td>
                      <td className="py-4 px-4">
                        {production.remainingMaterialUsage}
                      </td>

                      <td className="py-4 px-4">
                        {editingId === production._id ? (
                          <div className="flex gap-2">
                            <i
                              className="fa-solid fa-floppy-disk cursor-pointer"
                              onClick={() => handleSaveClick(production)}
                            ></i>
                            <i
                              class="fa-solid fa-rectangle-xmark"
                              onClick={() => handleCancelClick(production)}
                            ></i>
                          </div>
                        ) : (
                          <i
                            className="fa-solid fa-pen-to-square cursor-pointer"
                            onClick={() => handleEditClick(production)}
                          ></i>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <div className="flex flex-col items-center justify-center my-10">
                        <i className="fa-solid fa-box-open text-gray-400 text-5xl"></i>
                        <p className="text-gray-400 mt-4">
                          No production order found
                        </p>
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

export default DailyProduction;
