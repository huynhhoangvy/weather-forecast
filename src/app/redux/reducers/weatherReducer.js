import * as constants from "../../constants";

export const weatherReducer = (state = [], { type, data }) => {
  switch (type) {
    default:
      return state;
    case constants.RECEIVE_API_DATA:
      return data;
    case constants.GET_WEATHER_BY_ID_SUCCESS:
      console.log('getweather: ', data);
      return [
        ...state,
        data
      ];
  }
};
