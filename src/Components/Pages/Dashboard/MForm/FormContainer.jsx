import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { withUserConsumer } from "../../../../Context/Context"
// Styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
// Components
import SchoolDetails from './SchoolDetails';
import AdminDetails from './AdminDetails';
import Review from './Review';
import ComSubmit from '../../../Hero/materialUI/Button/ComSubmit'

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

function formPages(step, context) {
  switch (step) {
    case 0:
      return <AdminDetails context={context} />;
    case 1:
      return <SchoolDetails context={context} />;
    case 2:
      return <Review context={context} />;
    default:
      throw new Error('Unknown step');
  }
}

const steps = ['Administrator Details', 'School details', 'Review'];

const FormContainer = ({ context }) => {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step <= 0) setStep(step = 0);
    if (step >= 2) setStep(step = 2);
  })

  // Object values of form inputs
  const activeStep = step;
  console.log({ step }, { activeStep }, { context })
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Profile
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for taking time to fill out this form.
                </Typography>
                <Typography variant="subtitle1">
                  Your now all set and ready to use the application.
                </Typography>
                <Link
                  to="/dashboard"
                >
                  <ComSubmit>Go to administrator dashboard</ComSubmit>
                </Link>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {formPages(step, context)}
                </React.Fragment>
              )}
            <React.Fragment>
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={() => setStep(step--)} className={classes.button}>
                    Back
                    </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(step++)}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </React.Fragment>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  )
}

export default withUserConsumer(FormContainer);
