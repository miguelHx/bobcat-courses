import { SET_SELECTED_TERM } from "../actions/actionTypes";

const selectedTermDefaultState = { text: 'Spring 2023', value: '202310' };

const selectedTermReducer = (state = selectedTermDefaultState, action) => {
  switch (action.type) {
    case SET_SELECTED_TERM:
      return action.payload;
    default:
      return state;
  }
};

export default selectedTermReducer;
