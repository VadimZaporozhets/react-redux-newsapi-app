import React from 'react';
import ArticleTileComponent from '../components/ArticleTileComponent';

const ArticlesWrapper = ({filteredArticles}) => {
    return (
        <div>
            <p className="filters-side-container__title">Filtered articles:</p>
            <div className="sources-container">
                {filteredArticles && filteredArticles.map((article, index) => {
                    return <ArticleTileComponent {...article} key={index} />;
                })}
            </div>
        </div>
    );
}

export default ArticlesWrapper;