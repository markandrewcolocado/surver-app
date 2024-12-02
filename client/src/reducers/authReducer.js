import { FETCH_USER } from '../actions/types';
// a reduce should return only one of three values
// null when it is waiting for response
// false to indicate negative, in case of auth, negative means the user is not logged in
// the actual value to indicate positivity

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = null, action) {
  // console.log(action);
  switch (action.type) {
    case FETCH_USER:
      // the backend api returns empty string when the user in not logged in
      // we need to explicitly return the value false if the user in not logged in
      return action.payload || false;
    default:
      return state;
  }
}
