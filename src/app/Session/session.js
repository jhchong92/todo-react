function mapSession(user) {
  return {
    username: user.username,
    idToken: user.signInUserSession.idToken,
    accessToken: user.signInUserSession.accessToken,
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
}

export default Session