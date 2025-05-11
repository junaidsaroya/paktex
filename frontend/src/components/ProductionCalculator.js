import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';
import {message} from 'antd';

const ProductionCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [rollLength, setRollLength] = useState('');
  const [rollWidth, setRollWidth] = useState('');
  const [widthUnit, setWidthUnit] = useState('cm');
  const [numRolls, setNumRolls] = useState('');
  const [bandageLength, setBandageLength] = useState('');
  const [bandageLengthUnit, setBandageLengthUnit] = useState('');
  const [bandageWidth, setBandageWidth] = useState('');
  const [bandageWidthUnit, setBandageWidthUnit] = useState('');
  const [packSize, setPackSize] = useState('');
  const [totalPacks, setTotalPacks] = useState(0);
  const [batches, setBatches] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [sterile, setSterile] = useState(true);
  const [batchStartDate, setBatchStartDate] = useState('');
  const [batchEndDate, setBatchEndDate] = useState('');
  const [totalMaterialUsage, setTotalMaterialUsage] = useState(0);
  const [perPackMaterial, setPerPackMaterial] = useState('');

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await apiClient.get('/batch/getAllBatch');
        setBatches(response.data || []);
      } catch (error) {
        console.error('Error fetching batches:', error);
        message.error('Failed to fetch batches.');
      }
    };

    fetchBatches();
  }, []);

  const handleProductSelection = (e) => {
    const selectedBatchId = e.target.value;
    const selectedBatchData = batches.find(
      (batch) => batch._id === selectedBatchId
    );
    if (selectedBatchData) {
      setSelectedProduct(selectedBatchData.productName);
      setSelectedProductId(selectedBatchData._id);
      setSelectedBatch(selectedBatchData.batchNumber);
      setSterile(selectedBatchData.sterile);
      setBatchStartDate(selectedBatchData.startDate);
      setBatchEndDate(selectedBatchData.endDate);
    } else {
      setSelectedProduct('');
      setSelectedProductId('');
      setSelectedBatch('');
      setSterile(true); // Reset to default
    }
  };

  const convertToCm = (value, unit) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) return 0;

    switch (unit) {
      case 'inch':
        return numValue * 2.54;
      case 'foot':
        return numValue * 30.48;
      case 'meter':
        return numValue * 100;
      case 'mm':
        return numValue / 10;
      default:
        return numValue;
    }
  };

  const calculateProduction = () => {
    const rollWidthCm = convertToCm(rollWidth, widthUnit);
    const rollLengthCm = parseFloat(rollLength) * 100;
    const numRollsValue = parseInt(numRolls, 10);
    const bandageLengthCm = convertToCm(bandageLength, bandageLengthUnit);
    const bandageWidthCm = convertToCm(bandageWidth, bandageWidthUnit);

    if (
      !rollLengthCm ||
      !rollWidthCm ||
      !numRollsValue ||
      !packSize ||
      !bandageLengthCm ||
      !bandageWidthCm
    ) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const totalRollArea = rollLengthCm * rollWidthCm * numRollsValue;

    const bandageArea = bandageLengthCm * bandageWidthCm;

    const totalBandages = Math.floor(totalRollArea / bandageArea);

    const totalBandagePacks = Math.floor(totalBandages / packSize) / 100;

    const materialUsagePerPack = totalRollArea / totalBandagePacks / 100;

    setTotalPacks(totalBandagePacks);
    setTotalMaterialUsage(totalRollArea);
    setPerPackMaterial(materialUsagePerPack);
  };

  const requestMaterialFromStore = async (e) => {
    e.preventDefault();
    setLoading(true);

    const requestData = {
      productName: selectedProduct,
      requestMaterial: totalMaterialUsage,
    };

    try {
      await apiClient.patch('store/add-request', requestData);
      message.success('Request sent to Store!');
    } catch (error) {
      console.error('Error adding request:', error);
      message.error('Failed to request.');
    } finally {
      setLoading(false);
    }
  };

  const sendProduction = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productionData = {
      productName: selectedProduct,
      batchNumber: selectedBatch,
      sterile,
      startDate: batchStartDate,
      endDate: batchEndDate,
      totalPacks,
      totalMaterialUsage,
      bandageLength,
      bandageWidth,
      packSize,
      perPackMaterial,
    };

    try {
      await apiClient.post('/production/production', productionData);
      message.success('Send to production successfully!');
      setSelectedProduct('');
      setSelectedProductId('');
      setSelectedBatch('');
      setRollWidth('');
      setWidthUnit('cm');
      setNumRolls('');
      setBandageLength('');
      setBandageLengthUnit('');
      setBandageWidth('');
      setBandageWidthUnit('');
    } catch (error) {
      console.error('Error adding production:', error);
      message.error('Failed to production.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg py-2 px-3 border-2">
      <h1 className="text-themeColor font-bold text-lg flex justify-start">
        Production Calculator
      </h1>
      <div className="bg-gray-50 border-2 rounded-lg w-full p-4 my-2 flex justify-around">
        <span>
          <h1 className="text-gray-800 text-md">Total Packs</h1>
          <p className="font-semibold text-xl">{totalPacks}</p>
        </span>
        <span>
          <h1 className="text-gray-800 text-md">Total Material</h1>
          <p className="font-semibold text-xl">{totalMaterialUsage}</p>
        </span>
      </div>

      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2 text-left">
            Product:
            <select
              required
              value={selectedProductId}
              onChange={handleProductSelection}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
            >
              <option value="" disabled>
                Select Product
              </option>
              {batches.map((batch) => (
                <option key={batch._id} value={batch._id}>
                  {batch.productName}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2 text-left">
            Batch Number:
            <input
              type="text"
              value={selectedBatch}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
            />
          </label>
        </div>
      </div>

      {sterile ? (
        <>
          <div className="flex gap-2 w-full">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2 text-left">
                Jumbo Roll Length (Meter):
                <input
                  type="number"
                  value={rollLength}
                  onChange={(e) => setRollLength(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
                />
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2 text-left">
                Jumbo Roll Width:
                <div className="flex w-full gap-2">
                  <input
                    type="number"
                    value={rollWidth}
                    onChange={(e) => setRollWidth(e.target.value)}
                    className="mt-1 block w-8/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
                  />
                  <select
                    value={widthUnit}
                    onChange={(e) => setWidthUnit(e.target.value)}
                    className="mt-1 block w-4/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
                  >
                    <option value="cm">cm</option>
                    <option value="inch">Inch</option>
                    <option value="meter">Meter</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2 text-left">
                Pack Size:
                <input
                  type="number"
                  value={packSize}
                  onChange={(e) => setPackSize(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
                />
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2 text-left">
                Number of Jumbo Rolls:
                <input
                  type="number"
                  value={numRolls}
                  onChange={(e) => setNumRolls(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
                />
              </label>
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2 text-left">
                Bandage Length (Meter):
                <div className="flex w-full gap-2">
                  <input
                    type="number"
                    value={bandageLength}
                    onChange={(e) => setBandageLength(e.target.value)}
                    className="mt-1 block w-8/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
                  />
                  <select
                    value={bandageLengthUnit}
                    onChange={(e) => setBandageLengthUnit(e.target.value)}
                    className="mt-1 block w-4/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
                  >
                    <option value="cm">CM</option>
                    <option value="mm">MiliMeter</option>
                    <option value="meter">Meter</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2 text-left">
                Bandage Width:
                <div className="flex w-full gap-2">
                  <input
                    type="number"
                    value={bandageWidth}
                    onChange={(e) => setBandageWidth(e.target.value)}
                    className="mt-1 block w-8/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
                  />
                  <select
                    value={bandageWidthUnit}
                    onChange={(e) => setBandageWidthUnit(e.target.value)}
                    className="mt-1 block w-4/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
                  >
                    <option value="cm">CM</option>
                    <option value="mm">MiliMeter</option>
                  </select>
                </div>
              </label>
            </div>
          </div>
        </>
      ) : null}

      <div className="flex gap-2 justify-center">
        <button
          onClick={calculateProduction}
          className="w-44 bg-themeGradient hover:bg-themeGradientHover text-white font-bold py-2 px-4 my-5 rounded-md"
        >
          Calculate
        </button>
        <button
          onClick={requestMaterialFromStore}
          className="w-44 bg-themeGradient hover:bg-themeGradientHover text-white font-bold py-2 px-4 my-5 rounded-md"
        >
          Request From Store
        </button>
        <button
          onClick={sendProduction}
          className="w-44 bg-themeGradient hover:bg-themeGradientHover text-white font-bold py-2 px-4 my-5 rounded-md"
        >
          Send To Production
        </button>
      </div>
    </div>
  );
};

export default ProductionCalculator;
