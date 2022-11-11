import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

//т.к. функция middleware может вызывать следующую похожую функцию
//то лучше вместо параметра dispatch использовать next, который затем
//и будет вызывать следующий middleware
const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
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
            if (typeof action === 'string') {
                return oldDispatch({
                    type: action,
                });
            }
            return oldDispatch(action);
        };
        return store;
    };

const store = createStore(
    combineReducers({ heroes, filters }),
    compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    // compose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
