import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface StatisticsChartProps {
  data: { label: string; value: number }[];
}

export const StatisticsChart: React.FC<StatisticsChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="var(--chart-color, #3b82f6)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
