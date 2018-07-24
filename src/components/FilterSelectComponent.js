import React from 'react';

const FilterSelectComponent = ({filterType, filterValues, onChange}) => {
    return (
        <div className="filter">
            <p className="filter__name">{filterType}</p>
            <select className="filter__select" onChange={(e) => {onChange(e.target.value, filterType)}} >
                <option value="none" defaultValue>None</option>      
                {filterValues.map((value)=> {
                    return <option key={value} value={value}>{value}</option>
                })}
            </select>
        </div>
    )
}

export default FilterSelectComponent;