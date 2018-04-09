

const extractSectionsFromSchedule = (currSchedule) => {
  const coursesList = Object.keys(currSchedule['schedule']); // ['ANTH-1', 'MATH-32', etc.]
  let sectionsList = [];
  for (let i = 0; i < coursesList.length; i++) {
    let currCourse = coursesList[i];
    let currSections = currSchedule['schedule'][currCourse];
    let currSectionKeys = Object.keys(currSections); // ['DISC', 'LAB', ...]
    for (let j = 0; j < currSectionKeys.length; j++) {
      sectionsList.push(currSections[currSectionKeys[j]]);
    }
  }
  return sectionsList;
};



export { extractSectionsFromSchedule };
