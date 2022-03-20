import { SET_SELECTED_TERM } from "../actions/actionTypes";

const selectedTermDefaultState = { text: 'Fall 2022', value: '202230' };

const selectedTermReducer = (state = selectedTermDefaultState, action) => {
  switch (action.type) {
    case SET_SELECTED_TERM:
      return action.payload;
    default:
      return state;
  }
};

export default selectedTermReducer;
