import React from 'react'
import ResidentCard from './ResidentCard'

const ResidentList = ({location}) => {
    return (
        <section className="location-residents">
            {
                location?.residents.map(urlResident => (
                    <ResidentCard key={urlResident} urlResident={urlResident} />
                ))
            }
        </section>
    )
}

export default ResidentList