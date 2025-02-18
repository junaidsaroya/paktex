import React from "react";
import TotalCounts from "../components/TotalCounts";
import IntimateProgressChart from "../components/IntimateProgressChart";

const Dashboard = () => {
  return (
    <div className="bg-white min-h-full rounded-xl border border-2 border-gray-200 p-5 flex flex-col space-y-3">
      <div>
        <TotalCounts />
      </div>
      <div className="w-full flex gap-3">
        <div className="w-8/12"></div>
        <div className="w-4/12">
          <IntimateProgressChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
