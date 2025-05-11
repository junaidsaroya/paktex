import {message, Modal} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';

const Qms = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleFileUpload = async () => {
    if (!file || !selectedProduct) {
      message.error('Please select a file and product.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('productName', selectedProduct);

    try {
      await apiClient.post('/qms/qms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('File uploaded successfully!');
      setFile(null);
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      message.error('File upload failed.');
    }
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/product/getAllProducts');

        setProducts(response.data.data || []);
      } catch (error) {
        message.error('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
    setFile(null);
  };

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200">
      <div style={{fontFamily: 'Roboto, sans-serif'}}>
        <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
          QMS
        </h1>
        <p className="text-xs text-gray-500 text-start font-semibold">
          Quality Management System
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 border rounded-lg shadow cursor-pointer bg-gray-100"
            onClick={() => {
              setSelectedProduct(product.productName);
              setIsModalVisible(true);
            }}
          >
            <h2 className="font-semibold text-themeColor">
              {product.productName}
            </h2>
          </div>
        ))}
      </div>

      <Modal
        title={`Upload File to ${selectedProduct}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
      >
        <div className="mt-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded w-full"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Qms;
