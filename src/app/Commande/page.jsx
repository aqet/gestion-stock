'use client'
import Style from '../page.module.scss'
import Element from '@/components/element'
import { useEffect, useState } from 'react'

export default function Commande(){

    const [nom, setNom] = useState()
    const [qte, setQte] = useState(0)
    let saveProduct 
    const [data, setData] = useState([])
    const [product, setProduct] = useState([])
    const [isVisible, setIsVisible] = useState()
    const [valueNom, setValueNom] = useState([])
    const [update, setUpdate] = useState()

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/commande', {
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
        }catch (error) {
          console.error('errorrrrrrrrrrrrr', error);
        }
        saveProduct = {}
    };

    const delete_commande = async(params) =>{
        try {
            const response = await fetch('http://127.0.0.1:5000/api/suprimer/commande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (response.ok){
              console.log('Données envoyées avec succès');
              window.location.href='/Commande'
            } else {
              const errr = await response.json()
              console.error('Erreurrrr lors de l\'envoi des données', errr);
            }
              
        } catch (error) {
            console.error('errorrrrrrrrrrr', error);
        }
    }

    const update_commande = async(params) =>{
        try {
            const response = await fetch('http://127.0.0.1:5000/api/update/commande', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            if (response.ok){
              console.log('Données envoyées avec succès');
              window.location.href='/Commande'
            } else {
              const errr = await response.json()
              console.error('Erreurrrr lors de l\'envoi des données', errr);
            }
              
        } catch (error) {
            console.error('errorrrrrrrrrrr', error);
        }
    }

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/data')
          .then(response => response.json())
          .then(data => setData(data));  
    }, []);
    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/recuperer/commande')
          .then(response => response.json())
          .then(data => setProduct(data));  
    }, []);

    const divProposition=()=>{
        setTimeout(()=>{
            document.getElementsByClassName(Style.proposition)[0] .style.position='absolute'
            document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByName('nom')[0].offsetLeft+'px'
            document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByName('nom')[0].offsetTop+30+'px'
        }, [10])
    }

    isVisible ? divProposition() : ''

    const modify = (params0, params1, params2)=>{
        document.querySelectorAll('input')[0].value=params0
        setNom(params0)
        document.querySelectorAll('input')[1].value=params1
        setQte(params1)
        setUpdate(params2)
    }

    return (
        <div className={Style.contener} onClick={()=>setIsVisible(false)}>
                <div className={Style.commande}>
                    <div className={Style.add}>
                        <div className={Style.input}>
                        <div className={Style.divInput}>
                            <label htmlFor="">Nom</label>
                            <input onChange={(e)=>{setValueNom(e.target.value), setIsVisible(e.target.value ? true : false)}} type="" name="nom" id="" />
                            {
                            isVisible ?
                                <div className={Style.proposition}>
                                    {
                                        (data.filter(obje=>obje[0].toLowerCase().includes(valueNom))).length>0 ? 
                                            (data.filter(obje=>obje[0].toLowerCase().includes(valueNom))).map((e,i)=>(
                                                <div onClick={(e)=>{document.getElementsByName('nom')[0].value=e.target.innerText, setNom(e.target.innerText)}} key={i}>{e[0]!=null?e[0]:''}</div>
                                            ))  
                                        :
                                            <>Aucun produit trouver <br /> Veuillez modifier le nom</>
                                    }
                                </div>
                            : ''    
                            }
                        </div>
                            <div  className={Style.divInput}>
                                <label className={Style.label} htmlFor="">Quantiter</label>
                                <input onChange={(e)=>{setQte(e.target.value)}} min={1} type="number" name="qte" id="" placeholder={0}/>
                            </div>
                        </div>
                        <div className={Style.btnSave}>
                            <button onClick={()=>{
                                    nom ? 
                                        qte>0 ?  (
                                                    !update ? (
                                                        setProduct([[nom, qte], ...product]),
                                                        saveProduct = [nom, qte],
                                                        handleSubmit(),
                                                        Array.from(document.querySelectorAll('input')).map((e)=>{e.value=''}) ,
                                                        setNom(),
                                                        setQte(0)
                                                    ):(
                                                        update_commande([update, nom, qte])
                                                    )
                                                ):(
                                                    alert('veuillez verifier la quantiter')
                                                )
                                    : 
                                        alert('le produit dans le champ Nom n\'existe pas')
                                }}>
                                { !update ? 'Ajouter' : 'Enregistrer'}
                            </button>
                        </div>
                    </div>
                    <div className={Style.head}>
                        <p>libelé</p>
                        <p>Quantité</p>
                        <p>action</p>
                    </div>
                    <div className={Style.list}>
                        {
                            product.length>0 ? product?.map((e, i)=>(
                                <Element key={i} zero={e[0]} one={e[1]} two={<><button onClick={()=>delete_commande(e[2])} className={Style.delete}>suprimer</button><button onClick={()=>{modify(e[0], e[1], e[2])}} className={Style.update} >modifier</button></>}/>
                            )):'enregistrer les produits a commander'
                        }
                    </div> 
                </div>
            
        </div>
    )
}