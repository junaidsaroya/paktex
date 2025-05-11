import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';
import {message} from 'antd';
import {PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

const COLORS = ['#dc2626', '#ca8a04', '#059669', '#475569'];

const IntimateProgressChart = () => {
  const [progressCount, setProgressCount] = useState(null);

  useEffect(() => {
    const intimateProgressCount = async () => {
      try {
        const response = await apiClient.get('/count/intimateProgress');
        setProgressCount(response.data);
      } catch (error) {
        message.error('Failed to fetch intimate progress.');
      }
    };

    intimateProgressCount();
  }, []);

  if (!progressCount)
    return <p className="text-center text-gray-500">Loading...</p>;

  const data = [
    {name: 'Pending', value: progressCount.pendingCount},
    {name: 'In Progress', value: progressCount.inProgressCount},
    {name: 'Complete', value: progressCount.completeCount},
  ];

  return (
    <div className="max-w-sm p-6 shadow-lg rounded-xl border border-gray-200 bg-white pl-10">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </div>
  );
};

export default IntimateProgressChart;
