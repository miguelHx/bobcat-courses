
const initialSectionsExtract = (courseData) => {
  let output = {};
  // build new structure of selectedSections
  // MAIN COMPONENT MUST BE FIRST INDEX OF SECTION # ARRAY
  const mainSection = courseData['info']['Main Section']; // LECT, or SEM, or...
  const linkedSections = courseData['info']['Linked Sections']; // ['DISC', 'LAB', etc.]
  const sectionKeys = Object.keys(courseData['sections']);

  for (let i = 0; i < sectionKeys.length; i++) {
    let sectionIndex = sectionKeys[i];
    output[sectionIndex] = [];
    // get main component first, put in array
    let mainSectionObj = courseData['sections'][sectionIndex][mainSection][0];
    mainSectionObj["isSelected"] = true; // by default, everything is selected
    mainSectionObj["isRowDisabled"] = false;
    mainSectionObj["Linked Sections"] = linkedSections;
    mainSectionObj["isMainComponent"] = true;

    output[sectionIndex].push(mainSectionObj);

    // now, want to push each linked component, the size of
    // linkedSections will be AT MOST 2, for when we link DISC and LAB
    let currSectionType = linkedSections[0];
    let sectionsList = courseData['sections'][sectionIndex][currSectionType];
    for (let k = 0; k < sectionsList.length; k++) {

      // TODO
      // take into account linked DISC with LAB
      // could just be an if statement that organizes the array differently.
      let currSectionObj = sectionsList[k];
      // set up default properties
      currSectionObj["isSelected"] = true;
      currSectionObj["isRowDisabled"] = false;
      currSectionObj["isMainComponent"] = false;
      output[sectionIndex].push(currSectionObj);
    }
  }
  return output;
};


const extractSections = (sections) => {
  // all we are doing here is parsing the sections state
  // return an array of all sections, with LECT first
  let output = [];
  const sectionKeys = Object.keys(sections);

  for (let i = 0; i < sectionKeys.length; i++) {
    let sectionsList = sections[sectionKeys[i]];
    for (let j = 0; j < sectionsList.length; j++) {
      let currSection = sectionsList[j];
      output.push(currSection);
    }
  }
  return output;
};

export { extractSections, initialSectionsExtract };
