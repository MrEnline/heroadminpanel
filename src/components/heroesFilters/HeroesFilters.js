import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useState } from 'react';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const [activeButton, setActiveButton] = useState('Все');
    const { heroes, heroesLoadingStatus, filters } = useSelector((state) => state);
    const dispatch = useDispatch();

    const filtersAllElements = () => {};

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button className={classNames('btn btn-outline-dark', { active: activeButton === 'Все' })}>Все</button>
                    <button className={classNames('btn btn-danger', { active: activeButton === 'Огонь' })}>Огонь</button>
                    <button className={classNames('btn btn-primary', { active: activeButton === 'Вода' })}>Вода</button>
                    <button className={classNames('btn btn-success', { active: activeButton === 'Ветер' })}>Ветер</button>
                    <button className={classNames('btn btn-secondary', { active: activeButton === 'Земля' })}>Земля</button>
                </div>
            </div>
        </div>
    );
};

export default HeroesFilters;
