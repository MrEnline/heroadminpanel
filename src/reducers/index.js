const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading',
            };
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload.heroes ? action.payload.heroes : state.heroes,
                heroesLoadingStatus: 'idle',
                filters: action.payload.filters ? action.payload.filters : state.filters,
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            };
        default:
            return state;
    }
};

export default reducer;
