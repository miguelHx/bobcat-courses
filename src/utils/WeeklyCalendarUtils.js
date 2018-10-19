// This file contains helper functions that are used by calendar components
// TODO add unit tests for these.

const extractSectionsFromSchedule = (currSchedule) => {
  const coursesList = Object.keys(currSchedule['schedule']); // ['ANTH-1', 'MATH-32', etc.]
  let sectionsList = [];
  for (let i = 0; i < coursesList.length; i++) {
    let currCourse = coursesList[i];
    let currSections = currSchedule['schedule'][currCourse];
    let currSectionKeys = Object.keys(currSections); // ['DISC', 'LAB', ...]
    for (let j = 0; j < currSectionKeys.length; j++) {
      if (currSections[currSectionKeys[j]] !== null) {
        sectionsList.push(currSections[currSectionKeys[j]]);
      }
    }
  }
  return sectionsList;
};

// maybe add testing for this function to handle all types of errors
const convert24to12HourFormat = (time24) => {
  // expecting numbers such as 7, 8, 9, 10, 11, 12, 13, 14 etc.
  if (time24 <= 12) {
    return `${time24}am`;
  }
  else {
    return `${time24 - 12}pm`;
  }
};

const convert24HrIntegerTo12Hr = (time24Integer) => {
  let timeStr = time24Integer.toString(10);
  let output;
  if (time24Integer < 1200) {
    output = `${[timeStr.slice(0, 1), ':', timeStr.slice(1)].join('')}am`;
  }
  else if (time24Integer > 1200) {
    output = `${[timeStr.slice(0, 2), ':', timeStr.slice(2)].join('')}pm`;
  }
  else {
    return "Noon";
  }
  return output;
};

/**
 *
 * @param startTime - time integer in 24 hr format (i.e. 730, 800, 1200, 1400)
 * @param endTime - same as above
 */
const convert24HrTimeRangeToString = (startTime, endTime) => {
  const startTimeStr = startTime.toString(10);
  const endTimeStr = endTime.toString(10);
  let startHr, startMin, endHr, endMin;
  if (startTimeStr.length <= 3) {
    startHr = startTimeStr.charAt(0);
    startMin = startTimeStr.substring(1, 3);
  }
  else {
    startHr = startTimeStr.substring(0, 2);
    startMin = startTimeStr.substring(2, startTimeStr.length);
  }
  if (endTimeStr.length <= 3) {
    endHr = endTimeStr.charAt(0);
    endMin = endTimeStr.substring(1, 3);
  }
  else {
    endHr = endTimeStr.substring(0, 2);
    endMin = endTimeStr.substring(2, endTimeStr.length);
  }
  return `${startHr}:${startMin}-${endHr}:${endMin}`;
};

// time12 := 3:30-4:20pm for example.
// however, a TBD might show up, need to account for that.
const convertTimeStringTo24 = (time12) => {
  if (time12.indexOf('TBD') >= 0) {
    // return nothing
    return 'TBD';
  }
  let parts = time12.split('-');// [3:30, 4:20pm]
  let startingHour = parseInt(parts[0].split(':')[0], 10);
  let startingMinutes = parts[0].split(':')[1];
  let endingHour = parseInt(parts[1].split(':')[0], 10);
  let endingMinutes = parts[1].split(':')[1].substring(0, 2);
  let AMorPM = parts[1].slice(-2); // am or pm

  if (AMorPM === 'pm') {
    if (endingHour === 12) {
      // handle case of 12:00 - 12:50pm
      // or 11:00 - 12:15pm
      // leave as is.
      startingHour = startingHour.toString(10);
      endingHour = endingHour.toString(10);
    }
    else if (endingHour >= startingHour) {
      startingHour += 12;
      startingHour = startingHour.toString(10);
      endingHour += 12;
      endingHour = endingHour.toString(10);
    }
    else {
      // for ex: 11-2pm
      startingHour = startingHour.toString(10);
      endingHour += 12;
      endingHour = endingHour.toString(10);
    }
  }
  // put time period back together in 24 hour format.
  let time = `${startingHour}:${startingMinutes}-${endingHour}:${endingMinutes}`;
  return time;
};



export { extractSectionsFromSchedule, convert24to12HourFormat, convert24HrIntegerTo12Hr, convert24HrTimeRangeToString, convertTimeStringTo24 };
