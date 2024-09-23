'use client'
import Style from '../page.module.scss'
import Element from '@/components/element'
import React,{ useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Entrer(){

    const [code, setCode] = useState()
    const [nom, setNom] = useState()
    const [prixU, setPrixU] = useState(0)
    const [qte, setQte] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const [data, setData] = useState([])
    const [valueNom, setValueNom] = useState([])
    const [filterBy, setFilterBy] = useState()
    const [filter, setFilter] =useState()
    const [codeData, setCodeData] = useState()

    useEffect(()=>{
        setFilter(filterBy ? filterBy : filter)
    },[filterBy])
    let saveProduct 

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/data')
          .then(response => response.json())
          .then(data => setData(data));  
    }, []);

    useEffect(()=>{
        try {
            fetch('http://127.0.0.1:5000/api/detail', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(nom??''),
            }).then(response => response.json())
            .then(data => setCodeData(data))
        } catch(error){
            console.error('errorrrrrrrrrrrrr', error);  
        }
    },[nom])

    const date = new Date()
    let cutDate = date.toString().slice(0, 24)
    const [dateFilter, setDateFilter] = useState(cutDate.slice(0, 15))
    useEffect(()=>{
        // setDateFilter(cutDate.slice(0, 15))
        try {
            fetch('http://127.0.0.1:5000//api/vente/day', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({dateFilter}),
            }).then(response => response.json())
            .then(data => setProduct(data))
            
        } catch(error){
            console.error('errorrrrrrrrrrrrr', error);  
        }
    }, [dateFilter])
    

    const [product, setProduct] = useState([])
    let response
    const handleSubmit = async () => {
        try {
          response = await fetch('http://127.0.0.1:5000/api/vente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveProduct),
          });
          
          if (response.ok){
            console.log('Données envoyées avec succès');
          } else {
            const errr = await response.json()
            console.error('Erreurrrr lors de l\'envoi des données', errr);
            alert(errr['message'])
          }
        } catch (error) {
          console.error('errorrrrrrrrrrrrr', error);
        }
        saveProduct = {}
    };

    const divProposition=()=>{
        setTimeout(()=>{
            isVisible=='nom' ?(
                document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByName('nom')[0].offsetLeft+'px',
                document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByName('nom')[0].offsetTop+30+'px'
            ):isVisible=='span' ? (
                document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByClassName(Style.span)[0].offsetLeft+'px',
                document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByClassName(Style.span)[0].offsetTop+30+'px'   
            ):isVisible=='code' ? (
                document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByName('code')[0].offsetLeft+'px',
                document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByName('code')[0].offsetTop+30+'px'   
            ):('')
            filterBy ?
                filterBy=='jour' ? (
                    document.querySelector('.react-calendar').style.position='absolute',
                    document.querySelector('.react-calendar').style.left=document.getElementsByClassName(Style.proposition)[0].offsetLeft-350+'px',      
                    document.querySelector('.react-calendar').style.top=document.getElementsByClassName(Style.proposition)[0].offsetTop+'px'
                ):filterBy=='periode' ? (
                    // document.querySelector('.react-calendar').style.position='absolute',
                    // document.querySelector('.react-calendar').style.left=document.getElementsByClassName(Style.proposition)[0].offsetLeft-350+'px',      
                    // document.querySelector('.react-calendar').style.top=document.getElementsByClassName(Style.proposition)[0].offsetTop+'px'
                    document.getElementsByClassName(Style.proposition)[1].style.left=document.getElementsByClassName(Style.span)[0].offsetLeft-150+'px',
                    document.getElementsByClassName(Style.proposition)[1].style.top=document.getElementsByClassName(Style.span)[0].offsetTop+30+70+'px'   

                    ):filterBy=='mois' ? (
                    document.getElementsByClassName(Style.proposition)[1].style.left=document.getElementsByClassName(Style.span)[0].offsetLeft-150+'px',
                    document.getElementsByClassName(Style.proposition)[1].style.top=document.getElementsByClassName(Style.span)[0].offsetTop+30+'px'   
                ):filterBy=='annee' ? (
                    document.getElementsByClassName(Style.proposition)[1].style.left=document.getElementsByClassName(Style.span)[0].offsetLeft-150+'px',
                    document.getElementsByClassName(Style.proposition)[1].style.top=document.getElementsByClassName(Style.span)[0].offsetTop+30+'px'       
                ):('')
            : ''
        }, [10])
        setTimeout(() => {
            
        }, [10]);
    }
    setTimeout(() => {
    }, 10);

    isVisible ? divProposition() : ''

    const [value, onChange] = useState(new Date());
    let dat=[]
    for (let index = 20; index <= parseInt(new Date().toString().slice(13, 15)); index++) {
        dat=[...dat, index]
    }

    return (
        <>
        <div className={Style.search} >
            <div onClick={()=>setIsVisible('span')} name='span' className={Style.span}>
                <span >filtrer par: { filter ? filter : 'Auccun'}</span>
                <img src="/arrow.svg" alt="" />
            </div>
            {
                isVisible=='span' ?
                <>
                    <div className={Style.proposition}>
                        <div onClick={()=>{setFilter(undefined), setFilterBy(false), setDateFilter(cutDate.slice(0, 15)), setIsVisible(false)}}>Accun</div>    
                        <div onClick={()=>{setFilterBy('jour') }}>Jour</div>    
                        <div onClick={()=>{setFilterBy('periode') }}>Periode</div>    
                        <div onClick={()=>{setFilterBy('mois') }}>Mois</div>    
                        <div onClick={()=>{setFilterBy('annee') }}>Annee</div>    
                    </div>
                    {
                        filterBy=='jour' ? (
                            <Calendar onClickDay={()=>{setFilterBy(false),setIsVisible(false)}} style={{backgroundColor: 'var(--popup-bgc)'}}
                                onChange={(e)=>{onChange(e),setDateFilter(e.toString().slice(0,15))}}
                                value={value}
                            />
                        ):filterBy=='periode' ? (
                            <div className={Style.proposition}>
                                En production!!
                            </div>
                        ): filterBy=='mois' ? (
                            <div className={Style.proposition}>
                                {['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juiellet', 'Aout', 'September', 'Octobre', 'Novembre', 'Decembre'].map((e, i)=>(
                                    <div key={i} onClick={(e)=>{setDateFilter(e.target.innerText.slice(0, 3)), setFilterBy(false), setIsVisible(false)}}>{e}</div>    
                                ))}
                            </div>
                        ): filterBy == 'annee' ? (
                            <div className={Style.proposition}>
                                {
                                    dat.map((e,i)=>(
                                        <div key={i} onClick={(e)=>{setDateFilter(e.target.innerText), setFilterBy(false), setIsVisible(false)}}>20{e}</div>
                                    ))
                                }
                            </div>
                        ):('')
                    }
                </>
                :''}
               
        
        </div>
        <div onClick={()=>{isVisible!='code' ? setIsVisible(false) : '', setFilterBy(false)}} className={Style.contener}>
            <div className={Style.enter}>
                <div className={Style.add}>
                    <div className={Style.input}>
                        <div className={Style.divInput}>
                            <label htmlFor="">Nom</label>
                            <input onChange={(e)=>{e.target.value ? '' : setNom(undefined), setValueNom(e.target.value), setFilter(undefined), setDateFilter(cutDate.slice(0, 15)), setIsVisible(e.target.value ? 'nom' : false)}} type="" name="nom" id="" />
                            {
                            isVisible=='nom' ?
                                <div className={Style.proposition}>
                                    {
                                        (data.filter(obje=>obje[0].toLowerCase().includes(valueNom))).length>0 ? 
                                            (data.filter(obje=>obje[0].toLowerCase().includes(valueNom))).map((e,i)=>(
                                                <div onClick={(e)=>{document.getElementsByName('nom')[0].value=e.target.innerText, setNom(e.target.innerText)}} key={i}>{e[0]!=null?e[0]:''}</div>
                                            ))  
                                        :
                                            <>Aucun produit<br/>Veuillez modifier le nom. En ecrivant meme le nom cela ne sera pas pris en compte</>
                                    }
                                </div>
                            : ''    
                            }
                        </div>
                        <div onBlur={()=>setTimeout(()=>setIsVisible(false), [100])} className={Style.divInput}>
                            <label htmlFor="">Code</label>
                            <input onFocus={()=>setIsVisible('code')} onChange={(e)=>{setFilter(undefined), setDateFilter(cutDate.slice(0, 15)), setIsVisible('code')}} type="text" name="code" id="" />
                            {
                                isVisible=='code' ? (
                                    <div className={Style.proposition}>
                                        {
                                            codeData.length>0 ?
                                                codeData.map((e,i)=>(
                                                    <div onClick={(e)=>{document.getElementsByName('code')[0].value=e.target.innerText, setCode(e.target.innerText)}} key={i}>{e[3]}</div>
                                                ))
                                            : 'Veuillez choisir un nom. En ecrivant vous meme le code cela ne sera pas pris en compte'
                                        }
                                    </div>
                                ):(
                                    ''
                                )
                            }
                        </div>
                        <div className={Style.divInput}>
                            <label htmlFor="">Prix unitaire</label>
                            <input onChange={(e)=>{setPrixU(e.target.value), setFilter(undefined), setDateFilter(cutDate.slice(0, 15))}} min={1} type="number" name="prixU" id="" placeholder={0}  />
                        </div>
                        <div className={Style.divInput}>
                            <label htmlFor="">Quantiter</label>
                            <input onChange={(e)=>{setQte(e.target.value), setFilter(undefined), setDateFilter(cutDate.slice(0, 15))}} min={1} type="number" name="qte" id="" placeholder={0} />
                        </div>
                    </div>
                    <div className={Style.btnSave}>
                        <button onClick={()=>{
                            nom ? 
                                (qte>0 && prixU>0) ?
                                    code ?  (
                                                saveProduct = [{code, nom, prixU, qte, cutDate}],
                                                handleSubmit(),
                                                setTimeout(() => {
                                                    response.ok ? (
                                                        setProduct([[ code, nom, prixU, cutDate, qte ], ...product]),
                                                        Array.from(document.querySelectorAll('input')).map((e)=>{e.value=''}) ,
                                                        setCode(),
                                                        setNom(),
                                                        setPrixU(0),
                                                        setQte(0)
                                                    ):(
                                                        ''
                                                    )
                                                }, [100])                                         
                                            ):(
                                                console.log(code+' '+prixU+' '+qte),
                                                alert('veuillez remplire tous les champ')
                                        )
                                : alert('verifiez la quantiter et le prix')                                
                            : alert('le produit dans le champ Nom n\'existe pas')
                            }}>
                            Ajouter
                        </button>
                    </div>
                </div>
                <div className={Style.head}>
                    <p>Code</p>
                    <p>libelé</p>
                    <p>Prix unitaire</p>
                    <p>date</p>
                    <p>Quantité</p>
                    <p>Prix total</p>
                </div>
                <div className={Style.list}>
                    {
                        product.length>0 ? product?.map((e, i)=>(
                            <Element key={i} zero={e[0]} one={e[1]} two={e[2]} four={e[3]} five={e[4]} six={e[4]*e[2]}/>
                         ))
                        :
                        'enregistrer de nouvelle vente'
                    }
                </div> 
            </div>
        
        </div>
        </>
    )
}