'use client'
import Style from '@/app/page.module.scss'
import { useEffect, useState } from 'react'
export default function Admin() {
    // const [auth, setAuth] = useState(localStorage.getItem('0'))
    const [data, setData] = useState()
    const [totalDifference,setTotalDifference] = useState(0)
    const [filter, setFilter] = useState()
    const [isVisible, setIsVisible] = useState(false)
    const cutDate = new Date()
    const [dateFilter, setDateFilter] = useState(cutDate.toString().slice(4, 7))
    const [moisActuelle, setMoisActuelle] = useState(cutDate.getMonth())
    useEffect(()=>{
        // setDateFilter(cutDate.slice(0, 15))
        console.log(dateFilter);
        try {
            fetch('http://127.0.0.1:5000//api/analyse', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({dateFilter}),
            }).then(response => response.json())
            .then(data => setData(data))
            
        } catch(error){
            console.error('errorrrrrrrrrrrrr', error);  
        }
    }, [dateFilter])

    // useEffect(() => {
    //     fetch('http://127.0.0.1:5000/api/analyse')
    //       .then(response => response.json())
    //       .then(data => setData(data));  
    // }, [dateFilter]);

    let somme=0
    setTimeout(() => {
        Array.from(document.querySelectorAll('td')).map((e)=>{
            // e.style.display='flex'
            // e.style.justifyContent='center'
            somme+=parseInt(e.innerText)   
        }) 
        setTotalDifference(somme)
    }, [100])
    const divProposition = () =>{
        setTimeout(() => {
            document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByClassName(Style.span)[0].offsetLeft+'px',
            document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByClassName(Style.span)[0].offsetTop+30+'px'   
        }, [10]);
    }
    const mois = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juiellet', 'Aout', 'September', 'Octobre', 'Novembre', 'Decembre']
    
    isVisible ? divProposition() : ''
    return(
        <>
        <div className={Style.search} >
            <div onClick={()=>setIsVisible(!isVisible)} name='span' className={Style.span}>
                <span >filtrer par: { filter ? filter : 'Actuelle'}</span>
                <img src="/arrow.svg" alt="" />
            </div>
            {
                isVisible ? (
                    <div className={Style.proposition}>
                        {mois.map((e, i)=>(
                            <div key={i} onClick={(e)=>{setMoisActuelle(i),setDateFilter(e.target.innerText.slice(0, 3)),setFilter(e.target.innerText), setIsVisible(false)}}>{e}</div>    
                        ))}
                    </div>
                ):('')
            }
               
        
        </div>
        <div className={Style.contener}>
            <div className={Style.analyse}>
                {/* <div style={{width: '100%'}} className={Style.head}>
                    <p>Date</p>
                    <p>Libele</p>
                    <p>Quantite</p>
                    <p>Prix d'achat</p>
                    <p>Prix de vente</p>
                    <p>difference</p>
                </div> */}
                <h1>Difference du mois de {mois[moisActuelle]}</h1>
                <table>
                    <thead>
                        <tr >
                            <th>Date</th>
                            <th>Libele</th>
                            <th>Code</th>
                            <th>Quantite</th>
                            <th>Prix de vente</th>
                            <th>Prix d&apos;achat</th>
                            <th>difference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((e, i)=>(
                                <tr style={{backgroundColor: i%2==0 ? 'var(--bgc-input)' :''}} key={i}>
                                    <th>{e[0]}</th>
                                    <th>{e[1]}</th>
                                    <th>{e[2]}</th>
                                    <th>{e[3]}</th>
                                    <th>{e[4]}</th>
                                    <th>{e[5]}</th>
                                    <td>{e[3]*(e[4]-e[5])}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={6}>total</th>
                            <th style={{borderLeft: 'dashed black', backgroundColor: totalDifference>0 ? '#04fb04' : 'red'}} >{totalDifference}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </>
    )
}