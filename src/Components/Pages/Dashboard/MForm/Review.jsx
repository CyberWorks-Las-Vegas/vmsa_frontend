import React from 'react';
import { Link } from 'react-router-dom';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ComSubmit from "../../../Hero/materialUI/Button/ComSubmit"

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

function Review(props) {
  const classes = useStyles();
  const {
    values: {
      adminDetails,
      schoolDetails
    }
  } = props;
  console.log(props)
  const schoolArray = [schoolDetails.street, schoolDetails.streetNumber, schoolDetails.city, schoolDetails.state, schoolDetails.zip]

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile summary
      </Typography>
      <List disablePadding>

        <ListItem className={classes.listItem} key={1}>
          <ListItemText primary={adminDetails.firstName} />

        </ListItem>

        <ListItem className={classes.listItem} key={3}>
          <ListItemText primary={adminDetails.firstName} />

        </ListItem>

        <ListItem className={classes.listItem} key={2}>
          <ListItemText primary={adminDetails.email} />
        </ListItem>

        <ListItem className={classes.listItem} key={4}>

        </ListItem>

        <ListItem className={classes.listItem} key={5}>
          <ListItemText primary={adminDetails.frontDeskPassword} />
          <Typography variant="body2">
            <ComSubmit>Edit Admin Profile</ComSubmit>
          </Typography>
        </ListItem>

      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            School Address
          </Typography>

          <Typography gutterBottom>{schoolArray.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            <Link
              to="/dashboard"
            >
              <ComSubmit>Edit School Profile</ComSubmit>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;
