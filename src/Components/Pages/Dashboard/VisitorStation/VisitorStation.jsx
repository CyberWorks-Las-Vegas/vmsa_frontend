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
      isModalOpen: false
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.toggleState = this.toggleState.bind(this);
    this.VisitorStationFormChange = this.VisitorStationFormChange.bind(this);
  }

  toggleState = e => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  signIn = () => {
    return console.log("checked in")
  }

  signOut = () => {
    return console.log("checked out ")
  }

  VisitorStationFormChange = () => {
    return console.log("form changed")
  }

  render() {
    const classes = useStyles();

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
                    onChange={this.VisitorStationFormChange}
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
                    onChange={this.VisitorStationFormChange}
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
                    onChange={this.VisitorStationFormChange}
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
                    onChange={this.VisitorStationFormChange}
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
                    onChange={this.VisitorStationFormChange}
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
                    onChange={this.VisitorStationFormChange}
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
                    onChange={this.VisitorStationFormChange}
                  // value={schoolDetails.zip}
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
                  <div className="box-body">
                    <header style={header}>
                      <div style={modalActive}>
                        <div style={modalLayout}>
                          <ul style={nav}>
                            <div className="nav__links">
                              <Link
                                onClick={this.toggleState}
                                to="/"
                                className="nav__link nav__link--active"
                              >
                                <div className="nav__link-number">
                                  <span>01</span>
                                </div>
                                <div className="nav__link-text">Home</div>
                                <svg>
                                  <svg
                                    id="arrow"
                                    viewBox="0 0 22.02 32"
                                    width="100%"
                                    height="100%"
                                  >
                                    <title>arrow</title>
                                    <path
                                      className="a"
                                      d="M21.72 20.39a1 1 0 0 0-1.43 0l-8.27 8.2V1a1 1 0 0 0-2 0v27.59l-8.29-8.2a1 1 0 0 0-1.43 0 1 1 0 0 0 0 1.41l10 9.9a1 1 0 0 0 1.43 0l10-9.9a1 1 0 0 0 0-1.42z"
                                    />
                                  </svg>
                                </svg>
                              </Link>
                              <Link
                                onClick={this.toggleState}
                                to="/tableOfContents/"
                                className="nav__link nav__link--active"
                              >
                                <div className="nav__link-number">
                                  <span>02</span>
                                </div>
                                <div className="nav__link-text">
                                  Table Of Contents
                            </div>
                                <svg>
                                  <svg
                                    id="arrow"
                                    viewBox="0 0 22.02 32"
                                    width="100%"
                                    height="100%"
                                  >
                                    <title>arrow</title>
                                    <path
                                      className="a"
                                      d="M21.72 20.39a1 1 0 0 0-1.43 0l-8.27 8.2V1a1 1 0 0 0-2 0v27.59l-8.29-8.2a1 1 0 0 0-1.43 0 1 1 0 0 0 0 1.41l10 9.9a1 1 0 0 0 1.43 0l10-9.9a1 1 0 0 0 0-1.42z"
                                    />
                                  </svg>
                                </svg>
                              </Link>
                              <Link
                                onClick={this.toggleState}
                                to="/"
                                className="nav__link nav__link--active"
                              >
                                <div className="nav__link-number">
                                  <span>03</span>
                                </div>
                                <div className="nav__link-text">Who Am I</div>
                                <svg>
                                  <svg
                                    id="arrow"
                                    viewBox="0 0 22.02 32"
                                    width="100%"
                                    height="100%"
                                  >
                                    <title>arrow</title>
                                    <path
                                      className="a"
                                      d="M21.72 20.39a1 1 0 0 0-1.43 0l-8.27 8.2V1a1 1 0 0 0-2 0v27.59l-8.29-8.2a1 1 0 0 0-1.43 0 1 1 0 0 0 0 1.41l10 9.9a1 1 0 0 0 1.43 0l10-9.9a1 1 0 0 0 0-1.42z"
                                    />
                                  </svg>
                                </svg>
                              </Link>
                              <Link
                                onClick={this.toggleState}
                                to="/"
                                className="nav__link nav__link--active"
                              >
                                <div className="nav__link-number">
                                  <span>04</span>
                                </div>
                                <div className="nav__link-text">Blog</div>
                                <svg>
                                  <svg
                                    id="arrow"
                                    viewBox="0 0 22.02 32"
                                    width="100%"
                                    height="100%"
                                  >
                                    <title>arrow</title>
                                    <path
                                      className="a"
                                      d="M21.72 20.39a1 1 0 0 0-1.43 0l-8.27 8.2V1a1 1 0 0 0-2 0v27.59l-8.29-8.2a1 1 0 0 0-1.43 0 1 1 0 0 0 0 1.41l10 9.9a1 1 0 0 0 1.43 0l10-9.9a1 1 0 0 0 0-1.42z"
                                    />
                                  </svg>
                                </svg>
                              </Link>
                            </div>
                          </ul>
                          <div className="modal__footer">
                            <div className="footer__copyright">
                              2019{" "}
                              <a href="https://www.olonnye.com">
                                <label>Olonnye.com</label>
                              </a>
                            </div>
                            <div className="footer__social">
                              <label>Follow us:</label>
                              <div className="footer__social-list">
                                <Link
                                  onClick={this.toggleState}
                                  to="/"
                                  target="_blank"
                                >
                                  <svg>
                                    <svg
                                      id="linkedin"
                                      viewBox="0 0 430.117 430.117"
                                      width="100%"
                                      height="100%"
                                    >
                                      <path d="M430.117 261.543V420.56h-92.188V272.193c0-37.271-13.334-62.707-46.703-62.707-25.473 0-40.632 17.142-47.301 33.724-2.432 5.928-3.058 14.179-3.058 22.477V420.56h-92.219s1.242-251.285 0-277.32h92.21v39.309c-.187.294-.43.611-.606.896h.606v-.896c12.251-18.869 34.13-45.824 83.102-45.824 60.673-.001 106.157 39.636 106.157 124.818zM52.183 9.558C20.635 9.558 0 30.251 0 57.463c0 26.619 20.038 47.94 50.959 47.94h.616c32.159 0 52.159-21.317 52.159-47.94-.606-27.212-20-47.905-51.551-47.905zM5.477 420.56h92.184V143.24H5.477v277.32z" />
                                    </svg>
                                  </svg>
                                </Link>
                                <Link
                                  onClick={this.toggleState}
                                  to="/"
                                  target="_blank"
                                >
                                  <svg>
                                    <svg
                                      id="facebook"
                                      viewBox="0 0 41.05 88.34"
                                      width="100%"
                                      height="100%"
                                    >
                                      <path d="M41 28.6H27v-9.16c0-3.44 2.28-4.25 3.89-4.25h9.86V.05L27.24 0C12.15 0 8.72 11.29 8.72 18.51V28.6H0v15.6h8.72v44.14h18.35V44.2h12.38z" />
                                    </svg>
                                  </svg>
                                </Link>
                                <Link
                                  onClick={this.toggleState}
                                  to="/"
                                  target="_blank"
                                >
                                  <svg>
                                    <svg
                                      id="instagram"
                                      viewBox="0 0 68.61 68.61"
                                      width="100%"
                                      height="100%"
                                    >
                                      <path d="M66.81 11.82a16.77 16.77 0 0 0-4-6.07 16.78 16.78 0 0 0-6.02-3.95A25 25 0 0 0 48.46.21C44.8.05 43.64 0 34.3 0S23.81 0 20.15.21a24.89 24.89 0 0 0-8.33 1.59 16.77 16.77 0 0 0-6.07 3.95 16.77 16.77 0 0 0-4 6.07 25 25 0 0 0-1.54 8.33C.05 23.81 0 25 0 34.3s0 10.5.21 14.16a24.88 24.88 0 0 0 1.59 8.33 16.76 16.76 0 0 0 4 6.07 16.76 16.76 0 0 0 6.07 4 25 25 0 0 0 8.32 1.59c3.66.16 4.83.21 14.16.21s10.5 0 14.16-.21a24.88 24.88 0 0 0 8.32-1.59 17.49 17.49 0 0 0 10-10 25 25 0 0 0 1.59-8.32c.16-3.66.21-4.83.21-14.16s0-10.5-.21-14.16a24.88 24.88 0 0 0-1.61-8.4zm-4.59 36.35A18.74 18.74 0 0 1 61 54.53a10.62 10.62 0 0 1-2.57 4 10.74 10.74 0 0 1-4 2.57 18.9 18.9 0 0 1-6.36 1.19c-3.63.16-4.69.21-13.87.21s-10.26 0-13.86-.21A18.75 18.75 0 0 1 14 61.05a11.39 11.39 0 0 1-6.52-6.52 18.89 18.89 0 0 1-1.19-6.36c-.16-3.63-.21-4.72-.21-13.86s0-10.26.21-13.87a18.74 18.74 0 0 1 1.19-6.36 10.61 10.61 0 0 1 2.57-4A10.74 10.74 0 0 1 14 7.55a18.93 18.93 0 0 1 6.36-1.19c3.63-.16 4.72-.21 13.86-.21s10.26 0 13.87.21a18.78 18.78 0 0 1 6.41 1.19 10.63 10.63 0 0 1 4 2.57 10.75 10.75 0 0 1 2.57 4 18.89 18.89 0 0 1 1.19 6.36c.16 3.63.21 4.72.21 13.87s-.09 10.21-.25 13.82z" />
                                      <path d="M34.28 16.67A17.63 17.63 0 1 0 51.91 34.3a17.64 17.64 0 0 0-17.63-17.63zm0 29.08A11.45 11.45 0 1 1 45.73 34.3a11.46 11.46 0 0 1-11.45 11.46z" />
                                      <circle cx="52.6" cy="15.99" r="4.11" />
                                    </svg>
                                  </svg>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </Modal>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    )
  }
}

export default VSDashboard;
