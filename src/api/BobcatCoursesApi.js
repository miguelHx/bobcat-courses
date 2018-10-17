const ROOT_API_URL = 'https://cse120-course-planner.herokuapp.com/api';

class BobcatCoursesApi {

  /**
   * Searches courses given a parameter of a course search query and term
   * @param params - course & term, course is the course search query
   *                 while term is the semester
   * @returns {Promise<Response | never>}
   */
  static searchCourses(params) {
    const request = new Request(`${ROOT_API_URL}/courses/course-search/?${params}`, {
      method: 'GET'
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * signUp makes a call to the backend api to sign up a user
   * @param postData - an object that should contain a stringified object of
   *                  the following properties:
   *                  username, email, name, firstname, lastname, password
   * @returns {Promise<Response | never>}
   */
  static signUp(postData) {
    const request = new Request(`${ROOT_API_URL}/register/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: postData
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * Fetches course data with its respective sections
   * @param postData - a stringified object that contains an array called course_list
   *                   and a term for the semester
   * @returns {Promise<Response | never>}
   */
  static fetchCourseData(postData) {
    const request = new Request(`${ROOT_API_URL}/courses/course-match/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: postData
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * Gets valid generated schedules given a list of courses, the term, and the
   * search full option.
   * @param postData - a stringified object containing the following properties:
   *                   course_list - a list of courses to generate schedules from,
   *                   term - the semester term
   *                   search_full - whether to give back full courses or not
   * @returns {Promise<Response | never>}
   */
  static fetchValidSchedules(postData) {
    const request = new Request(`${ROOT_API_URL}/courses/schedule-search/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: postData
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * Api call that saves a user schedule given the crns we want to save and the user's
   * authentication token.
   * @param postData - a stringified json object that has the following properties:
   *                  crns - an array of crns that we want to save
   *                  term - the semester term
   * @param authToken - the JSON Web Token used to save the schedule with the proper user.
   * @returns {Promise<Response | never>}
   */
  static saveUserSchedule(postData, authToken) {
    const request = new Request(`${ROOT_API_URL}/users/save-schedule/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }),
      body: postData
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * Fetches user's saved schedules
   * @param authToken - JWT token used to authenticate and identify logged-in user
   * @returns {Promise<Response | never>}
   */
  static fetchSavedSchedules(authToken) {
    const request = new Request(`${ROOT_API_URL}/users/schedule-dump/`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${authToken}`
      })
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  /**
   * Deletes a user's saved schedule.
   * @param postData - a stringified json object containing the following properties:
   *                  crns - an array of crns that we want to delete,
   *                  term - the currently saved term
   * @param authToken - JWT token used to authenticate and identify logged-in user
   * @returns {Promise<Response | never>}
   */
  static deleteSavedSchedule(postData, authToken) {
    const request = new Request(`${ROOT_API_URL}/users/delete-schedule/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }),
      body: postData
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static updateUserPassword(postData, authToken) {
    const request = new Request(`${ROOT_API_URL}/users/change-password/`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }),
      body: postData
    });

    return fetch(request).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

export default BobcatCoursesApi;
