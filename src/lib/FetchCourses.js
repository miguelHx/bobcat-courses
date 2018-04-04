// will fetch a list of courses given a department
const BASE_URL = `https://cse120-course-planner.herokuapp.com/api/courses-list/`;

const fetchCourses = (dept) => {
  console.log("inside fetch courses", dept);
  let output = [];
  // get request for department
  const param = `subject=Core`;
  const api_url = `${BASE_URL}?${param}`;
  let http = new XMLHttpRequest();
  http.open("GET", api_url, true);
  http.setRequestHeader("Authorization", "Basic " + btoa("admin:course-planner"));
  http.setRequestHeader("Content-type", "application/json");
  http.onreadystatechange = function() {
    if (http.readyState === 4 && http.status === 200) {
      let json = JSON.parse(http.responseText);
      window.coursesJSON = json;
      console.log(json);
    }
  };
  http.send(null);
};

export { fetchCourses };
