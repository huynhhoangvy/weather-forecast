import * as constants from '../../constants';

export const cityReducer = (state = [], { type, data, id }) => {
  switch (type) {
    default:
      return state;
    // case constants.ADD_CITY:
    //   return [
    //     ...state,
    //     city
    //   ];
    case constants.GET_WEATHER_BY_ID_SUCCESS:
      console.log('getweather: ', data);
      return [
        ...state,
        data
      ];
    case constants.REMOVE_CITY:
      return state.filter(item => item.id !== id);
  }
}