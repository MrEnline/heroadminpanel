import { v4 as uuidv4 } from "uuid";
import { useRef, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroesFetching, heroesFetched, heroesFetchingError, heroCreated } from "../../actions";

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
    const { filters } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    const refName = useRef(null);
    const refDescription = useRef(null);
    const [currElement, setCurrElement] = useState(null);

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/filters")
            .then((data) => dispatch(heroesFetched({ heroes: null, filters: data })))
            .catch(() => dispatch(heroesFetchingError()));

        // eslint-disable-next-line
    }, []);

    const handleAddElement = () => {
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
    };

    return (
        <form className="border p-4 shadow-lg rounded">
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
                    <option value={filters[1]}>Огонь</option>
                    <option value={filters[2]}>Вода</option>
                    <option value={filters[3]}>Ветер</option>
                    <option value={filters[4]}>Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleAddElement}>
                Создать
            </button>
        </form>
    );
};

export default HeroesAddForm;
