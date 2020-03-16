import React from 'react';
import { withUserConsumer } from '../../../../Context/Context'

import Backdrop from '@material-ui/core/Backdrop';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';



const useStyles = makeStyles(theme => ({
  depositContext: {
    flex: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.91)'
  }
}));

const BlockList = ({ context }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const {
    current_block_list: {
      block_list
    } } = context;
  console.log({ block_list }, { context }, 'block list comp')
  const DBArray = block_list[0];
  const blockListArray = DBArray.block_list
  console.log({ DBArray }, { blockListArray }, 'block list comp')
  return (
    <React.Fragment>
      <Title>Month to date</Title>
      <Typography component="p" variant="h4">
        {`${blockListArray.length}`}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        {`as of ${new Date().toDateString()}`}
      </Typography>
      <div>

        <Link color="primary" href="#" onClick={handleToggle}>
          View block list
        </Link>
        <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ color: 'rgba(75, 193, 228, 0.87)' }}>Date</TableCell>
                <TableCell style={{ color: 'rgba(75, 193, 228, 0.87)' }}>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blockListArray.map(row => (
                <TableRow key={DBArray._id}>
                  <TableCell style={{ color: 'rgba(78, 187, 76, 0.87)' }}>{DBArray.date}</TableCell>
                  <TableCell style={{ color: 'rgba(236, 43, 43, 0.87)' }}>{`${row.first_name} ${row.last_name}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Backdrop>
      </div>
    </React.Fragment>
  );
}

export default withUserConsumer(BlockList);