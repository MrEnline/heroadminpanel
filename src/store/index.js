import { configureStore } from "@reduxjs/toolkit";
import heroes from "../components/heroesList/heroesSlice";
import filters from "../components/heroesFilters/filtersSlice";

//т.к. функция middleware может вызывать следующую похожую функцию
//то лучше вместо параметра dispatch использовать next, который затем
//и будет вызывать следующий middleware
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === "string") {
        return next({
            type: action,
        });
    }
    return next(action);
};

//усилитель store
//трансформирует dispatch, который вместо объекта
//принимает строку
const enhancer =
    (createStore) =>
    (...args) => {
        const store = createStore(...args);
        //store содержит в себе функцию dispatch
        const oldDispatch = store.dispatch;
        store.dispatch = (action) => {
            if (typeof action === "string") {
                return oldDispatch({
                    type: action,
                });
            }
            return oldDispatch(action);
        };
        return store;
    };

// const store = createStore(
//     combineReducers({ heroes, filters }),
//     compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     // compose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// );

//ReduxThunk по умолчанию включен в middlewate ReduxToolkit, поэтому
//данный middleware можно не указывать
const store = configureStore({
    reducer: { heroes, filters },
    //middleware: [ReduxThunk, stringMiddleware],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

console.log(`heroes - ${store.getState().heroes}`);
console.log(`filters - ${store.getState().filters}`);
console.log("test");

export default store;
