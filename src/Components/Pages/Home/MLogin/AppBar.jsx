import React from 'react';
import { Link } from 'react-router-dom'

import { withUserConsumer } from '../../../../Context/Context'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import CameraFrontIcon from '@material-ui/icons/CameraFront';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar({ context }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [adminAnchorEl, adminSetAnchorEl] = React.useState(null);

  const handleAdminClick = event => {
    adminSetAnchorEl(event.currentTarget);
  };

  const handleAdminClose = () => {
    adminSetAnchorEl(null);
  };

  const {
    loginApp: {
      inDashboard,
      current_profile,
      profile_password
    },
    accessTokens: {
      administrator_token
    },
    setSignInStatus,
    resetProfileStatus,
    resetPremisesStatus
  } = context;
  console.log(context)
  return (
    <div className={classes.root}>
      <AppBar style={{ background: 'linear-gradient(166deg, rgba(51, 171, 84, 1) 30%, rgb(20, 197, 181) 90%' }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Sound Secure
          </Typography>
          {
            (inDashboard)
            &&
            (
              <React.Fragment>
                <div>
                  <Button
                    className={classes.menuButton}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    Navigation
                  </Button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <StyledMenuItem>
                      <ListItemIcon>
                        <CameraFrontIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to='/dashboard/visitor_station' onClick={resetProfileStatus}>
                        <ListItemText primary="Visitor Station" />
                      </Link>
                    </StyledMenuItem>

                    <StyledMenuItem>
                      <ListItemIcon>
                        <LockTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to='/' onClick={resetPremisesStatus}>
                        <ListItemText primary="Exit Site" />
                      </Link>
                    </StyledMenuItem>
                  </StyledMenu>
                </div>
              </React.Fragment>
            )
          }
          {
            (inDashboard)
            &&
            (
              <React.Fragment>
                <div>
                  <Button
                    className={classes.menuButton}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    Log out
                </Button>
                  <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <StyledMenuItem>
                      <ListItemIcon>
                        <ExitToAppTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to='/applogin' onClick={resetProfileStatus}>
                        <ListItemText primary="Exit profile" />
                      </Link>
                    </StyledMenuItem>

                    <StyledMenuItem>
                      <ListItemIcon>
                        <LockTwoToneIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to='/' onClick={resetPremisesStatus}>
                        <ListItemText primary="Exit Site" />
                      </Link>
                    </StyledMenuItem>
                  </StyledMenu>
                </div>
              </React.Fragment>
            )
          }
          {
            (
              (current_profile === 'administrator')
              &&
              inDashboard
            ) &&

            (
              <div>
                <Button
                  className={classes.menuButton}
                  aria-controls="customized-menu"
                  aria-haspopup="true"
                  variant="contained"
                  color="primary"
                  onClick={handleAdminClick}
                >
                  Account
                  </Button>
                <StyledMenu
                  id="customized-menu"
                  anchorEl={adminAnchorEl}
                  keepMounted
                  open={Boolean(adminAnchorEl)}
                  onClose={handleAdminClose}
                >
                  <StyledMenuItem>
                    <ListItemIcon>
                      <EditTwoToneIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to='/form' onClick={setSignInStatus}>
                      <ListItemText primary="Edit profile" />
                    </Link>
                  </StyledMenuItem>
                </StyledMenu>
              </div>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withUserConsumer(ButtonAppBar);
