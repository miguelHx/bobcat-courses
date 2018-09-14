
// const getSun = (d) => {
//   let dt = new Date(d);
//   let day = dt.getDay();
//   let diff = dt.getDate() - day;
//   return new Date(dt.setDate(diff));
// };

const getMon = (d) => {
  let dt = new Date(d);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(dt.setDate(diff));
};
const getTue = (d) =>  {
  let dt = new Date(d);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -5 : 2);
  return new Date(dt.setDate(diff));
};

const getWed = (d) => {
  let dt = new Date(d);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -4 : 3);
  return new Date(dt.setDate(diff));
};

const getThu = (d) => {
  let dt = new Date(d);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -3 : 4);
  return new Date(dt.setDate(diff));
};

const  getFri = (d) => {
  let dt = new Date(d);
  let day = dt.getDay();
  let diff = dt.getDate() - day + (day === 0 ? -2 : 5);
  return new Date(dt.setDate(diff));
};

// const getSat = (d) => {
//   let dt = new Date(d);
//   let day = dt.getDay();
//   let diff = dt.getDate() - day + (day === 0 ? -1 : 6);
//   return new Date(dt.setDate(diff));
// };

export {
  // getSun,
  getMon,
  getTue,
  getWed,
  getThu,
  getFri,
  // getSat,
};


