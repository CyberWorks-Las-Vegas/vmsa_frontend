import React, { Component } from "react";
import { Base64 } from 'js-base64';

// TODO: put all form changes into single function

// creates context api
const UserContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProfile: '',
      isFirstSignin: true,
      step: 0,
      accessTokens: {
        admin_token: '',
        front_desk_token: '',
        visitor_station_token: ''
      },
      loginPremise: {
        premises_id: '',
        premises_password: '',
        correct: true,
        errorResponse: ''
      },
      loginApp: {
        user: 'administrator',
        password: '',
        correct: true,
        errorResponse: ''
      },
      adminDetails: {
        first_Name: '',
        last_Name: '',
        email: '',
        admin_Password: '',
        front_Desk_Password: '',
        errorResponse: ''
      },
      schoolDetails: {
        school_Name: '',
        street: '',
        street_Number: 0,
        city: '',
        state: '',
        zip: 0,
        errorResponse: ''
      }
    };

    //fallback for future changes to react
    this.callApi = this.callApi.bind(this);
    this.postApi = this.postApi.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.filterNames = this.filterNames.bind(this);
    this.pageRedirect = this.pageRedirect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitApp = this.handleSubmitApp.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleLoginFormChange = this.handleLoginFormChange.bind(this);
    this.handlePremiseFormChange = this.handlePremiseFormChange.bind(this)
    this.handleAdminDetailsFormChange = this.handleAdminDetailsFormChange.bind(this);
    this.handleSchoolDetailsFormChange = this.handleSchoolDetailsFormChange.bind(this);
  }
  /*SERVER FUNCTIONS START*/

  // used to get data from server
  // async componentDidMount() {
  //   // test
  //   await this.callApi()
  //     .then(res => this.setState({ response: res }))
  //     .catch(err => console.log(err, "componentdidmount"));

  // }
  // Fetches data from express
  callApi = async () => {
    const response = await fetch('/API/');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body.message;
  }
  // Post form data to express
  postApi = async (form, endPoint) => {
    // set headers for cors
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Basic ' + Base64.encode(form.premises_id + ":" + form.password));
    headers.append('Origin', `https://test.cyberworks.tech`);
    // get response json from express server
    return await fetch(endPoint, {
      mode: 'cors',
      credentials: 'include',
      method: 'POST',
      headers,
      body: JSON.stringify(form)
    })
      .then((result) => result.json())
      .catch(error => console.log('Authorization failed : ' + error.message));
  }


  /*SERVER FUNCTIONS END*/
  /* FORMS START*/

  // forward pagnation
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // prev pagnation
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // save form info to state
  saveAndContinue = e => {
    e.preventDefault();
    this.nextStep();
  };

  // function to handle form submit and post data to express
  handleSubmit = async e => {
    e.preventDefault();
    e.persist();

    const {
      loginPremise: {
        premises_id,
        premises_password
      } } = this.state;

    const loginPremiseForm = {
      premises_id,
      premises_password
    };
    // waits for post api to resolve promise
    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/premisesLogVal/premisesLogin'
    const body = await this.postApi(loginPremiseForm, endPoint).then(res => res);

    // updates state with info from express
    this.setState(prevState => ({
      ...prevState,
      isFirstSignin: body.first_login,
      accessTokens: {
        ...prevState.accessTokens,
        admin_token: body.accessToken ? body.accessToken : false
      },
      loginPremise: {
        ...prevState.loginPremise,
        correct: body.correct !== undefined ? body.correct : false,
        errorResponse: body.error ? body.error : "no errors"
      }
    }))
  };

  // function to handle form submit and post data to express
  handleSubmitApp = async e => {
    e.preventDefault();


    const {
      loginApp: {
        user,
        password
      },
    } = this.state;

    const loginAppForm = {
      user,
      password
    };


    // waits for post api to resolve promise
    //const endPoint = '/API/appLogVal/appLogin'
    //const body = await this.postApi(loginApp, endPoint).then(res => res);

    // updates state with info from express
    // this.setState(prevState => ({
    //   currentProfile: user,
    //   loginApp: {
    //     ...prevState.loginApp,
    //     // correct: body.correct,
    //     //fetchResponse: body.error ? body.error : "no errors"
    //   }
    // }))
    this.setState({
      currentProfile: user
    })
  };

  // function to handle form submit and post data to express
  handleAdminRegSubmit = async e => {
    e.preventDefault();
    e.persist();

    const {
      loginPremise: {
        premises_id
      },
      adminDetails: {
        first_Name,
        last_Name,
        email,
        admin_Password,
        front_Desk_Password,
      }
    } = this.state;

    const adminDetailsForm = {
      premises_id,
      first_Name,
      last_Name,
      email,
      admin_Password,
      front_Desk_Password,
    };
    // waits for post api to resolve promise

    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/adminRegVal/register'
    const body = await this.postApi(adminDetailsForm, endPoint).then(res => res);

    // updates state with info from express
    this.setState(prevState => ({
      adminDetails: {
        ...prevState.adminDetails,
        errorResponse: body.error ? body.error : "no errors"
      }
    }))

  };

  // TEST
  // Redirect to new page after checking tokens
  pageRedirect = async (token, page) => {

  }

  // load input changes  into state
  handlePremiseFormChange = (e) => {
    e.persist();

    this.setState(prevState => ({
      loginPremise: {
        ...prevState.loginPremise,
        [e.target.name]: e.target.value
      }
    })
    );
  }

  // load input changes into state
  handleLoginFormChange = (e) => {
    e.persist();

    this.setState(prevState => ({
      loginApp: {
        ...prevState.loginApp,
        [e.target.name]: e.target.value
      }
    })
    );
    const user = (e.target.name === 'user' && e.target.value !== false) && e.target.value

    if (user !== false)
      this.setState({
        currentProfile: user
      })

    console.log(this.state.loginApp, this.state.currentProfile);
  };

  // load input changes for admin page into state
  handleAdminDetailsFormChange = (e) => {
    e.persist();
    console.log(this.state.adminDetails, "admin Details")
    this.setState(prevState => ({
      adminDetails: {
        ...prevState.adminDetails,
        [e.target.name]: e.target.value
      }
    }))
  };
  // load input changes for school page into state
  handleSchoolDetailsFormChange = (e) => {
    e.persist();
    console.log(this.state.schoolDetails, "school Details");
    this.setState(prevState => ({
      schoolDetails: {
        ...prevState.schoolDetails,
        [e.target.name]: e.target.value
      }
    }))
  };


  /* FORMS END*/

  /* FILTER START - test */
  // takes in event from selected filter type
  // checks if its a checkbox/text field
  // changes state based on target name/value
  // calls filterNames function as callback
  handleFilterChange = event => {
    const target = event.target;
    const name = target.name;
    // only use if adding checkboxes
    let value = target.type === "checkbox" ? target.checked : target.value;

    this.setState(
      {
        [name]: value
      },
      this.filterNames
    );
  };
  // sortedNames will update depending on the current state after handleFilterChange method fires
  // parses houseNumber/apt/suite/zipCode from strings to numbers to be evaluated
  filterNames = () => {
    let {
      firstName,
      lastName,
      Alias: {
        differentFirst,
        differentLast
      },
      address: {
        houseNumber,
        street,
        apt,
        suite,
        city,
        state,
        zipCode,
      }
    } = this.state;
    // all the names
    let tempNames;
    // numbers array
    let numbersArray = [{ houseNumber }, { apt }, { suite }, { zipCode }]
    // transform value from string to number
    const parsedNumbers = (numbersArray) => {
      const { houseNumber, apt, suite, zipCode } = [...numbersArray];
      const tempArray = [];
      const parser = (tempArray) => {
        let tempNumbers = [...tempArray]
        tempNumbers = tempNumbers.map(numbers => {
          return parseInt(numbers);
        });
        return tempNumbers;
      };

      const parsedNumbersArray = parser(tempArray);
      const defaultArray = parsedNumbersArray.map(parsednumber => {
        return tempArray.filter(tempNumber => {
          if (tempNumber === parsedNumber) {
            tempNumbe = parsedNumber;
          }
        })
      })
      return defaultArray;
    };


    // filter by type

    // filter by capacity

    // filter by price

    // filter by size

    // change state
    this.setState({ sortedNames: tempNames });
  };
  /* FILTER END - test */

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          nextStep: this.nextStep,
          prevStep: this.prevStep,
          onSubmit: this.handleSubmit,
          onAppSubmit: this.handleSubmitApp,
          saveContinue: this.saveAndContinue,
          loginFormChange: this.handleLoginFormChange,
          premiseFormChange: this.handlePremiseFormChange,
          adminDetailsChange: this.handleAdminDetailsFormChange,
          schoolDetailsChange: this.handleSchoolDetailsFormChange
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const UserConsumer = UserContext.Consumer;
// high order component to wrap components that need to recieve current state or methods
export function withUserConsumer(Component) {
  return function consumerWrapper(props) {
    return (
      <UserConsumer>
        {value => <Component {...props} context={value} />}
      </UserConsumer>
    );
  };
}

export { UserProvider, UserConsumer, UserContext };
