import { RECEIVE_API_DATA, REQUEST_API_DATA } from "../actions/constants";

export const weatherReducer = (state = {}, { type, data }) => {
  switch (type) {
    default:
      return state;
    case RECEIVE_API_DATA:
      return data;
  }
};
