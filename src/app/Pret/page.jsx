'use client'
import Style from '../page.module.scss'
import Element from '@/components/element'
import { useEffect, useState } from 'react'

export default function Pret(){

    const [data, setData] = useState()
    const [data1, setData1] = useState([])
    const [currentLoan, setCurrentLoan] = useState()
    const [isVisible, setIsVisible] = useState()
    const [id, setId] = useState()
    
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/pret/recuperer')
          .then(response => response.json())
          .then(data => setData(data));  
    }, []);

    const jj = async (nom) => {
        try {
            await fetch('http://127.0.0.1:5000/api/pret/recuperer/detail', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(nom),
            }).then(response => response.json())
            .then(data => setData1(data))
            
        } catch(error){
            console.error('errorrrrrrrrrrrrr', error);  
        }
    }
    let value = []
    setTimeout(()=>{
        const a = document.querySelectorAll('.page_product__XJpui')
        Array.from(a).map((r, index)=>{
            if (r.childElementCount == 2) {
                // Do something with the element
                value += [r.children[0].innerText],
                (document.querySelectorAll('.page_product__XJpui')).length!= index+1 ? value+=' ' :''
            }
            
        })
    }, [100])
    const myFunc= () =>{
        const objet = value.length>0 ? value.split(" ") :'';
        window.location.href = `/Pret/asldh?data=${[objet]}`
    }
    let ii
    const topBox = (e) =>{
        setTimeout(() => {
            ii=document.getElementsByClassName(Style.box)[0].style.top = e-document.getElementsByClassName(Style.box)[0].offsetHeight-10+ 'px'
        }, 10); 
    }
    
    const handleSubmit = async (nomE,nom) => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/pret/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({nomE,nom}),
          });
          
          if (response.ok){
            console.log('Données envoyées avec succès');
            
          } else {
            const errr = await response.json()
            console.error('Erreurrrr lors de l\'envoi des données', errr);
          }
        } catch (error) {
          console.error('errorrrrrrrrrrrrrr', error);
        }
        window.location.reload()
    };
    
    const update = async (avance,nomE,nom) => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/pret/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({avance,nomE,nom}),
          });
          
          if (response.ok){
            console.log('Données envoyées avec succès');
            
          } else {
            const errr = await response.json()
            console.error('Erreurrrr lors de l\'envoi des données', errr);
          }
        } catch (error) {
          console.error('errorrrrrrrrrrrrr', error);
        }
        window.location.reload()
    };
    let avance
    return (
        <>
            <div className={Style.addLoan}>
               <button onClick={()=>{myFunc()}} >ajouter un pret</button>
               <button>modifier un pret</button>
            </div>
            <div  className={Style.contener}>
                <div className={Style.Loan}>
                    <div className={Style.head}>
                        <p>Nom de l&apos;emprunteur</p>
                        <p>Montant de la dette total</p>
                    </div>
                    <div className={Style.list}>
                        {
                            data?.map((e, index)=>(
                                <div key={index}>   
                                    {/*tu dois stopper la propagation de londe*/}
                                    <Element key={index} onClick={()=>{jj(e[0]), setCurrentLoan(currentLoan==e[0] ? undefined : e[0])}} zero={e[0]} one={e[1]} />
                                    {
                                        e[0]==currentLoan ?
                                            (<div className={Style.element}> 
                                                <div className={Style.head}>
                                                    <p>Code</p>
                                                    <p>Libelé</p>
                                                    <p>Date</p>
                                                    <p>Prix unitaire</p>
                                                    <p>Quantité</p>
                                                    <p>prix total</p>
                                                    <p>Action</p>
                                                </div> 
                                                {data1.map((j, i)=>(
                                                    <>
                                                        {id==j[0] ? 
                                                            <div key={i} onClick={()=>console.log(i)} className={Style.box} id={i}>
                                                                {
                                                                    isVisible=='paye' ?(
                                                                        <>
                                                                            {e[0]} a t&apos;il/elle vraiment totalement payer sont pret?
                                                                            <div className={Style.valider}>
                                                                                <button onClick={()=>handleSubmit(e[0], j[1])}>Oui</button>
                                                                                <button onClick={()=>setId(undefined)}>Non</button>
                                                                            </div>
                                                                        </>
                                                                    ):(
                                                                        <>
                                                                            combien {e[0]} a t&apos;il/elle avance?
                                                                            <input onChange={(e)=>{avance=e.target.value}} type="number" name="" id="" />
                                                                            <div className={Style.valider}>
                                                                                <button onClick={()=>setId(undefined)}>Cancel</button>
                                                                                <button onClick={()=>update(avance, e[0], j[1])}>Enregistrer</button>
                                                                            </div>
                                                                        </>                                                                  
                                                                    )    
                                                                }
                                                                    <div className={Style.bottomArrow}></div>
                                                            </div> 
                                                        : 
                                                            ''
                                                        }
                                                        {console.log(i)}
                                                        <Element key={i} zero={j[0]} one={j[1]} two={j[4]} three={j[3]} four={j[2]} five={<><div>T {j[5]}</div>{j[6]?(<><div style={{borderBottom: '1px solid gray'}}>A {j[6]}</div><div>R {j[5]-j[6]}</div></>):('')}</>} six={<><button onClick={(e)=>{!isVisible ? topBox(e.target.offsetTop) : '',setIsVisible(!isVisible ? 'paye' : false), setId(id==j[0] ? undefined : j[0])}} className={Style.paye}>Paye <img src="/paye.svg" alt="" /></button><button onClick={(e)=>{!isVisible ? topBox(e.target.offsetTop) : '',setIsVisible(!isVisible ? 'Avance' : false), setId(id==j[0] ? undefined : j[0])}} id={Style.avance}>avancer <img src="avance.svg" alt="" /></button></>}/>
                                                    </>
                                                ))}
                                            </div>) 
                                        :
                                            ('')
                                    }
                                </div>

                            ))
                        }
                    </div> 
                </div>
            </div>
        </>
    )
}