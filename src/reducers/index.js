import {combineReducers} from 'redux';
import sourceFiltersReducer from './source-filters-reducer';
import articleFiltersReducer from './article-filters-reducer';

export default combineReducers({
    sources: sourceFiltersReducer,
    articles: articleFiltersReducer
});
