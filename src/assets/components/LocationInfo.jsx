import React from 'react'

export const LocationInfo = ({ location }) => {
   
    return (
        <article className="locationInfo">
            
                <h2 className="locationInfoh2">{location?.name}</h2>
                <ul>
                    <li>
                        <span><strong>Type:</strong> {location?.type} </span>
                    </li>
                    <li>
                        <span> <strong>Dimension: </strong> {location?.dimension} </span>
                    </li>
                    <li>
                        <span><strong>Population:</strong> {location?.residents.length} </span>
                    </li>
                </ul>
            
        </article>
    )
}
