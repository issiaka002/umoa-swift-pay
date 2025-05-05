
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TransactionData {
  name: string;
  transactions: number;
}

interface TransactionChartProps {
  data: TransactionData[];
}

const TransactionChart = ({ data }: TransactionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="transactions" stroke="#4a90e2" fill="#4a90e2" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;
