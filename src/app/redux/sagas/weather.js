import { fetchData } from "../../api/api";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  receiveApiData,
  getWeatherByIdSuccess,
  getWeatherByIdError
} from "../actions/actionCreators";
import * as constants from "../../constants";


const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export function* weatherSaga() {
  yield takeLatest(constants.REQUEST_API_DATA, getApiData);
  yield takeLatest(constants.GET_WEATHER_BY_ID_REQUEST, getWeatherByIdWorker);
}

function* getWeatherByIdWorker(action) {
  try {
    console.log('action: ', action)
    const response = yield call(getWeatherById, action.id);
    const data = yield response.json()
    console.log('response in saga: ', data)
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
  const url = `${BASE_URL}/weather?id=${id}&appid=${API_KEY}`;
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

function* getApiData(action) {
  try {
    // api call
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.error(e);
  }
}