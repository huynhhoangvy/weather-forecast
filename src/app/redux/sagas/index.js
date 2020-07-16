import * as weatherSaga from "./weather";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([...Object.values(weatherSaga)].map(fork));
}
