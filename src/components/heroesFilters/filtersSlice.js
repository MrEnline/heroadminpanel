import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadindStatus: 'idle',
    activeFilter: 'all',
};

//благодаря методу createSlice автоматически создаются ключи - actions и
//reducers - чистые функции, которые выполняются в ответ на actions
//в reducers сразу создаются actions в виде ключей(filtersFetching и т.д.)
//в качестве значений для ключей создаются редьюсеры, т.е. чистые функции, которые выполняюся в ответ на действия
//здесь также работает библиотека immer.js, которая
//выполняет принцип иммутабельности
//при использовании return данный принцип соблюдаться не будет
const filtersSlice = createSlice({
    name: 'filters',
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

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } = actions;
