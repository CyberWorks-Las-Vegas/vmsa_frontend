import React, { createRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


// Styles
import Theme from '../../../../Themes/theme';
import { withStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// Components
import Modal from './Modal/Modal'


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

const classStyle = theme => ({
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
});

const modalActive = {
  height: "80vh",
  width: "100vw",
  backgroundColor: "black",
  top: "0",
  left: "0",
  zIndex: "100"
};

const modalLayout = {
  width: "70vw",
  height: "80vh",
  margin: "0 auto",
  padding: "0 4rem"
};

const header = {
  height: "80vh"
};

const nav = {
  padding: "31rem 0rem 2rem 8rem",
  height: "9vh",
  margin: "0 auto",
  top: "0",
  position: "relative"
};


class VSDashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      premises_id: '',
      first_name: '',
      last_name: '',
      street: '',
      street_number: '',
      city: '',
      state: '',
      zip: '',
      license_id: ''
    };
    this.inputRef = createRef();

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.postApi = this.postApi.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.logInsertCheckIn = this.logInsertCheckIn.bind(this);
    this.logInsertCheckOut = this.logInsertCheckOut.bind(this);
    this.VisitorStationFormChange = this.VisitorStationFormChange.bind(this);
  }

  componentDidMount() {
    const {
      loginPremise: {
        premises_id
      } } = this.props.context;
    console.log(this.props)
    this.setState({ premises_id });
    console.log(this.state)
  }

  toggleState = e => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  signIn = () => {
    this.logInsertCheckIn();
  }

  signOut = () => {
    this.logInsertCheckOut();
  }
  // function checks for form changes and updates state
  VisitorStationFormChange = (e) => {
    e.persist();

    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    })
    );
    console.log(this.state);
  }

  // Post form data to express
  postApi = async (form, endPoint) => {

    // get response json from express server
    return await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then((result) => result.json())
      .catch(error => console.log('Authorization failed : ' + error.message));
  }

  // function to handle retriving current logs from db
  logInsertCheckIn = async e => {

    const {
      premises_id,
      first_name,
      last_name,
      street,
      street_number,
      city,
      state,
      zip,
      license_id
    } = this.state;

    const check_inDate = () => {
      let date = new Date();
      let minutes = date.getMinutes();
      let zero = '0';
      return `${date.getHours()}:${minutes > 9 ? minutes : zero + minutes}`
    };
    const check_in = check_inDate();

    const logInForm = {
      premises_id,
      first_name,
      last_name,
      street,
      street_number,
      city,
      state,
      zip,
      license_id,
      check_in
    };
    // waits for post api to resolve promise
    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/logInsertVal/logInsert'
    const body = await this.postApi(logInForm, endPoint).then(res => res);
    console.log(body)
    // updates state with info from express
    this.setState({
      current_logs: {
        correct: body.correct,
      }
    })
  };

  // function to handle posting current logs to db
  logInsertCheckOut = async e => {

    const {
      premises_id,
      license_id
    } = this.state;

    const check_outDate = () => {
      let date = new Date();
      let minutes = date.getMinutes();
      let zero = '0';
      return `${date.getHours()}:${minutes > 9 ? minutes : zero + minutes}`
    };
    const check_out = check_outDate();
    const logOutForm = {
      premises_id,
      license_id,
      check_out
    };
    // waits for post api to resolve promise
    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/logInsertOutVal/logInsertOut'
    const body = await this.postApi(logOutForm, endPoint).then(res => res);
    // updates state with info from express
    console.log(body)
    this.setState({
      current_logs: {
        correct: body.correct,
      }
    })
  };

  render() {
    const { classes } = this.props;
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
                    name="first_name"
                    label="First name"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="fname"
                    autoFocus
                    onChange={this.VisitorStationFormChange}
                    value={this.state.first_name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="last_name"
                    label="Last name"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="lname"
                    onChange={this.VisitorStationFormChange}
                    value={this.state.last_name}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="street_Number"
                    label="Street Number"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="billing address-line2"
                    onChange={this.VisitorStationFormChange}
                    value={this.state.street_Number}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="address1"
                    name="street"
                    label="Street Address"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="billing address-line1"
                    onChange={this.VisitorStationFormChange}
                    value={this.state.street}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="city"
                    name="city"
                    label="City"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="billing address-level2"
                    onChange={this.VisitorStationFormChange}
                    value={this.state.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    ref={this.inputRef}
                    fullWidth
                    onChange={this.VisitorStationFormChange}
                    value={this.state.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="billing postal-code"
                    onChange={this.VisitorStationFormChange}
                    value={this.state.zip}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="license_id"
                    name="license_id"
                    label="Driver license #"
                    ref={this.inputRef}
                    fullWidth
                    autoComplete="driver license"
                    onChange={this.VisitorStationFormChange}
                    value={this.state.license_id}
                  />
                </Grid>
              </Grid>

              <div className={classes.buttons}>
                <Grid item xs={3}>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.signIn}
                    className={classes.button}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={3}>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.signOut}
                    className={classes.button}
                  >
                    Sign Out
                  </Button>
                </Grid>
                <Grid item xs={3}>

                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={this.toggleState}
                    className={classes.button}
                  >
                    Scan
                  </Button>
                </Grid>
              </div>
              {this.state.isModalOpen && (
                <Modal
                  id="modal"
                  isOpen={this.state.isModalOpen}
                  onClose={this.toggleState}
                >

                </Modal>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    )
  }
};

VSDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(
  classStyle(Theme)
)(VSDashboard);
