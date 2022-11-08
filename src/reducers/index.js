const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadindStatus: 'idle',
    filtersHeroes: [],
    activeFilter: 'all',
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
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
            };
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error',
            };
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadindStatus: 'loading',
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadindStatus: 'idle',
            };
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadindStatus: 'error',
            };
        case 'HERO_CREATED':
            const newHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: newHeroList,
            };
        case 'HERO_DELETED':
            const newHeroesList = state.heroes.filter((hero) => hero.id !== action.payload);
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: newHeroesList,
            };
        default:
            return state;
    }
};

export default reducer;
