import React, { forwardRef, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';

// Styles
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import bookImage from "../../../../assets/images/books.png"
import { UserContext } from "../../../../Context/Context"
// Components
import ComSubmit from "../../../Hero/materialUI/Button/ComSubmit"


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
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${bookImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '50%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// page redirect to dashboard
const nextPageAuth = async (props, administrator_token) => {
  const token = await administrator_token
  return token && props.history.push('/applogin')
}
const SignInSide = (props, ref) => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const {
    accessTokens: {
      administrator_token
    },
    onSubmit,
    premiseFormChange } = context;
  const inputRef = useRef();

  administrator_token && nextPageAuth(props, administrator_token)
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <form
            onSubmit={onSubmit}
            className={classes.form}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Premises Id"
              name="premises_id"
              ref={inputRef}
              onChange={premiseFormChange}
              fullWidth
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="premises_password"
              ref={inputRef}
              onChange={premiseFormChange}

              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label="Remember me"
            />

            <ComSubmit
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign in
            </ComSubmit>

            <Grid container>
              <Grid item xs>
                <Link to="#">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid >
  );
};

export default
  forwardRef(
    SignInSide
  );