import React from "react";

const ProductionDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 w-full">
      {/* Products Card */}
      <div className="py-2 px-4 bg-blue-100 shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="text-left">
          <h2 className="text-xl font-bold text-blue-900">Active Batches</h2>
          <p className="text-black text-xl font-semibold">4</p>
        </div>
      </div>

      {/* Chemical Card */}
      <div className="py-2 px-4 bg-red-100 shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="text-left">
          <h2 className="text-xl font-bold text-red-800">
            Today's Production
          </h2>
          <p className="text-black text-xl font-semibold">520</p>
          <p className="text-gray-700 text-md font-semibold">Units Produced</p>
        </div>
      </div>

      {/* Instrument Card */}
      <div className="py-2 px-4 bg-green-100 shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition duration-300">
        <div className="text-left">
          <h2 className="text-xl font-bold text-green-800">Material Usage</h2>
          <p className="text-black text-xl font-semibold">654</p>
          <p className="text-gray-700 text-md font-semibold">Meter Used</p>
        </div>
      </div>
    </div>
  );
};

export default ProductionDashboard;
