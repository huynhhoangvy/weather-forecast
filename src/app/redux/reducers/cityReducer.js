import * as constants from '../../constants';

export const cityReducer = (state = [], { type, city, id }) => {
    switch (type) {
        default:
            return state;
        case constants.ADD_CITY:
            return [
                ...state,
                city
            ];
        case constants.REMOVE_CITY:
            return state.filter(item => item.id !== id);
    }
}