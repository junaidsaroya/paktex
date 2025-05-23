import {Popconfirm, message} from 'antd';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import apiClient from '../utils/interceptor';
import ProductionCalculator from '../components/ProductionCalculator';

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/batch/getAllBatch');
        setBatches(response.data || []);
      } catch (error) {
        console.error('Error fetching batches:', error);
        message.error('Failed to fetch batches.');
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleRefresh = () => {
    setStatus('');
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/batch/deletebatch/${id}`);
      message.success('Batch deleted successfully!');
      setBatches(batches.filter((batch) => batch._id !== id));
    } catch (error) {
      console.error('Error deleting batch:', error);
      message.error('Failed to delete batch.');
    }
  };
  const handleStatusToggle = async (id, currentStatus) => {
    try {
      await updateStatus(id, !currentStatus);
      setBatches((prevBatches) =>
        prevBatches.map((batch) =>
          batch._id === id ? {...batch, status: !currentStatus} : batch
        )
      );
    } catch (error) {
      console.error('Failed to update batch status:', error);
      message.error('Error updating batch status.');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await apiClient.patch(`/batch/updateBatchStatus/${id}`, {
        status,
      });
      return response.data;
    } catch (error) {
      console.error('Error updating batch status:', error);
      throw error;
    }
  };

  const filteredBatches = batches.filter((batch) => {
    const statusMatch = status === '' || batch.status.toString() === status;
    return statusMatch;
  });

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div style={{fontFamily: 'Roboto, sans-serif'}}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            Batches
          </h1>
          <p className="text-xs text-gray-500 font-semibold">
            Manage your batches
          </p>
        </div>
        <div className="flex gap-3 items-center mt-2 md:mt-0">
          <button
            onClick={handleRefresh}
            className="text-black border border-[#DCE3E3] px-3 py-1 rounded-md mb-4 md:mb-0"
          >
            <i className="fa-solid fa-arrow-rotate-right text-lg"></i>
          </button>
          <Link to="/addBatch">
            <button className="bg-themeGradient hover:bg-themeGradientHover text-white px-2 py-1 rounded-md mb-4 md:mb-0 flex items-center">
              <i className="fa-solid fa-plus text-xl"></i>
              <span className="font-semibold ms-2">Add Batch</span>
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
            className="w-full rounded-md px-3 py-2 border border-gray-300 bg-gray-50 focus:outline-none focus:ring-themeColor focus:border-themeColor"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <div className="relative w-1/2">
          <div className="max-h-[500px] scrollbar-hide">
            <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Batch No</th>
                    <th className="py-3 px-4">Batch Size</th>
                    <th className="py-3 px-4">Product Size</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredBatches.length > 0 ? (
                    filteredBatches.map((batch) => (
                      <tr
                        key={batch._id}
                        className="hover:bg-gray-50 transition-colors duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                      >
                        <td className="py-4 px-4">{batch.productName}</td>
                        <td className="py-4 px-4">{batch.batchNumber}</td>
                        <td className="py-4 px-4">{batch.batchLength}</td>
                        <td className="py-4 px-4">
                          {batch.productSize.length > 0 && (
                            <>
                              {batch.productSize[0].length}{' '}
                              {batch.productSize[0].lengthType} {'/'}
                              {batch.productSize[0].width}{' '}
                              {batch.productSize[0].widthType}
                            </>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center">
                            <div
                              className={`relative inline-block w-11 h-5 transition duration-200 ease-linear rounded-full cursor-pointer ${
                                batch.status ? 'bg-themeColor' : 'bg-gray-300'
                              }`}
                              onClick={() =>
                                handleStatusToggle(batch._id, batch.status)
                              }
                            >
                              <span
                                className={`absolute block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                                  batch.status
                                    ? 'translate-x-6'
                                    : 'translate-x-0'
                                }`}
                              ></span>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 space-x-2">
                          <div className="flex gap-2 justify-center">
                            <Popconfirm
                              title="Are you sure you want to delete this product?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={() => handleDelete(batch._id)}
                            >
                              <button className="py-1 px-4 bg-redGradient hover:bg-redGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2">
                                <i className="fa-regular fa-trash-can pr-2"></i>{' '}
                                Delete
                              </button>
                            </Popconfirm>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">
                        <div className="flex flex-col items-center justify-center my-10">
                          <i className="fa-solid fa-box-open text-gray-400 text-5xl"></i>
                          <p className="text-gray-400 mt-4">No batch found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <ProductionCalculator />
        </div>
      </div>
    </div>
  );
};

export default BatchManagement;
