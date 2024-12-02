// We will use materializecss because it is easily customizable, it is vanilla, plain old css files, easily overriadeable
// while material UI is a javascript based styling, it implements its styling inside of the javascript world

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo">
            Emaily
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

// this function will be called with the entire state object out of the redux store
// the object that will be returned by this function will be passed to the header as props
// function mapStateToProps(state) {
//   return { auth: state.auth };
// }
// Refactoring the mapStateToProps function: destructure, etc
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
