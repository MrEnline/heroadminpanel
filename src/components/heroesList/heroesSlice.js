import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

//в reducers сразу создаются actions в виде ключей(heroesFetching и т.д.)
//в качестве значений для ключей создаются действия
//здесь также работает библиотека immer.js, которая
//выполняет принцип иммутабельности
//при использовании return данный принцип соблюдаться не будет
const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroesFetching: (state) => {
            state.heroesLoadingStatus = "loading";
        },
        heroesFetched: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = "idle";
        },
        heroesFetchingError: (state) => {
            state.heroesLoadingStatus = "error";
        },
        heroCreated: (state, action) => {
            state.heroesLoadingStatus = "idle";
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
            state.heroesLoadingStatus = "idle";
        },
    },
});

const { actions, reducers } = heroesSlice;

export default reducers;
export const { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } = actions;
