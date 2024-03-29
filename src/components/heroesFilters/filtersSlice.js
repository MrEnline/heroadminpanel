import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter();

// const initialState = {
//     filters: [],
//     filtersLoadindStatus: 'idle',
//     activeFilter: 'all',
// };

const initialState = filtersAdapter.getInitialState({
    filtersLoadindStatus: "idle",
    activeFilter: "all",
});

export const fetchFilters = createAsyncThunk("filters/fetchFilters", async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/filters");
});

//в reducers сразу создаются actions в виде ключей(heroesFetching и т.д.)
//в качестве значений для ключей создаются действия
//здесь также работает библиотека immer.js, которая
//выполняет принцип иммутабельности
//при использовании return данный принцип соблюдаться не будет
const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, (state) => {
                state.filtersLoadindStatus = "loading";
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                //state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadindStatus = "idle";
            })
            .addCase(fetchFilters.rejected, (state) => {
                state.filtersLoadindStatus = "error";
            })
            .addDefaultCase(() => {});
    },
});

//т.к. мы указали функцию внутри getSelectors, то благодаря ей
//мы получим только сущность(entity) filters через селектор selectAll
export const { selectAll } = filtersAdapter.getSelectors((state) => state.filters);

//так нельзя делать и не будет работать, потому что store создается на основе reducer
//а значит после того как будет создан reducer
//const getFilters = selectAll(store.getState())

const { actions, reducer } = filtersSlice;

export default reducer;
export const { activeFilterChanged } = actions;
