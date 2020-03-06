import React, { useContext } from 'react';
// Styles
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

import { UserContext } from "../../../../Context/Context"


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
  const context = useContext(UserContext);
  const {
    adminDetails,
    schoolDetails,
  } = context;
  const { stet, setStep } = props
  const schoolArray = [schoolDetails.streetNumber, schoolDetails.street, schoolDetails.city, schoolDetails.state, schoolDetails.zip]

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile summary
      </Typography>
      <List disablePadding>

        <ListItem className={classes.listItem} key={1}>
          <ListItemText primary='First Name' secondary={adminDetails.first_Name} />
        </ListItem>

        <ListItem className={classes.listItem} key={2}>
          <ListItemText primary='Last Name' secondary={adminDetails.last_Name} />
        </ListItem>

        <ListItem className={classes.listItem} key={3}>
          <ListItemText primary='Email' secondary={adminDetails.email} />
        </ListItem>

        <ListItem className={classes.listItem} key={4}>
          <ListItemText primary="Administrator Password" secondary={adminDetails.admin_Password} />
        </ListItem>

        <ListItem className={classes.listItem} key={5}>
          <ListItemText primary='Front Desk Password' secondary={adminDetails.front_Desk_Password} />
        </ListItem>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<EditTwoToneIcon />}
          onClick={() => setStep(step - 2)}
        >
          Edit Profile Details
          </Button>

      </List>
      <Divider />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            School Address:
          </Typography>

          <Typography gutterBottom>{schoolArray.join(', ')}</Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<EditTwoToneIcon />}
            onClick={() => setStep(step - 1)}
          >
            Edit School Details
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Review;
