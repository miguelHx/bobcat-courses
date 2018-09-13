import axios from 'axios';

const ROOT_API_URL = 'https://cse120-course-planner.herokuapp.com/api';

class BobcatCoursesApi {

  /**
   * Searches courses given a parameter of a course search query and term
   * @param params - course & term, course is the course search query
   *                 while term is the semester
   * @returns {AxiosPromise<any>}
   */
  static searchCourses(params) {
    return axios.get(`${ROOT_API_URL}/courses/course-search/?${params}`);
  }

  /**
   * signUp makes a call to the backend api to sign up a user
   * @param postData - an object that should contain a stringified object of
   *                  the following properties:
   *                  username, email, name, firstname, lastname, password
   * @returns {AxiosPromise<any>}
   */
  static signUp(postData) {
    return axios.post(`${ROOT_API_URL}/register/`, postData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  /**
   * Fetches course data with its respective sections
   * @param postData - a stringified object that contains an array called course_list
   *                   and a term for the semester
   * @returns {AxiosPromise<any>}
   */
  static fetchCourseData(postData) {
    return axios.post(`${ROOT_API_URL}/courses/course-match/`, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Gets valid generated schedules given a list of courses, the term, and the
   * search full option.
   * @param postData - a stringified object containing the following properties:
   *                   course_list - a list of courses to generate schedules from,
   *                   term - the semester term
   *                   search_full - whether to give back full courses or not
   * @returns {AxiosPromise<any>}
   */
  static fetchValidSchedules(postData) {
    return axios.post(`${ROOT_API_URL}/courses/schedule-search/`, postData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Api call that saves a user schedule given the crns we want to save and the user's
   * authentication token.
   * @param postData - a stringified json object that has the following properties:
   *                  crns - an array of crns that we want to save
   *                  term - the semester term
   * @param authToken - the JSON Web Token used to save the schedule with the proper user.
   * @returns {AxiosPromise<any>}
   */
  static saveUserSchedule(postData, authToken) {
    return axios.post(`${ROOT_API_URL}/users/save-schedule/`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  /**
   * Fetches user's saved schedules
   * @param authToken - JWT token used to authenticate and identify logged-in user
   * @returns {AxiosPromise<any>}
   */
  static fetchSavedSchedules(authToken) {
    return axios.get(`${ROOT_API_URL}/users/schedule-dump/`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  /**
   * Deletes a user's saved schedule.
   * @param postData - a stringified json object containing the following properties:
   *                  crns - an array of crns that we want to delete,
   *                  term - the currently saved term
   * @param authToken - JWT token used to authenticate and identify logged-in user
   * @returns {AxiosPromise<any>}
   */
  static deleteSavedSchedule(postData, authToken) {
    return axios.post(`${ROOT_API_URL}/users/delete-schedule/`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  }
}

export default BobcatCoursesApi;
