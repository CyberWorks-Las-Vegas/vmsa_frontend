import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// Components


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="https://sound-secure.com">
        Sound Secure
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
function signIn() {
  return console.log("checked in")
}

function signOut() {
  return console.log("checked out ")
}

function VisitorStationFormChange() {
  return console.log("form changed")
}

const VSDashboard = () => {
  const classes = useStyles();
  // const inputRef = 0;
  // const { saveContinue } = context;

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Check In
          </Typography>
          <React.Fragment>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="first_Name"
                  label="First name"
                  // ref={inputRef}
                  fullWidth
                  autoComplete="fname"
                  autoFocus
                  onChange={VisitorStationFormChange}
                // value={adminDetails.first_Name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="last_Name"
                  label="Last name"
                  // ref={inputRef}
                  fullWidth
                  autoComplete="lname"
                  onChange={VisitorStationFormChange}
                // value={adminDetails.last_Name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="street_Number"
                  label="Street Number"
                  // ref={inputRef}
                  fullWidth
                  autoComplete="billing address-line2"
                  onChange={VisitorStationFormChange}
                // value={schoolDetails.street_Number}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="address1"
                  name="street"
                  label="Street Address"
                  // ref={inputRef}
                  fullWidth
                  autoComplete="billing address-line1"
                  onChange={VisitorStationFormChange}
                // value={schoolDetails.street}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  id="city"
                  name="city"
                  label="City"
                  // ref={inputRef}
                  fullWidth
                  autoComplete="billing address-level2"
                  onChange={VisitorStationFormChange}
                // value={schoolDetails.city}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  // ref={inputRef}
                  fullWidth
                  onChange={VisitorStationFormChange}
                // value={schoolDetails.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  // ref={inputRef}
                  fullWidth
                  autoComplete="billing postal-code"
                  onChange={VisitorStationFormChange}
                // value={schoolDetails.zip}
                />
              </Grid>
            </Grid>

            <div className={classes.buttons}>
              <Grid item xs={6}>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => signIn()}
                  className={classes.button}
                >
                  Sign In
              </Button>
              </Grid>
              <Grid item xs={6}>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => signOut()}
                  className={classes.button}
                >
                  Sign Out
              </Button>
              </Grid>
            </div>

          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}

export default VSDashboard;
