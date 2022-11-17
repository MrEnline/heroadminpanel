import { v4 as uuidv4 } from "uuid";
import { useRef, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const { filtersLoadindStatus } = useSelector((state) => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const { request } = useHttp();

    const refName = useRef(null);
    const refDescription = useRef(null);
    const [currElement, setCurrElement] = useState(null);

    console.log("HeroesAddForm");

    const renderFiltersElements = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>;
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>;
        }
        if (filters && filters.length > 0) {
            return filters.map(({ name, description }) => {
                if (name === "all") return;
                return (
                    <option key={name} value={name}>
                        {description}
                    </option>
                );
            });
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: refName.current.value,
            description: refDescription.current.value,
            element: currElement,
        };
        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(newHero))
            .then((res) => console.log(res, "Отправка успешна"))
            .then(dispatch(heroCreated(newHero)))
            .catch((err) => console.log(err));
        refName.current.value = "";
        refDescription.current.value = "";
        setCurrElement("");
    };

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Имя нового героя
                </label>
                <input
                    ref={refName}
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Описание
                </label>
                <textarea
                    ref={refDescription}
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ height: "130px" }}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Выбрать элемент героя
                </label>
                <select
                    value={currElement}
                    onChange={(event) => setCurrElement(event.target.value)}
                    required
                    className="form-select"
                    id="element"
                    name="element"
                >
                    <option>Я владею элементом...</option>
                    {renderFiltersElements(filters, filtersLoadindStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
