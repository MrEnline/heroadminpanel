import { createReducer } from '@reduxjs/toolkit';
import { heroesFetching, heroesFetched, heroesFetchingError, heroCreated, heroDeleted } from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
};

//1-й вариант
//в библиотеке ReduxToolkit в createReducer и createSlice
//встроена библиотека immer.js, которая применяет принцип иммутабельности
//если не использовать слово return, т.е. не следует возвращать данные
// const heroes = createReducer(initialState, (builder) => {
//     builder
//         .addCase(heroesFetching, (state) => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addCase(heroesFetchingError, (state) => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addDefaultCase(() => {});
// });

//2-й вариант
//используется только с react.js. В typescript работать не будет
//вместо функции builder => {} будет передаваться объект
const heroes = createReducer(
    initialState,
    {
        [heroesFetching]: (state) => {
            state.heroesLoadingStatus = 'loading';
        },
        [heroesFetched]: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
        [heroesFetchingError]: (state) => {
            state.heroesLoadingStatus = 'error';
        },
        [heroCreated]: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes.push(action.payload);
        },
        [heroDeleted]: (state, action) => {
            state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
            state.heroesLoadingStatus = 'idle';
        },
    },
    [],
    (state) => state
);

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading',
//             };
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle',
//             };
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error',
//             };
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'idle',
//                 heroes: [...state.heroes, action.payload],
//             };
//         case 'HERO_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter((hero) => hero.id !== action.payload),
//                 heroesLoadingStatus: 'idle',
//             };
//         default:
//             return state;
//     }
// };

export default heroes;
