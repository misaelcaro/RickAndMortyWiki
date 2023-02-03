import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const ResidentCard = ({ urlResident }) => {
    const [resident, setResident] = useState()



    useEffect(() => {
        axios.get(urlResident)
            .then(res => {
                setTimeout(()=>{
                    setResident(res.data)
                }, 1500)
            })

            .catch(err => console.log(err))


    }, [])




    return (
        <article className="residen_card">

            {
                resident ? (
                    <>
                        <header className= "resident-card-header">
                            <img className="imgResident" src={resident?.image} alt="" />
                            <div className="resident-card-status">
                                <div className={`circle ${resident?.status}`}></div>
                                <span> {resident?.status}</span>
                            </div>
                        </header>
                        <section className="resident-card_body">
                            <h2>{resident?.name}</h2>
                            <hr />
                            <ul className="card-body_ul">
                                <li><span> <strong>Specie:</strong> <br /> {resident?.species}</span></li>
                                <li><span><strong>Origen:</strong> <br /> {resident?.origin.name}</span></li>
                                <li><span><strong>Apparance episodes:</strong> <br /> {resident?.episode.length}</span></li>
                            </ul>
                        </section>
                    </>
                ) : <img className="portal" src= "https://cdna.artstation.com/p/assets/images/images/031/538/850/original/petro-kosariekov-portal-gun-rick-and-morty2-2.gif?1603902186" alt="loading..." />
                

            }

        </article>
    )
}

export default ResidentCard