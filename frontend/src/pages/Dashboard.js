import TotalCounts from '../components/TotalCounts';
import IntimateProgressChart from '../components/IntimateProgressChart';

const Dashboard = () => {
  return (
    <div className="bg-white rounded-xl min-h-[100%] flex flex-col border-2 border-gray-200 p-5  gap-4">
      <TotalCounts />

      <IntimateProgressChart />
    </div>
  );
};

export default Dashboard;
