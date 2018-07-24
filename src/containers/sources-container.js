import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllSources, addSourceFilter, deleteSourceFilter, resetSourceFilter, changePage} from '../actions/source-filter-actions';
import {changeSelectedSource} from '../actions/article-filter-actions';
import FilterSelectComponent from '../components/FilterSelectComponent';
import FilterLabelsComponent from '../components/FilterLabelsComponent';
import ErrorComponent from '../components/ErrorComponent';
import WithLoading from '../components/WithLoading';
import SourcesContainerWrapper from '../components/SourcesContainer';

const ErrorWithLoading = WithLoading(ErrorComponent);
const SourcesContainerWithLoading = WithLoading(SourcesContainerWrapper);

class SourcesContainer extends Component {
    constructor(props) {
        super(props);
        
        this.sourcesPerPage = 6;
        this.displayedSources = [];

        this.props.getAllSources();
    }

    onFilterChange = (filterValue, filterType) => {
        const resetFilterValue = 'none';
        if (filterValue === resetFilterValue) {
            this.props.resetSourceFilter(filterType);
        } else {
            this.props.addSourceFilter(filterType, filterValue);
        }
    }

    renderPagination = () => {
        const {changePage, pagesToDisplay, activePage} = this.props;
        const pagesArray = [];

        for (let i = 0; i < pagesToDisplay; i++) {
            pagesArray[i] = i + 1;
        }
        return pagesArray.map((e) => {
            return <button key={e} className={`page-btn ${activePage === e ? 'active' : ''}`} onClick={() => {changePage(e)}}>{e}</button>
        });
    }

    renderFilters = () => {
        const {sourcesFilters, appliedSourceFilters, deleteSourceFilter} = this.props;

        if (sourcesFilters) {
            const filtersArray = [];

            for (let key in sourcesFilters) {
                filtersArray.push((
                    <div key={key}>
                        <FilterSelectComponent onChange={this.onFilterChange} filterType={key} filterValues={sourcesFilters[key]}/>
                        <FilterLabelsComponent onClick={deleteSourceFilter} filterType={key} filterValues={appliedSourceFilters[key]}/>
                    </div>    
                ));
            }

            return filtersArray;
        }
    }

    render() {
        const {error, isLoading, displayedSources, changeSelectedSource} = this.props;

        return (
            <div className="source-page-container">
                <div className="filters-side-container">
                    <p className="filters-side-container__title">Chose filters</p>
                    {this.renderFilters()}
                </div>
                <div className="sources-side-container">
                    {error ? 
                        <ErrorWithLoading isLoading={isLoading} errMessage={error} />
                        :
                        <div>
                            <SourcesContainerWithLoading 
                                isLoading={isLoading} 
                                filteredSources={displayedSources} 
                                changeSelectedSource={changeSelectedSource}
                                />
                            <div className="pagination">
                                {this.renderPagination()}
                            </div>
                        </div> 
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.sources.isLoading,
        error: state.sources.error,
        filteredSources: state.sources.filteredSources,
        sourcesFilters: state.sources.sourcesFilters,
        appliedSourceFilters: state.sources.appliedSourceFilters,
        displayedSources: state.sources.displayedSources,
        pagesToDisplay: state.sources.pagesToDisplay,
        activePage: state.sources.activePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllSources: () => {
            dispatch(getAllSources());
        },
        addSourceFilter: (filterType, filterValue) => {
            dispatch(addSourceFilter(filterType, filterValue))
        },
        deleteSourceFilter: (filterType, filterValue) => {
            dispatch(deleteSourceFilter(filterType, filterValue))
        },
        resetSourceFilter: (filterType) => {
            dispatch(resetSourceFilter(filterType));
        },
        changeSelectedSource: (source) => {
            dispatch(changeSelectedSource(source))
        },
        changePage: (page) => {
            dispatch(changePage(page))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourcesContainer);