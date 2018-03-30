const extractSections = (sectionsObj) => {
  // all we are doing here is parsing the JSON data
  // return an array of all sections, with LECT first
  let output = [];
  const sections = Object.keys(sectionsObj);

  // get keys as array
  for (let i = 0; i < sections.length; i++) {
    // get section types as keys array (LECT, DISC, LAB, etc.)
    let sectionTypesList = Object.keys(sectionsObj[sections[i]]);
    // loop through section types
    for (let j = 0; j < sectionTypesList.length; j++) {
      // get current section type
      let sectionType = sectionTypesList[j];
      // get entire list of this section type, for ex. LECT will yield all elements in JSON array for LECT
      let sectionsList = sectionsObj[sections[i]][sectionTypesList[j]];
      // loop through that list, appending to output
      for (let k = 0; k < sectionsList.length; k++) {
        // append to output array
        //console.log(sectionsList[k]);
        sectionsList[k].isSelected = true // by default, newly added courses will be selected
        output.push(sectionsList[k]);
      }
    }
  }
  return output
};

export default extractSections;
