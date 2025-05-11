import {message} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

const ETOSterilization = () => {
  const [etoSterlizationList, setETOSterlizationList] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [processingProduct, setProcessingProduct] = useState('');
  const [loading, setLoading] = useState('');
  const [manufactureDate, setManufactureDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [productName, setProductName] = useState('');
  const [cycleNumber, setCycleNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [cylinderLotNumber, setCylinderLotNumber] = useState('');
  const [cylinderNumber, setCylinderNumber] = useState('');
  const [initialWeight, setInitialWeight] = useState('');
  const [finalWeight, setFinalWeight] = useState('');
  const [gasConsume, setGasConsume] = useState('');
  const [etoExposureDuration, setEtoExposureDuration] = useState('');
  const [sterlizationTemperature, setSterlizationTemperature] = useState('');
  const [gasExposureTemperature, setGasExposureTemperature] = useState('');
  useEffect(() => {
    if (initialWeight && finalWeight) {
      const consumed = parseFloat(initialWeight) - parseFloat(finalWeight);
      setGasConsume(consumed.toFixed(2));
    } else {
      setGasConsume('');
    }
  }, [initialWeight, finalWeight]);
  const handleCancel = () => {
    setSelectedProduct(null);
    setProcessingProduct(null);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await apiClient.get('/batch/getAllBatch');
        const activeBatch = response1.data.filter(
          (batch) => batch.status === true
        );

        const products = activeBatch;

        const response2 = await apiClient.get('/finishProduct/finishProduct');
        const productName =
          response2.data.data.length > 0
            ? response2.data.data[0].productName
            : '';

        const matchedProduct = products.find(
          (product) =>
            product.productName === productName && product.sterile === true
        );

        setProducts(matchedProduct ? [matchedProduct] : []);
      } catch (error) {
        message.error('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);
  const handleProductSelection = (event) => {
    const selectedValue = event.target.value;
    const selectedProductObj = products.find(
      (product) => product.productName === selectedValue
    );
    setSelectedProduct(selectedProductObj);
  };
  const handleSearch = async () => {
    if (!selectedProduct) {
      message.error('Please select product.');
      return;
    }
    setLoading(true);

    try {
      const response = await apiClient.get(
        '/intimateProduct/getAllIntimateProducts'
      );
      const products = response.data.data || [];

      const selectedProductData = products.find(
        (product) => product.productName === selectedProduct.productName
      );
      setProductName(selectedProductData.productName);
      setProcessingProduct(selectedProductData || []);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  const fetchETOSterlizationList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/etoSterlization/etoSterlization');
      const etoSterlizationData = response.data.data || [];

      setETOSterlizationList(etoSterlizationData);

      generateCycleNumber(etoSterlizationData);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  const generateCycleNumber = (etoSterlizationList) => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const monthLetters = 'ABCDEFGHIJKL';
    const currentMonth = monthLetters[new Date().getMonth()];

    let newCycleNumber = `${currentYear}${currentMonth}0001`;

    if (etoSterlizationList.length > 0) {
      const lastCycleNumber =
        etoSterlizationList[etoSterlizationList.length - 1].cycleNumber;
      const lastNumber = parseInt(lastCycleNumber.slice(-4), 10) + 1;
      newCycleNumber = `${currentYear}${currentMonth}${String(
        lastNumber
      ).padStart(4, '0')}`;
    }

    setCycleNumber(newCycleNumber);
  };
  useEffect(() => {
    fetchETOSterlizationList();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      productName,
      manufactureDate,
      cycleNumber,
      startDate,
      startTime,
      endDate,
      endTime,
      cylinderLotNumber,
      cylinderNumber,
      initialWeight,
      finalWeight,
      gasConsume,
      etoExposureDuration,
      sterlizationTemperature,
      gasExposureTemperature,
      batchNumber: selectedProduct?.batchNumber,
    };

    try {
      await apiClient.post('/etoSterlization/etoSterlization', payload);
      setManufactureDate('');
      setCycleNumber();
      setProductName('');
      setSelectedProduct('');
      setProcessingProduct('');
      setCycleNumber('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setCylinderLotNumber('');
      setCylinderNumber('');
      setInitialWeight('');
      setFinalWeight('');
      setGasConsume('');
      setEtoExposureDuration('');
      setSterlizationTemperature('');
      setGasExposureTemperature('');
      message.success('Test Saved successfully.');
      sendToQuarantineStore();
      fetchETOSterlizationList();
    } catch (error) {
      message.error('Failed to save test.');
    }
  };
  const sendToQuarantineStore = async () => {
    const payload = {
      productName,
      batchNo: selectedProduct?.batchNumber,
    };

    try {
      await apiClient.post('/etoQuarantineStore/etoQuarantineStore', payload);
      message.success('Send to ETO Quarantine Store successfully.');
      deleteFromSterileStore(processingProduct);
    } catch (error) {
      message.error('Failed to send to store.');
    }
  };
  const deleteFromSterileStore = async () => {
    try {
      await apiClient.delete(
        `/etoSterileStore/etoSterileStore/${encodeURIComponent(
          processingProduct.productName
        )}`
      );
    } catch (error) {
      console.error('Error deleting batch:', error);
      message.error('Failed to delete batch.');
    }
  };
  const handleViewReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const text = 'ETO Sterlization Report';
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(text, (pageWidth - textWidth) / 2, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 30);

    const headers = [['Product', 'Batch Number', 'Cycle Number']];
    const data = etoSterlizationList.map((eto) => [
      eto.productName || 'N/A',
      eto.batchNumber || 'N/A',
      eto.cycleNumber || 'N/A',
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 35,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: 'center',
      },
      headStyles: {
        fillColor: [65, 184, 72],
        textColor: 255,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: {halign: 'left'},
        1: {halign: 'center'},
        2: {halign: 'center'},
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = pdfUrl;
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.download = 'ETOSterlization_report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="text-start">
      <div className="mb-4 flex justify-between">
        <div className="flex gap-2">
          <select
            required
            value={selectedProduct ? selectedProduct.productName : ''}
            onChange={handleProductSelection}
            className="block w-52 px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
          >
            <option value="" disabled selected>
              Select Product
            </option>
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product._id} value={product.productName}>
                  {product.productName}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No Batch Available
              </option>
            )}
          </select>
          {selectedProduct && (
            <div className="block w-52 px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
              {selectedProduct?.batchNumber}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleViewReport}
            className="text-black border border-[#DCE3E3] px-3 py-1 rounded-md flex items-center gap-2"
          >
            <i className="fa-solid fa-eye text-lg"></i>
            <span>View Report</span>
          </button>
          <button
            type="submit"
            onClick={handleSearch}
            className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2"
          >
            Search
          </button>
        </div>
      </div>

      {processingProduct && (
        <div className="p-2 border border-gray-300 rounded-md shadow-sm">
          <div className="w-full p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Product Name:
                  </span>{' '}
                  {processingProduct.productName}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Manufacture Date:
                  </span>{' '}
                  <input
                    type="date"
                    required
                    value={manufactureDate}
                    onChange={(e) => setManufactureDate(e.target.value)}
                    className="max-w-96 w-52 px-3 py-1 border-b border-gray-400 bg-transparent focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  />
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Supplier Name:
                  </span>{' '}
                  {processingProduct.supplierName}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Cycle Number:
                  </span>{' '}
                  {cycleNumber}
                </div>
              </div>

              <div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">Gr No:</span>{' '}
                  {processingProduct.grNumber}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Receive Date:
                  </span>{' '}
                  {
                    new Date(processingProduct.receiveDate)
                      .toISOString()
                      .split('T')[0]
                  }
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">Lot No:</span>{' '}
                  {processingProduct.lotNumber}
                </div>
              </div>
            </div>
          </div>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Sterilization Start Date:
                    <input
                      type="date"
                      required
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Cylinder Lot Number:
                    <input
                      type="text"
                      required
                      value={cylinderLotNumber}
                      onChange={(e) => setCylinderLotNumber(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Cylinder Initial Weight:
                    <input
                      type="number"
                      required
                      value={initialWeight}
                      onChange={(e) => setInitialWeight(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Gas Consume:
                    <input
                      type="number"
                      required
                      readOnly
                      value={gasConsume}
                      placeholder="Gas consume in kg"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Sterlization Temperature:
                    <input
                      type="number"
                      required
                      value={sterlizationTemperature}
                      onChange={(e) =>
                        setSterlizationTemperature(e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Sterilization End Date:
                    <input
                      type="date"
                      required
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Sterilization Start Time:
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Cylinder Number:
                    <div className="flex gap-2">
                      <input
                        type="number"
                        required
                        value={cylinderNumber}
                        onChange={(e) => setCylinderNumber(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                      />
                    </div>
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Cylinder Final Weight:
                    <input
                      type="number"
                      required
                      value={finalWeight}
                      onChange={(e) => setFinalWeight(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    ETO Exposure Duration:
                    <input
                      type="number"
                      required
                      value={etoExposureDuration}
                      onChange={(e) => setEtoExposureDuration(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Gas Exposure Temperature:
                    <input
                      type="number"
                      required
                      value={gasExposureTemperature}
                      onChange={(e) =>
                        setGasExposureTemperature(e.target.value)
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Sterilization End Time:
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-10 justify-center flex gap-2">
              <button
                type="submit"
                onClick={handleCancel}
                className="py-2 px-6 w-40 border text-gray-500 font-semibold rounded-md shadow-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="relative mt-4">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Batch Number</th>
                  <th className="py-3 px-4">Cycle Number</th>
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
                ) : etoSterlizationList.length > 0 ? (
                  etoSterlizationList.map((etoSterlization) => (
                    <tr
                      key={etoSterlization._id}
                      className="hover:bg-gray-50 transition-colors text-center duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">
                        {etoSterlization.productName}
                      </td>
                      <td className="py-4 px-4">
                        {etoSterlization.batchNumber}
                      </td>
                      <td className="py-4 px-4">
                        {etoSterlization.cycleNumber}
                      </td>
                      <td className="py-4 px-4">
                        <i class="fa-regular fa-eye p-2 border border-gray-300 rounded-md hover:bg-white"></i>
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

export default ETOSterilization;
