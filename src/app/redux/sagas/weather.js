import { fetchData } from "../../api/api";
import { call, put, takeLatest } from "redux-saga/effects";

import { receiveApiData, requestApiData } from "../actions/actionCreators";

function* getApiData(action) {
  try {
    const data = yield call(fetchData);
    yield put(receiveApiData(data));
  } catch (e) {
    console.error(e);
  }
}

export function* weatherSaga() {
  yield takeLatest(requestApiData, getApiData);
}
