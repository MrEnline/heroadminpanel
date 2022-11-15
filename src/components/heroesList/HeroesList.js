import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import { createSelector } from 'reselect';
import { createSelector } from '@reduxjs/toolkit';
import { fetchHeroes, heroDeleted } from './heroesSlice';
import HeroesListItem from '../heroesListItem/HeroesListItem';
import Spinner from '../spinner/Spinner';
import { useCallback } from 'react';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    //мемоизируем состояния двух редьюсеров с помощью reselect
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => {
            console.log(`${state.heroes.heroes}`);
            return state.heroes.heroes;
        },
        (filters, heroes) => {
            console.log(`heroes - ${heroes}`);
            if (filters === 'all') {
                //будет только один рендер, если много раз нажимать на кнопку all
                console.log('render');
                return heroes;
            } else {
                return heroes.filter((item) => item.element === filters);
            }
        }
    );

    //данный способ работы с двумя редъюсерами не приветствуется из-за
    //просадки по оптимизации - происходит перерендер даже если ничего не поменялось на странице
    //решение использовать библиотеку reselect, которая мемоизирует состояние
    // const filtersHeroes = useSelector((state) => {
    //     if (state.filters.activeFilter === 'all') {
    //         //будет постонноя отрабатывать, если нажимать на фильтр all на экране
    //         console.log('render');
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter((item) => item.element === state.filters.activeFilter);
    //     }
    // });

    const filtersHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
    }, []);

    const onDeleteHero = useCallback(
        (id) => {
            request(`http://localhost:3001/heroes/${id}`, 'DELETE')
                .then((data) => console.log(data, 'Deleted'))
                .then(dispatch(heroDeleted(id)))
                .catch((err) => console.log(err));
        },
        [request]
    );

    if (heroesLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (heroesLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => {
            return <HeroesListItem key={id} {...props} onDeleteHero={() => onDeleteHero(id)} />;
        });
    };

    const elements = renderHeroesList(filtersHeroes);
    return <ul>{elements}</ul>;
};

export default HeroesList;
