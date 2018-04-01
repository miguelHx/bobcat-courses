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

export default extractSections;
