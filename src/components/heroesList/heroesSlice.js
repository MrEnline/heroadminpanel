import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// };

//получим начальные значения из адаптера
const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});

//данная функция возвращает promise и выполняется асинхронно
//она создает новый actionCreater
//heroes/fetchHeroes - после слыша указывается действие(fetchHeroes)
//можно не использовать async и await, т.к. в запросе request уже есть данные действия
//данные actionCreater добавляется в extraReducers
export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/heroes');
});

//в reducers сразу создаются actions в виде ключей(heroesFetching и т.д.)
//в качестве значений для ключей создаются действия
//здесь также работает библиотека immer.js, которая
//выполняет принцип иммутабельности
//при использовании return данный принцип соблюдаться не будет
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroCreated: (state, action) => {
            heroesAdapter.addOne(state, action.payload);
        },
        heroDeleted: (state, action) => {
            heroesAdapter.removeOne(state, action.payload);
        },
    },
    //pending - загрузка данных
    //fulfilled - данные загружены
    //rejected - ошибка загрузки данных
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {
                state.heroesLoadingStatus = 'loading';
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                //state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload);
                state.heroesLoadingStatus = 'idle';
            })
            .addCase(fetchHeroes.rejected, (state) => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {});
    },
});

const { selectAll } = heroesAdapter.getSelectors((state) => state.heroes);

//мемоизируем состояния двух редьюсеров с помощью reselect
export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    //(state) => state.heroes.heroes,
    selectAll,
    (filters, heroes) => {
        if (filters === 'all') {
            //будет только один рендер, если много раз нажимать на кнопку all
            return heroes;
        } else {
            return heroes.filter((item) => item.element === filters);
        }
    }
);

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroCreated, heroDeleted } = actions;
