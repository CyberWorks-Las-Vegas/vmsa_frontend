import React, { Component } from "react";
import { Base64 } from 'js-base64';

// TODO: put all form changes into single function
// made check in/out routes on backend need to connect visitor station sign in/out feature to ap
// made log retrieval route on backend need to connect charts/logs to api

// creates context api
const UserContext = React.createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFirstSignin: '',
      accessTokens: {
        administrator_token: '',
        front_desk_token: '',
        visitor_station_token: ''
      },
      loginPremise: {
        premises_id: '',
        premises_password: '',
        correct: '',
        errorResponse: ''
      },
      loginApp: {
        current_profile: '',
        profile_password: '',
        correct: '',
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
      },
      current_logs: {
        logs: {}
      },
      current_block_list: {
        block_list: []
      }
    };

    //fallback for future changes to react
    this.callApi = this.callApi.bind(this);
    this.postApi = this.postApi.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.prevStep = this.prevStep.bind(this);
    this.jumpStep = this.jumpStep.bind(this);
    this.filterNames = this.filterNames.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retrieveLogs = this.retrieveLogs.bind(this);
    this.filteredLogs = this.filteredLogs.bind(this);
    this.handleSubmitApp = this.handleSubmitApp.bind(this);
    this.setSignInStatus = this.setSignInStatus.bind(this);
    this.retrieveBlockList = this.retrieveBlockList.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleAdminRegSubmit = this.handleAdminRegSubmit.bind(this);
    this.handleAppLoginFormChange = this.handleAppLoginFormChange.bind(this);
    this.handlePremiseFormChange = this.handlePremiseFormChange.bind(this)
    this.handleAdminDetailsFormChange = this.handleAdminDetailsFormChange.bind(this);
    this.handleSchoolDetailsFormChange = this.handleSchoolDetailsFormChange.bind(this);
  }
  /*SERVER FUNCTIONS START*/

  // used to get data from db on mount 
  // async componentDidMount() {
  //   // put logs into stat for chart to load
  //   await this.retrieveLogs()
  //     .then(res => console.log(res, 'logs finished downloading'))
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

  /*SERVER FUNCTIONS END*/
  /*DASHBOARD FUNCTIONS START*/

  // function to handle retriving current logs from db
  retrieveLogs = async e => {

    const {
      loginPremise: {
        premises_id
      } } = this.state;

    const id = {
      premises_id
    };
    // waits for post api to resolve promise
    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/Get/logRetrieveVal/logRetrieve'
    const body = await this.postApi(id, endPoint).then(res => res);
    // updates state with info from express
    this.setState(prevState => ({
      current_logs: {
        ...prevState.current_logs,
        correct: body.correct,
        logs: body.logs
      }
    }))

  };

  // function to handle retriving current block list from db
  retrieveBlockList = async e => {

    const {
      loginPremise: {
        premises_id
      } } = this.state;

    const id = {
      premises_id
    };
    // waits for post api to resolve promise
    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/Get/blockListRetrieveVal/blockListRetrieve'
    const body = await this.postApi(id, endPoint).then(res => res);
    console.log(body, 'retrieveblocklist context')
    // updates state with info from express
    this.setState(prevState => ({
      current_block_list: {
        ...prevState.current_logs,
        correct: body.correct,
        block_list: body.block_list
      }
    }))

  };

  // function checks fetched logs for check in times and sets amount of check ins for correct interval to display in chart
  filteredLogs = (logs, setData) => {

    const dataArr = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'];

    // loops thru logs
    logs.map(logObj => {
      // converts check in time to seconds
      const { check_in } = logObj;
      let checkInTimeInSeconds = check_in.split(':').reduce((acc, time) => (60 * acc) + +time);
      // loops thru array of check in times set at 3 hour intervals 
      dataArr.filter((arrTime, index) => {

        let dataArrEndIndex = (index + 1)
        // checks if at end of arr and bails
        if (dataArr[dataArrEndIndex] === undefined) {
          return null
        }
        // sets check in interval into seconds
        arrTimeInSecondsStart = arrTime.split(':').reduce((acc, time) => (60 * acc) + +time);
        arrTimeInSecondsEnd = dataArr[dataArrEndIndex].split(':').reduce((acc, time) => (60 * acc) + +time);
        // checks if check in time is in between interval then increases amount of checkins for interval by one data 
        if (arrTimeInSecondsStart < checkInTimeInSeconds && arrTimeInSecondsEnd > checkInTimeInSeconds) {
          let key = data[arrTime]
          setData({
            [`${arrTime}`]: key + 1
          })
        }
      })
    })
  }



  /*DASHBOARD FUNCTIONS END*/
  /*VISITOR STATION FUNCTIONS START*/

  // For now all functions in visitor station component

  /*VISITOR STATION FUNCTIONS END*/
  /*APP NAV BAR FUNCTIONS START*/
  setSignInStatus = () => {
    this.setState(prevState => {
      isFirstSignin: !prevState.isFirstSignin
    })
  }
  /*APP NAV BAR FUNCTIONS END*/
  /* FORMS START*/

  // forward pagnation
  nextStep = (e) => {
    e.persist();
    const { step } = this.state;
    let newStep = step;
    let addStep = ++newStep;

    if (addStep >= 2) addStep = 2;

    this.setState({
      step: addStep
    });
  };

  // prev pagnation
  prevStep = (e) => {
    e.persist();
    const { step } = this.state;
    let newStep = step;
    let subStep = --newStep;

    if (subStep <= 0) subStep = 0;

    this.setState({
      step: subStep
    });
  };

  // jumpStep
  jumpStep = (desiredStep) => {
    this.setState({
      step: desiredStep
    });
  }

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
    if (body) {
      this.setState(prevState => ({
        ...prevState,
        isFirstSignin: body.first_login,
        accessTokens: {
          ...prevState.accessTokens,
          administrator_token: body.accessToken ? body.accessToken : false
        },
        loginPremise: {
          ...prevState.loginPremise,
          correct: body.correct !== undefined ? body.correct : false,
          errorResponse: body.error ? body.error : false
        }
      }))
    }
    // retrive logs from db
    await this.retrieveLogs();
    // retrieve block list from db
    await this.retrieveBlockList();
  };

  // function to handle form submit and post data to express
  handleSubmitApp = async e => {
    e.preventDefault();
    e.persist();

    const {
      loginPremise: {
        premises_id
      },
      loginApp: {
        current_profile,
        profile_password
      },
    } = this.state;

    const loginAppForm = {
      premises_id,
      current_profile,
      profile_password
    };


    // waits for post api to resolve promise
    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/appLogVal/appLogin'
    const body = await this.postApi(loginAppForm, endPoint).then(res => res);

    // updates state with info from express
    this.setState(prevState => ({
      accessTokens: {
        ...prevState.accessTokens,
        [`${current_profile}_token`]: body.accessToken
      },
      loginApp: {
        ...prevState.loginApp,
        correct: body.correct,
        fetchResponse: body.error ? body.error : "no errors"
      }
    }))
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
      },
      schoolDetails: {
        school_Name,
        street,
        street_Number,
        city,
        state,
        zip
      }
    } = this.state;

    const adminDetailsForm = {
      premises_id,
      first_Name,
      last_Name,
      email,
      admin_Password,
      front_Desk_Password,
      school_Name,
      street,
      street_Number,
      city,
      state,
      zip,
    };
    // waits for post api to resolve promise

    const endPoint = 'https://vmsa-prod-backend.herokuapp.com/API/adminRegVal/register'
    const body = await this.postApi(adminDetailsForm, endPoint).then(res => res);

    // updates state with info from express
    this.setState(prevState => ({
      adminDetails: {
        ...prevState.adminDetails,
        errorResponse: body.error ? body.error : false
      },
      schoolDetails: {
        ...prevState.schoolDetails,
        errorResponse: body.error ? body.error : false
      }
    }))

  };

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
  handleAppLoginFormChange = (e) => {
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
        current_profile: user
      })
  };

  // load input changes for admin page into state
  handleAdminDetailsFormChange = (e) => {
    e.persist();

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
          jumpStep: this.jumpStep,
          onSubmit: this.handleSubmit,
          onAppSubmit: this.handleSubmitApp,
          setSignInStatus: this.setSignInStatus,
          saveContinue: this.handleAdminRegSubmit,
          loginFormChange: this.handleAppLoginFormChange,
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
