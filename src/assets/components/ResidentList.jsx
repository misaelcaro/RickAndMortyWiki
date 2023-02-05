import React from 'react'
import ResidentCard from './ResidentCard'

const ResidentList = ({location,pagination}) => {
    return (
        <section className="location-residents">
            {
                pagination()?.map(urlResident => (
                    <ResidentCard key={urlResident} urlResident={urlResident} />
                ))
            }
        </section>
    )
}

export default ResidentList