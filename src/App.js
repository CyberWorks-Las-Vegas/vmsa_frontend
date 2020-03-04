//DEPS
import React from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
// COMPONENTS
import SignInSide from './Components/Pages/Home/MLogin/SignIn';
import ButtonAppBar from './Components/Pages/Home/MLogin/AppBar';
import FormContainer from './Components/Pages/Dashboard/MForm/FormContainer';
import MDashboard from "./Components/Pages/Dashboard/MDashboard/Main";
import PrivateAdminRoute from "./Components/Routes/PrivateAdminRoute";
import PrivateFormRoute from "./Components/Routes/PrivateFormRoute";
import AppLogin from "./Components/Pages/Home/AppLogin/AppLogin"
// Styles
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <>
      <Container maxWidth="xl">
        <ButtonAppBar />

        <Switch>
          <Route exact path="/" component={SignInSide} />
          <PrivateAdminRoute path="/applogin" component={AppLogin} />
          <PrivateFormRoute path="/form" component={FormContainer} />
          <Route path="/dashboard" component={MDashboard} />
        </Switch>
      </Container>
    </>
  );
};

// helps perserve state on each reload in dev
export default hot(module)(App);


// <Route path="/Admin" component={InitForm} />
//           <Route path="/Admin/Dashboard" component={Dashboard} />
//           {/* test */}
//           <Route exact path="/Admin/Dashboard/:slug" component={Search} />
//           <Route exact path="/Guest/Dashboard/:slug" component={AddVistor} />