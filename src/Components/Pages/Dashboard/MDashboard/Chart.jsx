import React from 'react';
import { withUserConsumer } from "../../../../Context/Context"
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';



const Chart = () => {
  const theme = useTheme();
  const data = {
    '00:00': 0,
    '03:00': 0,
    '06:00': 0,
    '09:00': 0,
    '12:00': 0,
    '15:00': 0,
    '18:00': 0,
    '21:00': 0,
    '24:00': 0,
  }
  const dataObjectArray = []
  // const {
  //   current_logs: {
  //     logs
  //   } } = context;

  // function checks fetched logs for check in times and sets amount of check ins for correct interval to display in chart
  // const filteredLogs = (logs) => {

  //   const dataArr = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

  //   // loops thru logs
  //   logs.map(logObj => {
  //     // converts check in time to seconds
  //     const { check_in } = logObj;
  //     const checkInTimeInSeconds = check_in.split(':').reduce((acc, time) => (60 * acc) + +time);
  //     // loops thru array of check in times set at 3 hour intervals 
  //     dataArr.filter((arrTime, index) => {

  //       let dataArrEndIndex = (index + 1)
  //       // checks if at end of arr and bails
  //       if (dataArr[dataArrEndIndex] === undefined) {
  //         return null
  //       }
  //       // sets check in interval into seconds
  //       // reduce function loops thru HH:MM like (60 * ((60 * HH) + MM) +ss multiplying by 60 twice for hhand once for mm then adding ss
  //       const arrTimeInSecondsStart = arrTime.split(':').reduce((accumalatedTime, time) => (60 * accumalatedTime) + +time);
  //       const arrTimeInSecondsEnd = dataArr[dataArrEndIndex].split(':').reduce((accumalatedTime, time) => (60 * accumalatedTime) + +time);
  //       // checks if check in time is in between interval then increases amount of checkins for interval by one data 
  //       if ((arrTimeInSecondsStart < checkInTimeInSeconds) && (arrTimeInSecondsEnd > checkInTimeInSeconds)) {
  //         let value = data[arrTime]
  //         data[`${arrTime}`] = value + 1;
  //       }
  //     })
  //   })
  // }
  // // converts each time interval and amount of scans into new object and pushs into readable array for chart
  // const convertToDataBlock = (dataObject) => {
  //   for (const key in dataObject) {
  //     let block = Object.assign({}, { time: key, amount: dataObject[key] });
  //     dataObjectArray.push(block)
  //   }
  // }

  // filteredLogs(logs);
  // convertToDataBlock(data)
  // console.log({ data }, { logs }, { dataObjectArray }, 'charts comp')

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={dataObjectArray}
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
