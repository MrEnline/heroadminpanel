import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";

//Dispatch в качестве параметра подставляется автоматически
//с помощью библиотеки redux-thunk
export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
};

export const filtersFetching = createAction("FILTERS_FETCHING");

// export const filtersFetched = (data) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: data,
//     };
// };

export const filtersFetched = createAction("FILTERS_FETCHED");

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR',
//     };
// };

export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");

// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter,
//     };
// };

export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED");

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
