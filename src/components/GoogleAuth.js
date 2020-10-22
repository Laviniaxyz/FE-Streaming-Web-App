import React from "react"
import {connect} from 'react-redux'
import {signInOK, signOutOK} from '../actions'

class GoogleAuth extends React.Component {
  //Initializing the library
  componentDidMount() {
    window.gapi.load("client:auth2", ()=> {
      window.gapi.client.init({
        clientId:
        '862306358932-mqicko8is6m7tulnokp1ipvpjfujj853.apps.googleusercontent.com',
        scope: 'email'
      })
      .then(()=> {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
    })
    })
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signInOK(this.auth.currentUser.get().getId())
    } else {
      this.props.signOutOK()
    }
  }

  SignIn = () => {
    this.auth.signIn()
  }

  SignOut = () => {
    this.auth.signOut()
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null
    } else if (this.props.isSignedIn) {
      return(
          <button onClick={this.SignOut} className="ui google button">
            <i className="google icon"/>
            Sign Out
          </button>
      )
    } else {
      return(
        <button onClick={this.SignIn} className="ui google button">
          <i className="google icon"/>
          Sign In with Google
        </button>
      )
    }
  }

  render() {
  return <div>{this.renderAuthButton()}</div>
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn
  }
}

export default connect(mapStateToProps, {signInOK, signOutOK})(GoogleAuth)