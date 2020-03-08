import React, { forwardRef, useContext, useRef } from 'react';
import { withRouter } from 'react-router-dom';
// Styles
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import imageBooks2 from "../../../../assets/images/books2.jpeg"
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
    height: '100vmin',
  },
  image: {
    backgroundImage: `url(${imageBooks2})`,
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
const nextPageAuth = async (props, correct) => {
  const correctLogin = await correct
  return correctLogin && props.history.push('/dashboard')
}
const AppLogin = (props, ref) => {
  const classes = useStyles();
  const context = useContext(UserContext);
  const {
    loginApp: {
      correct
    },
    onAppSubmit,
    loginFormChange
  } = context;
  const inputRef = useRef();
  // check if login responeded correct then calls redirect func
  correct && nextPageAuth(props, administrator_token)
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>

            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile Selection
          </Typography>
          <form
            onSubmit={onAppSubmit}
            className={classes.form}
          >
            <Select
              ref={inputRef}
              id="current_profile"
              variant="outlined"
              name="current_profile"
              value={current_profile}
              onChange={loginFormChange}
              required
              fullWidth
              autoWidth={true}
            >

              <MenuItem value="administrator">Administrator</MenuItem>
              <MenuItem value="front_desk">Front Desk</MenuItem>
              <MenuItem value="visitor_station">Visitor Station</MenuItem>
            </Select>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              name="profile_password"
              ref={inputRef}
              onChange={loginFormChange}
              autoComplete="current-password"
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
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
    </Grid>
  );
};

export default withRouter(
  forwardRef(AppLogin)
);