import React, {useState} from 'react';
import RawMaterialStore from '../components/RawMaterialStore';
import PackingMaterialStore from '../components/PackingMaterialStore';
import ChemicalMaterialStore from '../components/ChemicalMaterialStore';
import ETOQuarantineStore from '../components/ETOQuarantineStore';
import FinishGoodsStore from '../components/FinishGoodsStore';
import ETOSterlizationStore from '../components/ETOSterlizationStore';

const Stores = () => {
  const [activeTab, setActiveTab] = useState('rawMaterial');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rawMaterial':
        return (
          <div>
            {' '}
            <RawMaterialStore />{' '}
          </div>
        );
      case 'packingMaterial':
        return (
          <div>
            {' '}
            <PackingMaterialStore />{' '}
          </div>
        );
      case 'chemicalMaterial':
        return (
          <div>
            {' '}
            <ChemicalMaterialStore />{' '}
          </div>
        );
      case 'etoStoreForSterlization':
        return (
          <div>
            {' '}
            <ETOSterlizationStore />{' '}
          </div>
        );
      case 'etoQuarantineStore':
        return (
          <div>
            {' '}
            <ETOQuarantineStore />{' '}
          </div>
        );
      case 'finishGoodsStore':
        return (
          <div>
            {' '}
            <FinishGoodsStore />{' '}
          </div>
        );
      default:
        return <div>Select a tab to see content</div>;
    }
  };
  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200">
      <ul className="flex border-b border-gray-300 mb-2">
        {[
          {key: 'rawMaterial', label: 'Raw Material'},
          {key: 'packingMaterial', label: 'Packing Material'},
          {key: 'chemicalMaterial', label: 'Chemical Material'},
          {key: 'etoStoreForSterlization', label: 'ETO Store For Sterlize'},
          {key: 'etoQuarantineStore', label: 'ETO Quarantine Store'},
          {key: 'finishGoodsStore', label: 'Finish Goods Store'},
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

export default Stores;
