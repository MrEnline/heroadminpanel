import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { useEffect } from "react";
import { fetchFilters, activeFilterChanged, selectAll } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import store from "../../store";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    //const { filters, activeFilter } = useSelector((state) => state.filters);
    const { activeFilter, filtersLoadingStatus } = useSelector((state) => state.filters);
    //т.к. selectAll принимает аргумент state, то его надо получить из store
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const renderButtons = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>;
        }

        return arr.map(({ name, description, className }) => {
            const btnClassName = classNames("btn ", className, { active: name === activeFilter });
            return (
                <button
                    key={name}
                    id={name}
                    className={btnClassName}
                    onClick={() => dispatch(activeFilterChanged(name))}
                >
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
