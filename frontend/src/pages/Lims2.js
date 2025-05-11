import {useState} from 'react';
import BatchRawMaterial from '../components/BatchRawMaterial';
import InProcessQC from '../components/InProcessQC';
import FinishProduct from '../components/FinishProduct';
import ETOSterilization from '../components/ETOSterilization';
import Microbiological from '../components/Microbiological';

const Lims2 = () => {
  const [activeTab, setActiveTab] = useState('batchRawMaterial');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'batchRawMaterial':
        return (
          <div>
            {' '}
            <BatchRawMaterial />{' '}
          </div>
        );
      case 'inProcessQC':
        return (
          <div>
            {' '}
            <InProcessQC />{' '}
          </div>
        );
      case 'finishProduct':
        return (
          <div>
            {' '}
            <FinishProduct />{' '}
          </div>
        );
      case 'etoSterlization':
        return (
          <div>
            {' '}
            <ETOSterilization />{' '}
          </div>
        );
      case 'microbiological':
        return (
          <div>
            {' '}
            <Microbiological />{' '}
          </div>
        );
      default:
        return <div>Select a tab to see content</div>;
    }
  };
  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200">
      {/* Tab Navigation */}
      <ul className="flex border-b border-gray-300 mb-2">
        {[
          {key: 'batchRawMaterial', label: 'Batch Raw Material'},
          {key: 'inProcessQC', label: 'In ProcessQC'},
          {key: 'finishProduct', label: 'Finish Product'},
          {key: 'etoSterlization', label: 'ETO Sterlization'},
          {key: 'microbiological', label: 'Microbiological'},
        ].map(({key, label}) => (
          <li key={key} className="mr-2">
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === key
                  ? 'border-b-2 border-themeColor text-themeColor'
                  : 'text-[#696A71]'
              }`}
              onClick={() => handleTabChange(key)}
            >
              <h5 className="text-start">{label}</h5>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5">{renderTabContent()}</div>
    </div>
  );
};

export default Lims2;
