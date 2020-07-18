import { fetchData } from "../../api/api";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  receiveApiData,
  getWeatherByIdSuccess,
  getWeatherByIdError,
  getForecastByIdSuccess,
  getForecastByIdError,
  getWeatherByGroupSuccess,
  getWeatherByGroupError
} from "../actions/actionCreators";
import * as constants from "../../constants";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export function* weatherSaga() {
  yield takeLatest(constants.GET_WEATHER_BY_ID_REQUEST, getWeatherByIdWorker);
  yield takeLatest(constants.GET_FORECAST_BY_ID_REQUEST, getForecastByIdWorker);
  yield takeLatest(constants.GET_WEATHER_BY_GROUP_REQUEST, getWeatherByGroupWorker);
}

function* getWeatherByIdWorker(action) {
  try {
    console.log('action: ', action)
    const response = yield call(getWeatherById, action.id);
    const data = yield response.json();
    console.log('data in saga: ', data)
    console.log('response in saga: ', response)
    if (response.status === 200) {
      yield put(getWeatherByIdSuccess(data));
    } else {
      yield put(getWeatherByIdError(data));
    }
  } catch (err) {
    yield put(getWeatherByIdError(err));
  }
}

const getWeatherById = async (id) => {
  console.log('cityid: ', id)
  console.log('url: ', BASE_URL)
  const url = `${BASE_URL}/weather?units=metric&id=${id}&appid=${API_KEY}`;
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    return await fetch(url, settings);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

function* getForecastByIdWorker(action) {
  try {
    const response = yield call(getForecastById, action.id);
    const data = yield response.json();
    if (response.status === 200) {
      yield put(getForecastByIdSuccess(data));
    } else {
      yield put(getForecastByIdError(data));
    }
  } catch (err) {
    yield put(getForecastByIdError(err));
  }
}

const getForecastById = async (id) => {
  const url = `${BASE_URL}/forecast?id=${id}&APPID=${API_KEY}&units=metric`;
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    return await fetch(url, settings);
  } catch (err) {
    console.err(err);
    throw err;
  }
}

function* getWeatherByGroupWorker(action) {
  console.log('group res: ', action)
  try {
    console.log('group res: ', action)
    const response = yield call(getWeatherByGroup, action.ids);
    const data = yield response.json();
    console.log('group res: ', response)
    if (response.status === 200) {
      yield put(getWeatherByGroupSuccess(data));
    } else {
      yield put(getWeatherByGroupError(data));
    }
  } catch (err) {
    yield put(getWeatherByGroupError(err));
  }
}

const getWeatherByGroup = async (ids) => {
  const url = `${BASE_URL}/group?id=${ids}&units=metric&APPID=${API_KEY}`;
  console.log('group api: ', url)
  const settings = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    return await fetch(url, settings);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
