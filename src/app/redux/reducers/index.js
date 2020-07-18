import { combineReducers } from "redux";
import { weatherReducer } from "./weatherReducer";
import { cityReducer } from "./cityReducer";

export default combineReducers({
  weather: weatherReducer,
  cities: cityReducer
});
