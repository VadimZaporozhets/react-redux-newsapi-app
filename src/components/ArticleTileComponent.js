import React from 'react';

const ArticleTileComponent = ({author, title, urlToImage, publishedAt}) => {
    return (
        <div className="article">
            {urlToImage && <img className="article__image" src={urlToImage} alt=""/>}
            <p className="article__title">{title}</p>
            <p className="article__author">{author}</p>
            <p className="article__date">{publishedAt}</p>
        </div>
    )
}

export default ArticleTileComponent;