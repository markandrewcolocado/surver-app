// using import statements, because in the front-end we use webpack and babel
// We have very easy access on ES2015 modules
// meanwhile on the backend we are making use of nodejs, which has only good support for commonjs modules right now
// and commonjs modules use require syntax instead
import React, { Component } from 'react';
// BrowserRouter is a react component tells React router how to behave. It changes the set of components base on the current URL
// The Route object is a react component that is used to set up a rule between a certain route
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurverNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
            {/* <Route path='/' component={Landing} /> */}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// First argument is reserved for the Mapstateprops argument/function
// Second arg, we pass in all the different action creators that we want to wire up
export default connect(null, actions)(App);
