const sourceFiltersReducer = (
    state = {
        allSources: [],
        filteredSources: [],
        displayedSources: [],
        sourcesPerPage: 6,
        pagesToDisplay: 1,
        activePage: 1,
        appliedSourceFilters: {
            category: [],
            language: [],
            country: []
        },
        isLoading: true,
        error: '',
        sourcesFilters: {
            category: ['business', 'entertainment', 'gaming', 'general', 'music', 'politics', 'science-and-nature', 'sport', 'technology'],
            language: ['en', 'de', 'fr'],
            country: ['au', 'de', 'gb', 'in', 'it', 'us']
        }
    },
    action
) => {
    switch (action.type) {
        case 'GET_ALL_SOURCES_SUCCESS': {
            const displayedSources = displayPage(action.payload, 1, state.sourcesPerPage);

            return {
                ...state,
                error: '',
                isLoading: false,
                displayedSources: displayedSources,
                pagesToDisplay: Math.ceil(action.payload.length / state.sourcesPerPage),
                allSources: action.payload,
                activePage: 1,
                filteredSources: action.payload
            }
        }
        case 'GET_ALL_SOURCES_ERROR': {
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
        case 'CHANGE_PAGE': {
            const displayedSources = displayPage(state.filteredSources, action.payload, state.sourcesPerPage);
            return {
                ...state,
                displayedSources,
                activePage: action.payload
            }
        }
        case 'RESET_SOURCE_FILTER': {
            const filterTypeToChange = action.payload.filterType;

            const newAppliedSourceFilters = {
                ...state.appliedSourceFilters,
                [filterTypeToChange]: []
            }

            const newFilteredSources = filterSources(state.allSources, newAppliedSourceFilters);
            const displayedSources = displayPage(newFilteredSources, 1, state.sourcesPerPage);

            return {
                ...state,
                filteredSources: newFilteredSources,
                displayedSources: displayedSources,
                pagesToDisplay: Math.ceil(newFilteredSources.length / state.sourcesPerPage),
                activePage: 1,
                appliedSourceFilters: newAppliedSourceFilters
            }
        }
        case 'ADD_SOURCE_FILTER': {
            const filterTypeToChange = action.payload.filterType;
            const filterToAdd = action.payload.filterValue;
            
            if (state.appliedSourceFilters[filterTypeToChange].includes(filterToAdd)) {
                return state;
            };

            const newAppliedSourceFilters = {
                ...state.appliedSourceFilters,
                [filterTypeToChange]: state.appliedSourceFilters[filterTypeToChange].concat(action.payload.filterValue)
            }

            const newFilteredSources = filterSources(state.allSources, newAppliedSourceFilters);
            const displayedSources = displayPage(newFilteredSources, 1, state.sourcesPerPage);
            
            return {
                ...state,
                filteredSources: newFilteredSources,
                displayedSources: displayedSources,
                pagesToDisplay: Math.ceil(newFilteredSources.length / state.sourcesPerPage),
                activePage: 1,
                appliedSourceFilters: newAppliedSourceFilters
            };
        }
        case 'DELETE_SOURCE_FILTER': {
            const filterToRemove = action.payload.filterValue;
            const filterTypeToChange = action.payload.filterType;
            const filterToRemoveIndex =  state.appliedSourceFilters[filterTypeToChange].indexOf(filterToRemove);

            state.appliedSourceFilters[filterTypeToChange].splice(filterToRemoveIndex, 1);

            const newAppliedSourceFilters = {
                ...state.appliedSourceFilters,
                [filterTypeToChange]: state.appliedSourceFilters[filterTypeToChange]
            }

            const newFilteredSources = filterSources(state.allSources, newAppliedSourceFilters);
            const displayedSources = displayPage(newFilteredSources, 1, state.sourcesPerPage);

            return {
                ...state,
                filteredSources: newFilteredSources,
                displayedSources: displayedSources,
                pagesToDisplay: Math.ceil(newFilteredSources.length / state.sourcesPerPage),
                activePage: 1,
                appliedSourceFilters: newAppliedSourceFilters
            };
        }
        default:
            return state;
    }
}

const filterSources = (allSources, appliedSourceFilters) => {
    const {category, language, country} = appliedSourceFilters;

    const newFilteredSources = allSources.filter((source) => {
        let checkPassed = true;
        if (category.length) {
            checkPassed = category.includes(source.category);
            if (!checkPassed) return checkPassed; 
        }
        if (language.length) {
            checkPassed = language.includes(source.language);
            if (!checkPassed) return checkPassed;
        }  
        if (country.length) {
            checkPassed = country.includes(source.country);
            if (!checkPassed) return checkPassed;
        }                
        return checkPassed;
    });

    return newFilteredSources;
}

function displayPage(filteredSources, page, sourcesPerPage) {
    return filteredSources.slice((page - 1) * sourcesPerPage , page * sourcesPerPage);
}

export default sourceFiltersReducer;