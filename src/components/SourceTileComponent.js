import React from 'react';
import {Link} from 'react-router-dom';

const SourceTileComponent = ({name, description, url, id, onLinkClick}) => {
    return (
        <div className="source-tile">
            <h1 className="source-tile__title">{name}</h1>
            <div className="source-tile__hover">
                <p className="source-tile__description">{description}</p>
                <a href={url} className="source-tile__link" target="_blank">{url}</a>
                <Link className="source-tile__btn" to={`/articles/${id}`} onClick={() => {onLinkClick(id)}}>View source articles</Link>
            </div>
        </div>
    )
}

export default SourceTileComponent;