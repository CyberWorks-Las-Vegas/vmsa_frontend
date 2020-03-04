import React, { forwardRef, useRef, useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { UserContext } from "../../../../Context/Context"

const AdminDetails = (props, ref) => {
  const context = useContext(UserContext);
  const { adminDetailsChange, adminDetails } = context;
  const inputRef = useRef();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Please fill out the form below to build a profile
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="first_Name"
            label="First name"
            ref={inputRef}
            fullWidth
            autoComplete="fname"
            autoFocus
            onChange={adminDetailsChange}
            value={adminDetails.first_Name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="last_Name"
            label="Last name"
            ref={inputRef}
            fullWidth
            autoComplete="lname"
            onChange={adminDetailsChange}
            value={adminDetails.last_Name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            ref={inputRef}
            fullWidth
            autoComplete="email"
            onChange={adminDetailsChange}
            value={adminDetails.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="adminPassword"
            name="admin_Password"
            label="Administrator Password"
            ref={inputRef}
            fullWidth
            autoComplete="password"
            onChange={adminDetailsChange}
            value={adminDetails.admin_Password}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="frontDeskPassword"
            name="front_Desk_Password"
            label="Front Desk Password"
            ref={inputRef}
            fullWidth
            autoComplete="password"
            onChange={adminDetailsChange}
            value={adminDetails.front_Desk_Password}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="scanDetails" value="yes" />}
            label="Select if you do not have a scanner/camera and will need to use manual entry"
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default forwardRef(AdminDetails);