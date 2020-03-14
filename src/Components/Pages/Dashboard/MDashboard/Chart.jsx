import React, { useEffect, useState } from 'react';
import { withUserConsumer } from "../../../../Context/Context"
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';



const Chart = ({ context }) => {
  const theme = useTheme();
  const [data, setData] = useState({
    '00:00': 0,
    '03:00': 0,
    '06:00': 0,
    '09:00': 0,
    '12:00': 0,
    '15:00': 0,
    '18:00': 0,
    '21:00': 0,
    '24:00': 0,
  })


  useEffect(async () => {
    const {
      retrieveLogs,
      filteredLogs,
      current_logs: {
        logs }
    } = context;
    console.log(data, context);

    await retrieveLogs().then(res => {
      filteredLogs(logs, setData);
    })
  })

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Scans
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default withUserConsumer(Chart);
