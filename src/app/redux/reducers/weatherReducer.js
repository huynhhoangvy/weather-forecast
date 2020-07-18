import * as constants from "../../constants";

export const weatherReducer = (state = {}, { type, data }) => {
  switch (type) {
    default:
      return state;
    case constants.GET_FORECAST_BY_ID_SUCCESS:
      return data;
  }
};
