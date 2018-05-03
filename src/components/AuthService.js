import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'https://cse120-course-planner.herokuapp.com/api/' // API server domain
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.getUsername = this.getUsername.bind(this);
  }

  login(username, password) {
    // get a token from the api server using the fetch API
    return this.fetch(`${this.domain}auth/token/obtain`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      console.log(res);
      this.setTokens(res.access, res.refresh, username); // Setting the token in localStorage
      return Promise.resolve(res);
    })
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localStorage
    return (!!token && !this.isTokenExpired(token)); // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired.
        return true;
      }
      else {
        return false;
      }
    }
    catch (err) {
      return false;
    }
  }

  setTokens(accessToken, refreshToken, username) {
    const userTokenInfo = JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
      username: username
    });
    // Saves user token to localStorage
    localStorage.setItem('credentials', userTokenInfo);
  }

  getToken() {
    // Retrieves the user token from localStorage, need to convert stringify'd JSON to object then extract token
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    return credentials && credentials.access_token; // returns null or access token
  }

  logout() {
    // Clear user token and username from localStorage
    localStorage.removeItem('credentials');
  }

  getUsername() {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    return credentials && credentials.username;
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
    .then(this._checkStatus)
    .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // success status lies between 200 to 300
      return response;
    }
    else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
}
