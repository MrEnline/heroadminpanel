import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useEffect } from 'react';
import { fetchFilters, activeFilterChanged, selectEntities } from './filtersSlice';

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    //const { filters, activeFilter } = useSelector((state) => state.filters);
    const { filters } = selectEntities;
    const activeFilter = 'all';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    const renderButtons = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
        }

        return arr.map(({ name, description, className }) => {
            const btnClassName = classNames('btn ', className, { active: name === activeFilter });
            return (
                <button key={name} id={name} className={btnClassName} onClick={() => dispatch(activeFilterChanged(name))}>
                    {description}
                </button>
            );
        });
    };

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">{renderButtons(filters)}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
