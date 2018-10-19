import { ADD_CUSTOM_EVENT, EDIT_CUSTOM_EVENT, REMOVE_CUSTOM_EVENT } from "./actionTypes";


// ADD CUSTOM EVENT
/**
 * @param customEvent - a custom event object.
 * // a sample event object:
  {
    event_name: "walk dogs",
    start_time: 700,
    end_time: 800,
    days: "T",
  }
 * @returns {{type: number, payload: *}}
 */
export const addCustomEvent = (customEvent) => {
  return {
    type: ADD_CUSTOM_EVENT,
    payload: customEvent,
  };
};

// EDIT CUSTOM EVENT
export const editCustomEvent = (customEventToEdit, updatedCustomEventObject) => {
  return {
    type: EDIT_CUSTOM_EVENT,
    editEvent: customEventToEdit,
    payload: updatedCustomEventObject,
  };
};

// REMOVE CUSTOM EVENT
export const removeCustomEvent = (customEventToRemove) => {
  return {
    type: REMOVE_CUSTOM_EVENT,
    payload: customEventToRemove,
  };
};
