const articleFiltersReducer = (
    state = {
        filteredArticles: [],
        error: '',
        isLoading: true,
        selectedSource: '',
        articleFilters: ['relevancy', 'publishedAt', 'popularity']
    },
    action
) => {
    switch (action.type) {
        case 'GET_ARTICLES_SUCCESS': {
            return {
                ...state,
                error: '',
                isLoading: false,
                filteredArticles: action.payload
            }
        }
        case 'GET_ARTICLES_ERROR': {
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        }
        case 'CHANGE_IS_LOADING': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'CHANGE_SELECTED_SOURCE': {
            return {
                ...state,
                selectedSource: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default articleFiltersReducer;