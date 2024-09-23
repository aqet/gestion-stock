'use client'
import Element from "@/components/element";
import React, { useEffect, useState } from "react";
import Style from '@/app/page.module.scss'
export default function detail({params}){

    const uuid = params.id.replace('%20', ' ')
    const [data, setData] = useState([])

    useEffect( ()=>{
        try {
            fetch('http://127.0.0.1:5000/api/detail', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(uuid),
            }).then(response => response.json())
            .then(data => setData(data))
        } catch(error){
            console.error('errorrrrrrrrrrrrr', error);  
        }
    }, [])
        
    return(
        <div className={Style.contener}>
            <div className={Style.Detail}>
                <h1>Detail des {uuid.toUpperCase()}</h1>
                <div className={Style.head}>
                    <p>Code</p>
                    <p>libelé</p>
                    <p>Prix unitaire</p>
                    <p>Nom fournisseur</p>
                    <p>date</p>
                    <p>Quantité</p>
                    <p>Prix total</p>
                </div>
                {
                    data?.map((e, index)=>(
                        <Element key={index} zero={e[3]} one={e[1]} two={e[5]} three={e[6]} four={e[4]} five={e[2]} six={e[2]*e[5]}/>
                    ))

                }
            </div>
            
        </div>
    )
}