import * as constants from '../../constants';
import storage from 'redux-persist/lib/storage';

export const cityReducer = (state = [], { type, data, id }) => {
  switch (type) {
    default:
      return state;
    case constants.GET_WEATHER_BY_ID_SUCCESS:
      console.log('getweather: ', data);
      return [
        ...state,
        data
      ];
    case constants.REMOVE_CITY:
      return state.filter(item => item.id !== id);
    case constants.GET_WEATHER_BY_GROUP_SUCCESS:
      console.log('city reducer: ', data)
      return data.list;
  }
}

// const persistConfig = {
//   key: 'cities',
//   storage: storage,
//   whitelist: ['id']
// }