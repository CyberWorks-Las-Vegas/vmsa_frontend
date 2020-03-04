import React, { forwardRef, useRef, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { UserContext } from "../../../../Context/Context"

const SchoolDetails = (props, ref) => {
  const context = useContext(UserContext);
  const { schoolDetailsChange, SchoolDetails } = context;
  const inputRef = useRef();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Please fill out form below to build profile
      </Typography>
      <Grid container spacing={3}>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="schoolName"
            name="school_Name"
            label="School Name"
            ref={inputRef}
            fullWidth
            autoComplete="fname"
            autoFocus
            onChange={schoolDetailsChange}
            value={schoolDetails.school_Name}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="address2"
            name="street_Number"
            label="Street Number"
            ref={inputRef}
            fullWidth
            autoComplete="billing address-line2"
            onChange={schoolDetailsChange}
            value={schoolDetails.street_Number}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="street"
            label="Street Address"
            ref={inputRef}
            fullWidth
            autoComplete="billing address-line1"
            onChange={schoolDetailsChange}
            value={schoolDetails.street}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            ref={inputRef}
            fullWidth
            autoComplete="billing address-level2"
            onChange={schoolDetailsChange}
            value={schoolDetails.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            ref={inputRef}
            fullWidth
            onChange={schoolDetailsChange}
            value={schoolDetails.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            ref={inputRef}
            fullWidth
            autoComplete="billing postal-code"
            onChange={schoolDetailsChange}
            value={schoolDetails.zip}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default forwardRef(SchoolDetails);