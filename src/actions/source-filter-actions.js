import {GET_SOURCES_URL} from '../constants/constants';

export const addSourceFilter = (filterType, filterValue) => {
    return {
        type: 'ADD_SOURCE_FILTER',
        payload: {
            filterType,
            filterValue
        }
    }
}
export const deleteSourceFilter = (filterType, filterValue) => {
    return {
        type: 'DELETE_SOURCE_FILTER',
        payload: {
            filterType,
            filterValue
        }
    }
}
export const resetSourceFilter = (filterType) => {
    return {
        type: 'RESET_SOURCE_FILTER',
        payload: {
            filterType
        }
    }
}

export const getAllSources = () => {
    return (dispatch) => {
        if (shouldGetSourcesFromLocalStorage()) {
            const allSources = localStorage.getItem('allSources');
            dispatch({
                type: 'GET_ALL_SOURCES_SUCCESS',
                payload: JSON.parse(allSources)
            });
        } else {
            dispatch({
                type: 'CHANGE_IS_LOADING'
            });

            fetchAllSources(dispatch);
        }
    }
}

export const changePage = (page) => {
    return {
        type: 'CHANGE_PAGE',
        payload: page
    }
}

const shouldGetSourcesFromLocalStorage = () => {
    const allSourcesExpiresDate = localStorage.getItem('allSourcesExpiresDate');

    if (allSourcesExpiresDate && (new Date(allSourcesExpiresDate) > new Date())) {
        return true;
    }

    return false;
}

const fetchAllSources = (dispatch) => {
    fetch(GET_SOURCES_URL)
                .then((response) => {
                    return response.json();
                })
                .then((response) => {
                    handleFetchAllSourcesSuccess(dispatch, response);
                })
                .catch((err) => {
                    handleFetchAllSourcesError(dispatch, err);
                });
}

const handleFetchAllSourcesSuccess = (dispatch, response) => {
    const allSources = response.sources;
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 20);
    
    localStorage.setItem('allSources', JSON.stringify(allSources));
    localStorage.setItem('allSourcesExpiresDate', currentDate);

    dispatch({
        type: 'GET_ALL_SOURCES_SUCCESS',
        payload: allSources
    });
}

const handleFetchAllSourcesError = (dispatch, err) => {
    dispatch({
        type: 'GET_ALL_SOURCES_ERROR',
        payload: err.message
    });
}