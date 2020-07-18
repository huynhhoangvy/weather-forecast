import * as constants from "../../constants";

export const requestApiData = () => {
  return {
    type: constants.REQUEST_API_DATA
  };
};

export const receiveApiData = data => {
  return {
    type: constants.RECEIVE_API_DATA,
    data
  };
};

export const getWeatherByIdRequest = (id) => {
  return {
    type: constants.GET_WEATHER_BY_ID_REQUEST,
    id
  };
};

export const getWeatherByIdSuccess = (data) => {
  return {
    type: constants.GET_WEATHER_BY_ID_SUCCESS,
    data
  }
};

export const getWeatherByIdError = (err) => {
  return {
    type: constants.GET_WEATHER_BY_ID_ERROR,
    err
  };
};

export const addCity = city => {
  return {
    type: constants.ADD_CITY,
    city
  };
};

export const removeCity = id => {
  return {
    type: constants.REMOVE_CITY,
    id
  };
};

export const getForecastByIdRequest = id => {
  return {
    type: constants.GET_FORECAST_BY_ID_REQUEST,
    id
  };
};

export const getForecastByIdSuccess = data => {
  return {
    type: constants.GET_FORECAST_BY_ID_SUCCESS,
    data
  };
};

export const getForecastByIdError = err => {
  return {
    type: constants.GET_FORECAST_BY_ID_ERROR,
    err
  };
};

export const getWeatherByGroupRequest = ids => {
  console.log('gorup req: ', ids)
  return {
    type: constants.GET_WEATHER_BY_GROUP_REQUEST,
    ids
  };
};

export const getWeatherByGroupSuccess = data => {
  return {
    type: constants.GET_WEATHER_BY_GROUP_SUCCESS,
    data
  };
};

export const getWeatherByGroupError = err => {
  return {
    type: constants.GET_WEATHER_BY_GROUP_ERROR,
    err
  };
};
