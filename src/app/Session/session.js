function mapSession(user) {
  return {
    username: user.username,
    idToken: user.signInUserSession.idToken.jwtToken,
    idTokenExpiry: user.signInUserSession.idToken.payload.exp,
    accessToken: user.signInUserSession.accessToken.jwtToken,
    refreshToken: user.signInUserSession.refreshToken,
  }
}

const Session = {
  store: (session) => {
    localStorage.setItem('session', JSON.stringify(session))
  },
  storeCognitoUser: (user) => {
    Session.store(mapSession(user))
  },
  get: () => {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(localStorage.getItem('session')) : null
  },
  invalidate: () => {
    localStorage.removeItem('session')
  },
  isValid: () => {
    const session = Session.get()
    if (session) {
      return !Session.isExpired(session)
    }
    return false;
  },
  isExpired: (session) => {
    const date = new Date()
    console.log('check session expiry', date.getTime(), session)
    if (session.idTokenExpiry < date.getTime() / 1000 ) {
      console.log('expired')
      return true;
    }
    return false;
  }
}

export default Session