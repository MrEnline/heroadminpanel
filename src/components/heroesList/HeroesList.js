import { useHttp } from "../../hooks/http.hook";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { createSelector } from 'reselect';
//import { createSelector } from '@reduxjs/toolkit';
import { fetchHeroes, heroDeleted, filteredHeroesSelector } from "./heroesSlice";
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";
import { useCallback } from "react";
import { useGetHeroesQuery, useDeleteHeroMutation } from "../../api/apiSlice";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
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

    //данные полученные с сервера попадут в data, а затем переложим их в heroes
    //кроме данных получаем флаги состояния запроса - isLoading, isSuccess и т.д.
    const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector((state) => state.filters.activeFilter);

    //чтобы данная функция на каждом рендере не производила фильтрацию
    //обернем ее в useMemo
    const filteredHeroes = useMemo(() => {
        //сделаем копию полученных данных heroes с сервера, чтобы их не мутировать
        //через slice делать копию советует официальная документация react
        const filteredHeroes = heroes.slice();

        if (activeFilter === "all") {
            //будет только один рендер, если много раз нажимать на кнопку all
            return filteredHeroes;
        } else {
            return filteredHeroes.filter((item) => item.element === activeFilter);
        }
    }, [heroes, activeFilter]);

    // const filtersHeroes = useSelector(filteredHeroesSelector);
    // const heroesLoadingStatus = useSelector((state) => state.heroes.heroesLoadingStatus);
    // const dispatch = useDispatch();
    // const { request } = useHttp();

    // useEffect(() => {
    //     dispatch(fetchHeroes());
    // }, []);

    //данная функция никогда не будет изменена и поэтому можно не указывать
    //зависимость для useCallback
    const onDeleteHero = useCallback((id) => {
        // request(`http://localhost:3001/heroes/${id}`, "DELETE")
        //     .then((data) => console.log(data, "Deleted"))
        //     .then(dispatch(heroDeleted(id)))
        //     .catch((err) => console.log(err));

        deleteHero(id);
    }, []);

    if (isLoading) {
        return <Spinner />;
    } else if (isError) {
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

    const elements = renderHeroesList(filteredHeroes);
    return <ul>{elements}</ul>;
};

export default HeroesList;
