import {BASE_URL, API_KEY} from '../constants/constants';

export const changeSelectedSource = (source) => {
    return {
        type: 'CHANGE_SELECTED_SOURCE',
        payload: source
    }
}

export const getArticles = (source, selectedSource, filter) => {
    return (dispatch) => {
        dispatch(changeSelectedSource(source));
        
        if (filter || (source !== selectedSource)) {
            localStorage.removeItem('articlesExpiresDate');
            localStorage.removeItem('articles');
        }

        if (shouldGetArticlesFromLocalStorage()) {
            const articles = localStorage.getItem('articles');
            dispatch({
                type: 'GET_ARTICLES_SUCCESS',
                payload: JSON.parse(articles)
            });
        } else {
            dispatch({
                type: 'CHANGE_IS_LOADING'
            });

            fetchArticles(source, filter, dispatch);
        }
    }
}

const shouldGetArticlesFromLocalStorage = () => {
    const articlesExpiresDate = localStorage.getItem('articlesExpiresDate');

    if (articlesExpiresDate && (new Date(articlesExpiresDate) > new Date())) {
        return true;
    }

    return false;
}

const fetchArticles = (source, filter, dispatch) => {
    const getArticlesUrlFirstPart = `${BASE_URL}everything?sources=${source}`;
    const getArticlesUrlSortParam = filter && filter !== 'none' ? `&sortBy=${filter}` : '';
    const getArticlesUrlApiParam = `&apiKey=${API_KEY}`;

    const getArticlesUrl = `${getArticlesUrlFirstPart}${getArticlesUrlSortParam}${getArticlesUrlApiParam}`;

    fetch(getArticlesUrl)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            handleFetchArticlesSuccess(dispatch, response);
        })
        .catch((err) => {
            handleFetchArticlesError(dispatch, err);
        });
}

const handleFetchArticlesSuccess = (dispatch, response) => {
    const articles = response.articles;
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() + 20);
    
    localStorage.setItem('articles', JSON.stringify(articles));
    localStorage.setItem('articlesExpiresDate', currentDate);

    dispatch({
        type: 'GET_ARTICLES_SUCCESS',
        payload: articles
    });
}

const handleFetchArticlesError = (dispatch, err) => {
    dispatch({
        type: 'GET_ARTICLES_ERROR',
        payload: err.message
    });
}