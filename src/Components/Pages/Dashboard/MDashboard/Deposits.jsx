import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Month to date</Title>
      <Typography component="p" variant="h4">
        3024
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        as of 2/18/202
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View MTD chart
        </Link>
      </div>
    </React.Fragment>
  );
}