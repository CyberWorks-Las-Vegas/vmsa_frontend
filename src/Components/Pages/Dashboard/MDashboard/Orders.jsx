import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, approved, checkIn, checkOut) {
  return { id, date, name, approved, checkIn, checkOut };
}

const rows = [
  createData(0, '18 Feb, 2020', 'Barack Obama', 'Yes', '8:00', '12:00'),
  createData(1, '18 Feb, 2020', 'Paul McCartney', 'Yes', '10:00', '14:00'),
  createData(2, '18 Feb, 2020', 'Rihanna', 'Yes', '17:00', '17:45'),
  createData(3, '18 Feb, 2020', 'Michael Jackson', 'Yes', '7:00', '13:00'),
  createData(4, '18 Feb, 2020', 'Bruce Springsteen', 'Yes', '11:00', '19:00'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
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
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.approved}</TableCell>
              <TableCell>{row.checkIn}</TableCell>
              <TableCell align="right">{row.checkOut}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See all scans
        </Link>
      </div>
    </React.Fragment>
  );
}