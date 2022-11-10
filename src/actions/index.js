export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING',
    };
};

export const heroesFetched = (data) => {
    return {
        type: 'HEROES_FETCHED',
        payload: data,
    };
};

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR',
    };
};

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING',
    };
};

export const filtersFetched = (data) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: data,
    };
};

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR',
    };
};

export const heroCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero,
    };
};

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id,
    };
};

export const activeFilterChanged = (data) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: data,
    };
};
