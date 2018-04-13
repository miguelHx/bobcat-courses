

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

// maybe add testing for this funcion to handle all types of errors
const convert24to12HourFormat = (time24) => {
  // expecting numbers such as 7, 8, 9, 10, 11, 12, 13, 14 etc.
  if (time24 <= 12) {
    return `${time24}:00am`;
  }
  else {
    return `${time24 - 12}:00pm`;
  }
};

// time12 := 3:30-4:20pm for example.
const convertTimeStringTo24 = (time12) => {
  let parts = time12.split('-');// [3:30, 4:20pm]
  let startingHour = parseInt(parts[0].split(':')[0], 10);
  let startingMinutes = parts[0].split(':')[1];
  let endingHour = parseInt(parts[1].split(':')[0], 10);
  let endingMinutes = parts[1].split(':')[1].substring(0, 2);
  let AMorPM = parts[1].slice(-2); // am or pm

  console.log("Ending hour: ", endingHour);
  console.log("Starting hour: ", startingHour);
  if (AMorPM == 'pm') {
    if (endingHour === 12) {
      // handle case of 12:00 - 12:50pm
      // or 11:00 - 12:15pm
      // leave as is.
      startingHour = startingHour.toString(10);
      endingHour = endingHour.toString(10);
    }
    if (endingHour >= startingHour) {
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
}



export { extractSectionsFromSchedule, convert24to12HourFormat, convertTimeStringTo24 };
