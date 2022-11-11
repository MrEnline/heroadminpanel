import { createAction } from '@reduxjs/toolkit';

//Dispatch в качестве параметра подставляется автоматически
//с помощью библиотеки redux-thunk
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request('http://localhost:3001/heroes')
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request('http://localhost:3001/filters')
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
};

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING',
//     };
// };

export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (data) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: data,
//     };
// };

export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR',
//     };
// };

export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    };
};

export const filtersFetched = (data) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: data,
    };
};

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    };
};

export const heroCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero,
    };
};

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id,
    };
};

export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter,
    };
};

//
// export const activeFilterChanged = (filter) => (dispatch) => {
//     setTimeout(
//         () =>
//             dispatch({
//                 type: 'ACTIVE_FILTER_CHANGED',
//                 payload: filter,
//             }),
//         1000
//     );
// };
