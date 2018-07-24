import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getArticles, changeSelectedSource} from '../actions/article-filter-actions';
import FilterSelectComponent from '../components/FilterSelectComponent';
import ErrorComponent from '../components/ErrorComponent';
import SourceTileComponent from '../components/SourceTileComponent';
import WithLoading from '../components/WithLoading';
import ArticlesWrapper from '../components/ArticlesWrapper';

const ErrorWithLoading = WithLoading(ErrorComponent); 
const ArticlesWrapperWithLoading = WithLoading(ArticlesWrapper); 

class ArticlesContainer extends Component {
    constructor(props) {
        super(props);

        this.sourceId = this.props.match.params.sourceId;
        this.props.getArticles(this.sourceId, this.props.selectedSource);
    }

    onLinkClick = (source) => {
        const {changeSelectedSource, getArticles} = this.props;
        getArticles(source, this.props.selectedSource);
        this.sourceId = source;
        changeSelectedSource(source);
    }

    onFilterChange = (filterValue) => {
        this.props.getArticles(this.sourceId, this.props.selectedSource, filterValue);
    }

    renderSources = () => {
        const {filteredSources} = this.props;
        const filteredSourcesToRender = filteredSources.length ? filteredSources : JSON.parse(localStorage.getItem('allSources'));
        
        return filteredSourcesToRender && filteredSourcesToRender.map((source) => {
            return (
                <SourceTileComponent onLinkClick={this.onLinkClick} key={source.id} {...source} />
            );
        });
    }

    render() {
        const {error, isLoading, filteredArticles, articleFilters} = this.props;

        return (
            <div className="aritcles-page-container">
                <div className="prev-sources-side-container">
                    <p className="filters-side-container__title">Filtered Sources</p>
                    <div className="prev-sources">
                        {this.renderSources()}
                    </div>
                </div>
                <div className="articles-side-container">
                    {error ? 
                        <ErrorWithLoading isLoading={isLoading} errMessage={error}/>
                        :
                        <div>
                            <div className="articles-filter-header">
                                <FilterSelectComponent filterType={'Filter Articles'} onChange={this.onFilterChange} filterValues={articleFilters}/>   
                            </div> 
                            <ArticlesWrapperWithLoading isLoading={isLoading} filteredArticles={filteredArticles}/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.articles.isLoading,
        filteredSources: state.sources.filteredSources,
        filteredArticles: state.articles.filteredArticles,
        error: state.articles.error,
        selectedSource: state.articles.selectedSource,
        articleFilters: state.articles.articleFilters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticles: (source, selectedSource, filterValue) => {
            dispatch(getArticles(source, selectedSource, filterValue));
        },
        changeSelectedSource: (source) => {
            dispatch(changeSelectedSource(source));
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);