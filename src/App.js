//DEPS
import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
// COMPONENTS
// import SignInSide from './Components/Pages/Home/MLogin/SignIn';
import ButtonAppBar from './Components/Pages/Home/MLogin/AppBar';
import FormContainer from './Components/Pages/Dashboard/MForm/FormContainer';
import MDashboard from "./Components/Pages/Dashboard/MDashboard/Main";
import VSDashboard from "./Components/Pages/Dashboard/VisitorStation/VisitorStation";
import PrivateAdminRoute from "./Components/Routes/PrivateAdminRoute";
import PrivateFormRoute from "./Components/Routes/PrivateFormRoute";
import PrivateDashboardRoute from "./Components/Routes/PrivateDashboardRoute";
import AppLogin from "./Components/Pages/Home/AppLogin/AppLogin";
import Error from "./Components/Pages/Error/Error";
// Styles
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <>
      <Container maxWidth="xl">
        <ButtonAppBar />

        <Switch>
          <Route exact path="/" component={VSDashboard} />
          <PrivateAdminRoute path="/applogin" component={AppLogin} />
          <PrivateFormRoute path="/form" component={FormContainer} />
          <PrivateDashboardRoute path="/administrator/dashboard" component={MDashboard} />
          {/* <PrivateDashboardFDRoute path="/front_desk/dashboard" component={FDDashboard} /> */}
          {/* <PrivateDashboardVSRoute path="/visitor_station/dashboard" component={VSDashboard} /> */}
          <Route component={Error} />
        </Switch>
      </Container>
    </>
  );
};

// helps perserve state on each reload in dev
export default hot(module)(App);
