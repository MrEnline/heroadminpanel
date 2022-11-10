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
                filtersHeroes: state.activeFilter === 'all' ? action.payload : action.payload.filter((item) => item.element === state.activeFilter),
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
            const newCreatedHeroList = [...state.heroes, action.payload];
            return {
                ...state,
                heroesLoadingStatus: 'idle',
                heroes: newCreatedHeroList,
                filtersHeroes:
                    state.activeFilter === 'all' ? newCreatedHeroList : newCreatedHeroList.filter((item) => item.element === state.activeFilter),
            };
        case 'HERO_DELETED':
            const newHeroesList = state.heroes.filter((hero) => hero.id !== action.payload);
            return {
                ...state,
                heroes: newHeroesList,
                heroesLoadingStatus: 'idle',
                filtersHeroes: state.activeFilter === 'all' ? newHeroesList : newHeroesList.filter((item) => item.element === state.activeFilter),
            };
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                filtersHeroes: action.payload === 'all' ? state.heroes : state.heroes.filter((item) => item.element === action.payload),
                activeFilter: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
