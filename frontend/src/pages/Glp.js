import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Glp = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();

  const reportOptions = {
    'Production Reports': ['AC'],
    'Lab Reports': ['Test Results', 'Quality Check', 'Raw Material Testing'],
    'Housekeeping Reports': [
      'Cleaning Logs',
      'Safety Audit',
      'Waste Management',
    ],
  };

  const handleReportClick = (option) => {
    if (option === 'AC') {
    }
  };

  return (
    <div className="px-4 py-2 rounded-xl bg-white h-full border-2 border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <div style={{fontFamily: 'Roboto, sans-serif'}}>
          <h1 className="font-bold text-lg md:text-xl text-start text-themeColor">
            GLP
          </h1>
          <p className="text-xs text-gray-500 font-semibold">View Reports</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {Object.keys(reportOptions).map((report) => (
          <div key={report} className="relative">
            <div
              className="p-4 border rounded-lg shadow cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
              onClick={() =>
                setSelectedReport(selectedReport === report ? null : report)
              }
            >
              <h2 className="font-semibold text-themeColor">{report}</h2>
            </div>

            {selectedReport === report && (
              <div className="absolute z-10 mt-2 w-full bg-white border rounded-lg shadow-md">
                {reportOptions[report].map((option) => (
                  <div
                    key={option}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleReportClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Glp;
