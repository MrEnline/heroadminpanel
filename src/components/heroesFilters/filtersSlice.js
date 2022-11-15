import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    filters: [],
    filtersLoadindStatus: 'idle',
    activeFilter: 'all',
};

export const fetchFilters = createAsyncThunk('filters/fetchFilters', async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/filters');
});

//в reducers сразу создаются actions в виде ключей(heroesFetching и т.д.)
//в качестве значений для ключей создаются действия
//здесь также работает библиотека immer.js, которая
//выполняет принцип иммутабельности
//при использовании return данный принцип соблюдаться не будет
const filtresSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadindStatus = 'loading';
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadindStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadindStatus = 'error';
            });
    },
});

const { actions, reducer } = filtresSlice;

export default reducer;
export const { activeFilterChanged } = actions;
