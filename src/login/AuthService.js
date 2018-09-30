import decode from 'jwt-decode';

const API_DOMAIN = 'https://cse120-course-planner.herokuapp.com/api/';

export default class AuthService {

  static login(username, password) {
    // get a token from the api server using the fetch API
    return AuthService.authFetch(`${API_DOMAIN}auth/token/obtain`, username, password)
      .then(res => {
        AuthService.setTokens(res.access, res.refresh, username); // Setting the token in localStorage
        return Promise.resolve(res);
    }).catch(error => {
      throw Error(error);
    });
  }

  static loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken(); // Getting token from localStorage
    return (!!token && !AuthService.isTokenExpired(token)); // handwaiving here
  }

  static isTokenExpired(token) {
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

  static setTokens(accessToken, refreshToken, username) {
    const userTokenInfo = JSON.stringify({
      access_token: accessToken,
      refresh_token: refreshToken,
      username: username
    });
    // Saves user token to localStorage
    localStorage.setItem('credentials', userTokenInfo);
  }

  static getToken() {
    // Retrieves the user token from localStorage, need to convert stringify'd JSON to object then extract token
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    return credentials && credentials.access_token; // returns null or access token
  }

  static logout() {
    // Clear user token and username from localStorage
    localStorage.removeItem('credentials');
  }

  static getUsername() {
    const credentials = JSON.parse(localStorage.getItem('credentials'));
    return credentials && credentials.username;
  }

  static authFetch(url, username, password) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (AuthService.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + AuthService.getToken();
    }

    const request = new Request(`${API_DOMAIN}auth/token/obtain`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        username,
        password,
      })
    });

    return fetch(request)
    .then(response => AuthService._checkStatus(response))
    .then(response => response.json());
  }

  static _checkStatus(response) {
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
