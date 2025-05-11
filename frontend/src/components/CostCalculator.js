const CostCalculator = () => {
  return (
    <div className="bg-blue-50 rounded-lg py-2 px-3 border-2">
      <h1 className="text-themeColor font-bold text-lg flex justify-start">
        Cost Calculator
      </h1>
      <div className="bg-gray-50 border-2 rounded-lg w-full p-4 my-2 flex justify-around">
        <span>
          <h1 className="text-gray-800 text-md">Total Cost</h1>
          <p className="font-semibold text-xl">0</p>
        </span>
        <span>
          <h1 className="text-gray-800 text-md">Total Time</h1>
          <p className="font-semibold text-xl">0</p>
        </span>
      </div>

      <div className="w-full">
        <label className="block text-gray-700 mb-2 text-left">
          Required Cost:
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </label>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2 text-left">
            Cloth Length:
            <div className="flex w-full gap-1">
              <input
                type="number"
                className="mt-1 block w-7/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
              />
              <select className="mt-1 block w-5/12 px-3 py-2 border border-gray-300 bg-white rounded-md">
                <option value="cm">cm</option>
                <option value="inch">Inch</option>
                <option value="meter">Meter</option>
                <option value="foot">Foot</option>
              </select>
            </div>
          </label>
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2 text-left">
            Cloth Width:
            <div className="flex w-full gap-1">
              <input
                type="number"
                className="mt-1 block w-7/12 px-3 py-2 border border-gray-300 bg-white rounded-md"
              />
              <select className="mt-1 block w-5/12 px-3 py-2 border border-gray-300 bg-white rounded-md">
                <option value="cm">cm</option>
                <option value="inch">Inch</option>
                <option value="meter">Meter</option>
                <option value="foot">Foot</option>
              </select>
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Blister Paper"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <input
            type="number"
            placeholder="PVC Filer"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Unit Box"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-2 w-full border-t border-gray-400 pt-2 mt-2">
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Shipper"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Unit Tape"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Shipper Tape"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
      </div>
      <div className="flex gap-2 w-full border-t border-gray-400 pt-2 mt-2">
        <div className="w-1/2">
          <input
            type="number"
            placeholder="Workers"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md"
          />
        </div>
      </div>
      <div>
        <button className="w-40 bg-themeColor text-white font-bold py-2 px-4 my-5 rounded-md">
          Calculate
        </button>
      </div>
    </div>
  );
};

export default CostCalculator;
