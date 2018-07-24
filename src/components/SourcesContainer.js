import React from 'react';
import SourceTileComponent from '../components/SourceTileComponent';

const SourcesContainer = ({filteredSources, changeSelectedSource}) => {
    
    return (
        <div>
            <p className="filters-side-container__title">Filtered sources:</p>
            <div className="sources-container">
                {filteredSources && filteredSources.map((source) => {
                    return <SourceTileComponent {...source} onLinkClick={changeSelectedSource} key={source.id} />;
                })}
            </div>
        </div>
    );
}

export default SourcesContainer;