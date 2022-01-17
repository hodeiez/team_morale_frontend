import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getTeamAverageHistory } from "../../commons/api/apiConstants";
import { useFetch2 } from "../../commons/hooks/useFetch";
/* const myMockData = [
  {
    date: "2021-12-06",
    energyDev: 0,
    productionDev: 0,
    wellBeingDev: 0,
    energyAvg: 0,
    productionAvg: 0,
    wellBeingAvg: 0,
  },
  {
    date: "2021-11-30",
    energyDev: 2.1650635094610964,
    productionDev: 2.1650635094610964,
    wellBeingDev: 1.299038105676658,
    energyAvg: 5.75,
    productionAvg: 8.75,
    wellBeingAvg: 0.75,
  },
  {
    date: "2021-12-06",
    energyDev: 0,
    productionDev: 0,
    wellBeingDev: 0.12,
    energyAvg: 3,
    productionAvg: 5,
    wellBeingAvg: 9,
  },
]; */
type GraphData = {
  date: string;
  energyDev: number;
  productionDev: number;
  wellBeingDev: number;
  energyAvg: number;
  productionAvg: number;
  wellBeingAvg: number;
};
type Props = {
  data?: GraphData[];
  id: number;
};

export const LineGraph = (props: Props) => {
  const [data, setData] = useState<any>({});
  //testing!!!

  const { state } = useFetch2(getTeamAverageHistory(props.id));

  useEffect(() => {
    if (!props.data) {
      setData(state.post);
    } else setData(props.data);
  }, [state]);

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart
        width={800}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 40,
          left: 0,
          bottom: 5,
        }}
      >
        <XAxis dataKey="date" label={{}} />
        <YAxis domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="energyAvg"
          name="energy avg."
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth="5"
          legendType="circle"
        />
        <Line
          type="monotone"
          dataKey="wellBeingAvg"
          name="well-being avg."
          stroke="#82ca9d"
          strokeWidth="5"
          legendType="circle"
        />
        <Line
          type="monotone"
          dataKey="productionAvg"
          name="production avg."
          stroke="#BF3F3F"
          strokeWidth="5"
          legendType="circle"
        />
        <Line
          type="monotone"
          dataKey="productionDev"
          name="production dev."
          stroke="#BF3F0F"
          strokeWidth="2"
          dot={false}
          strokeDasharray={4}
          legendType="rect"
        />
        <Line
          type="monotone"
          dataKey="wellBeingDev"
          name="well-being dev."
          stroke="#82ca4d"
          strokeWidth="2"
          dot={false}
          strokeDasharray={4}
          legendType="rect"
        />
        <Line
          type="monotone"
          dataKey="energygDev"
          name="energy dev."
          stroke="#8884d1"
          strokeWidth="2"
          dot={false}
          strokeDasharray={4}
          legendType="rect"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
