const initialState = {
    filters: [],
    filtersLoadindStatus: 'idle',
    activeFilter: 'all',
};

const filters = (state = initialState, action) => {
    switch (action.type) {
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
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
            };
        default:
            return state;
    }
};

export default filters;
