import React from 'react';
import { withUserConsumer } from '../../../../Context/Context';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';




const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Logs = () => {
  const classes = useStyles();
  // const {
  //   current_logs: {
  //     logs
  //   } } = context;
  const rows = [];

  // format logs into rows by destrucuring logs into props then using thme to create objects that get push into an array
  function createData(logs) {
    // logs.map(log => {
    //   const { license_id, id, first_name, last_name, check_in, check_out } = log
    //   rows.push({ id: license_id, date: id, name: `${first_name} ${last_name}`, approved: 'yes', check_in, check_out });
    // })
  }
  // TODO: make function for pagnation
  function preventDefault(event) {
    event.preventDefault();
  }
  // createData(logs);
  return (
    <React.Fragment>
      <Title>Recent Scans</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Approved</TableCell>
            <TableCell>Checked In</TableCell>
            <TableCell align="right">Checked Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={"row.id"}>
              <TableCell>{"row.date"}</TableCell>
              <TableCell>{"row.name"}</TableCell>
              <TableCell>{"row.approved"}</TableCell>
              <TableCell>{"row.check_in"}</TableCell>
              <TableCell align="right">{"row.check_out"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See all scans
        </Link>
      </div> */}
    </React.Fragment>
  );
}

export default withUserConsumer(Logs);
