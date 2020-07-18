import { fetchData } from "../../api/api";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  receiveApiData,
  getWeatherByIdSuccess,
  getWeatherByIdError,
  getForecastByIdSuccess,
  getForecastByIdError
} from "../actions/actionCreators";
import * as constants from "../../constants";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export function* weatherSaga() {
  yield takeLatest(constants.GET_WEATHER_BY_ID_REQUEST, getWeatherByIdWorker);
  yield takeLatest(constants.GET_FORECAST_BY_ID_REQUEST, getForecastByIdWorker);
}

function* getWeatherByIdWorker(action) {
  try {
    console.log('action: ', action)
    const response = yield call(getWeatherById, action.id);
    const data = yield response.json();
    console.log('response in saga: ', data)
    if (response.status === 200) {
      yield put(getWeatherByIdSuccess(data));
      storeData(data)
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
    // const response = await fetch(url, settings);
    // const data = await response.json();
    // return data;
    // return response;
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
  const url = `${BASE_URL}/forecast?id=${id}&APPID=${API_KEY}&units=metric`
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

const storeData = (data) => {
  const temp = {
    id: data.id,
    name: data.name,
    country: data.sys.country
  }
  const localData = JSON.parse(localStorage.getItem('cities'));
  if (localData) {
    console.log('if: ', [...localData, temp])
    localStorage.setItem('cities', JSON.stringify([...localData, temp]))
  } else {
    console.log('else: ', [temp])
    localStorage.setItem('cities', JSON.stringify([temp]))
  }
}

function* getApiData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.error(e);
  }
}