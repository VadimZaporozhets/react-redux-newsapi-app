import React from 'react';

const FilterLabelsComponent = ({filterValues,filterType, onClick}) => {
    return (
        <div className="filter-labels">
            {filterValues && filterValues.map((value) => {
                return (
                    <span key={value} className="filter-labels__label">
                        {value}
                        <button onClick={() => {onClick(filterType, value)}} className="filter-labels__remove">x</button>
                    </span>
                );
            })}
        </div>
    )
}

export default FilterLabelsComponent;