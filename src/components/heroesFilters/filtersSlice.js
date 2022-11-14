import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadindStatus: 'idle',
    activeFilter: 'all',
};

//в reducers сразу создаются actions в виде ключей(heroesFetching и т.д.)
//в качестве значений для ключей создаются действия
//здесь также работает библиотека immer.js, которая
//выполняет принцип иммутабельности
//при использовании return данный принцип соблюдаться не будет
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        filtersFetching: (state) => {
            state.filtersLoadindStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.filters = action.payload;
            state.filtersLoadindStatus = 'idle';
        },
        filtersFetchingError: (state) => {
            state.filtersLoadindStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } = actions;
