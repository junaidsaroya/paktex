import React, { useState } from 'react'
import ProductionDashboard from '../components/ProductionDashboard';
import DailyProduction from '../components/DailyProduction';

const Production = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <div> <ProductionDashboard/> </div>;
      case "dailyProduction":
        return <div> <DailyProduction/> </div>;
      default:
        return <div>Select a tab to see content</div>;
    }
  };
  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border border-2 border-gray-200">
      {/* Tab Navigation */}
      <ul className="flex border-b border-gray-300 mb-2">
        {[
          { key: "dashboard", label: "Dashboard" },
          { key: "dailyProduction", label: "Daily Production" },
        ].map(({ key, label }) => (
          <li key={key} className="mr-2">
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                activeTab === key
                  ? "border-b-2 border-themeColor text-themeColor"
                  : "text-[#696A71]"
              }`}
              onClick={() => handleTabChange(key)}
            >
              <h5 className="text-start">{label}</h5>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5">
        {/* Render content based on the selected tab */}
        {renderTabContent()}
      </div>
    </div>
  )
}

export default Production