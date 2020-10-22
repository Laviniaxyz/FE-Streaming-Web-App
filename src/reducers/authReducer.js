import {SIGN_IN_OK, SIGN_OUT_OK} from '../actions/types'

const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
}

export default (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN_OK:
      return {...state, isSignedIn: true, userId: action.payload}
    case SIGN_OUT_OK:
      return {...state, isSignedIn: false, userId: null}
      default:
      return state
  }
}