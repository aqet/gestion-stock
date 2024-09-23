'use client'
import Style from '../page.module.scss'
import Element from '@/components/element'
import { useEffect, useState } from 'react'

export default function Entrer(){

    const [code, setCode] = useState()
    const [nom, setNom] = useState()
    const [prixU, setPrixU] = useState(0)
    const [nomF, setNomF] = useState()
    const [qte, setQte] = useState(0)
    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [isVisible, setIsVisible] = useState(false)
    const [codeData, setCodeData] = useState()
    const date = new Date()
    const cutDate = date.toString().slice(0, 15)
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
    let response
    const handleSubmit = async () => {
        try {
            response = await fetch('http://127.0.0.1:5000/api/insert', {
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
          }
        } catch (error) {
          console.error('errorrrrrrrrrrrrr', error);  
    
        }
    };

    const callfunction = ()=>{ product.length > 0 ? handleSubmit() : alert('veuillez d\'abord ajouter un produit ')}
    
    const divProposition=()=>{
        setTimeout(()=>{
            isVisible=='nom' ? (
                document.getElementsByClassName(Style.proposition)[0] .style.position='absolute',
                document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByName('nom')[0].offsetLeft+'px',
                document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByName('nom')[0].offsetTop+30+'px'
            ):isVisible=='code' ? (
                document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByName('code')[0].offsetLeft+'px',
                document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByName('code')[0].offsetTop+30+'px'   
            ):('')
        }, [10])
    }

    isVisible ? divProposition() : ''
    return (
        <div onClick={()=>isVisible!='code' ? setIsVisible(false) : ''} className={Style.contener}>
                <div className={Style.enter}>
                    <div className={Style.add}>
                        <div className={Style.input}>
                            <div className={Style.divInput}>
                                <label htmlFor="">Nom</label>
                                <input onChange={(e)=>{setNom(e.target.value), setIsVisible(e.target.value ? 'nom' : false)}} type="" name="nom" id="" />
                                {
                                isVisible=='nom' ?
                                    <div className={Style.proposition}>
                                        {
                                            (data.filter(obje=>obje[0].toLowerCase().includes(nom))).length>0 ? 
                                                (data.filter(obje=>obje[0].toLowerCase().includes(nom))).map((e,i)=>(
                                                    <div onClick={(e)=>{document.getElementsByName('nom')[0].value=e.target.innerText}} key={i}>{e[0]!=null?e[0]:''}</div>
                                                ))  
                                            :
                                            <>
                                                Aucun produit<br/>Vous allez creer un nouveau produit</>
                                        }
                                    </div>
                                : ''    
                                }
                            </div>
                            {/* <div className={Style.divInput}>
                                <label htmlFor="">Code</label>
                                <input onChange={(e)=>{setCode(e.target.value)}} type="text" name="code" id="" />
                            </div> */}
                            <div onBlur={()=>setTimeout(()=>setIsVisible(false), [100])} className={Style.divInput}>
                                <label htmlFor="">Code</label>
                                <input onFocus={()=>setIsVisible('code')} onChange={(e)=>{setCode(e.target.value), setIsVisible('code')}} type="text" name="code" id="" />
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
                                <input onChange={(e)=>{setPrixU(e.target.value)}} min={1} type="number" name="prixU" id="" placeholder={0}/>
                            </div>
                            <div className={Style.divInput}>
                                <label htmlFor="">Nom du fournisseur</label>
                                <input onChange={(e)=>{setNomF(e.target.value)}} type="text" name="nomF" id="" />
                            </div>
                            <div className={Style.divInput}>
                                <label htmlFor="">Quantiter</label>
                                <input onChange={(e)=>{setQte(e.target.value)}} min={1} type="number" name="qte" id="" placeholder={0}/>
                            </div>
                        </div>
                        <div className={Style.btnSave}>
                            <button onClick={()=>{ 
                                (code && nom && prixU && nomF && qte) ?  (
                                                                            saveProduct = [{code, nom, nomF, prixU, qte, cutDate}],
                                                                            handleSubmit(),
                                                                            setTimeout(() => {
                                                                                response.ok ? (
                                                                                    setProduct([[ code, nom, prixU, nomF, cutDate, qte ], ...product]),
                                                                                    Array.from(document.querySelectorAll('input')).map((e)=>{e.value=''}) ,
                                                                                    setCode(),
                                                                                    setNom(),
                                                                                    setPrixU(0),
                                                                                    setNomF(),
                                                                                    setQte(0)
                                                                                ):(
                                                                                    ''
                                                                                )
                                                                            }, [100])  
                                                                        ):(
                                                                            alert('veuillez remplire tous les champ')
                                                                        )
                                }}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <div className={Style.head}>
                        <p>Code</p>
                        <p>libelé</p>
                        <p>Prix unitaire</p>
                        <p>Nom fournisseur</p>
                        <p>date</p>
                        <p>Quantité</p>
                        <p>Prix total</p>
                    </div>
                    <div className={Style.list}>
                        {
                            product.length>0 ? product?.map((e, i)=>(
                                <Element key={i} zero={e[0]} one={e[1]} two={e[2]} three={e[3]} four={e[4]} five={e[5]}  six={e[5]*e[2]}/>

                            )):'enregistrer une nouvelle livraison'
                        }
                    </div>
                </div>
            
        </div>
    )
}