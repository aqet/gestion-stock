'use client'
import { useEffect, useState } from 'react'
import Style from '../../page.module.scss'
import Element from '@/components/element'

export default function deta() {
    const params = window.location.search.slice(6)
    const [id, setId] = useState()
    const [name, setName] = useState(null)
    const [visible, setVisible] = useState(null)
    const [code, setCode] = useState(null)
    const [nom, setNom] = useState(null)
    const [prixU, setPrixU] = useState(0)
    const [nomE, setNomE] = useState(null)
    const [qte, setQte] = useState(0)
    const [prixT, setPrixT] = useState(0)
    const [product, setProduct] = useState([])
    const [isVisible, setIsVisible] = useState()
    const [valueNom, setValueNom] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        fetch('http://127.0.0.1:5000/api/data')
          .then(response => response.json())
          .then(data => setData(data));  
    }, []);

    useEffect(() => {
        setId(document.querySelector('.page_NavElement__vFZQA'))
        setName(document.querySelector('.page_NavElement__vFZQA').innerText)
        setNomE(document.querySelector('.page_NavElement__vFZQA').innerText)
        document.querySelector('.page_NavElement__vFZQA').classList += ' '+Style.active
    }, [10]);
    let saveProduct 
    let cutDate = null

    const handleSubmit = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/pret/enregistrer', {
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
        console.log((product.length)>0);
        saveProduct[0].nom ? '' : window.location.href = '/Pret'
        saveProduct = {}
    };

    useEffect(()=>{
        setPrixT(qte*prixU)
    },[qte, prixU])

    const divProposition=()=>{
        setTimeout(()=>{
            document.getElementsByClassName(Style.proposition)[0] .style.position='absolute'
            document.getElementsByClassName(Style.proposition)[0].style.left=document.getElementsByName('nom')[0].offsetLeft+'px'
            document.getElementsByClassName(Style.proposition)[0].style.top=document.getElementsByName('nom')[0].offsetTop+30+'px'
        }, [10])
    }

    isVisible ? divProposition() : ''

    return(
        <div style={{marginTop: '10px', flexDirection: 'column', alignItems: 'center'}} className={Style.contener}>
            <div style={{width: '90%'}} className={Style.head}>
                <h2>Ajouter un pret a <span>{name?.toUpperCase()}</span></h2>
                <button onClick={()=>setVisible(!visible)}>Nouveau preteur</button>
            </div>
            {
                visible ?
                    <div className={Style.popup}>
                        <div className={Style.Pop}>
                            <div className={Style.head}>
                                <p>Ajouter un nouveau emprunteur</p>
                                <img onClick={()=>setVisible(!visible)} src="/close.svg"/>
                            </div>
                            <div className={Style.body} >
                                <input autoFocus={true} onChange={(e)=>setNomE(e.target.value)} type="text" name="" placeholder='Entrez le nom' />
                            <button  onClick={()=>{
                                        saveProduct = [{code, nom, nomE, prixU, qte, cutDate, prixT}],
                                        console.log(saveProduct),
                                        handleSubmit()
                                    }}>Entregistrez</button>
                            </div>
                        </div>
                    </div>
                :
                    ''
            }
            <div className={Style.Nav}>
                {
                    params.split(',').map((e, index)=>(
                        <div onClick={(event)=>{
                            setName(event.target.innerText)
                            setNomE(event.target.innerText)
                            id!=event.target ? (event.target.classList.toggle(Style.active), id.classList.toggle(Style.active)) : ''
                            setId(event.target)                            
                        }} className={[Style.NavElement].join(' ')} id={index} key={index}>{e}</div>
                    ))
                }
            </div>
            <div className={Style.detailLoan}>
                <div className={Style.add}>
                    <div className={Style.input}>
                        <div className={Style.divInput}>
                            <label htmlFor="">Code</label>
                            <input onChange={(e)=>{setCode(e.target.value)}} type="text" name="code" id="" />
                        </div>
                        <div className={Style.divInput}>
                            <label htmlFor="">Nom</label>
                            <input onChange={(e)=>{setValueNom(e.target.value), setIsVisible(e.target.value ? 'nom' : false)}} type="" name="nom" id="" />
                            {
                            isVisible=='nom' ?
                                <div className={Style.proposition}>
                                    {
                                        (data.filter(obje=>obje[0].toLowerCase().includes(valueNom))).length>0 ? 
                                            (data.filter(obje=>obje[0].toLowerCase().includes(valueNom))).map((e,i)=>(
                                                <div onClick={(e)=>{document.getElementsByName('nom')[0].value=e.target.innerText, setNom(e.target.innerText)}} key={i}>{e[0]!=null?e[0]:''}</div>
                                            ))  
                                        :
                                            <>Aucun produit<br/>Veuillez modifier le nom</>
                                    }
                                </div>
                            : ''    
                            }
                        </div>
                        <div className={Style.divInput}>
                            <label htmlFor="">Prix unitaire</label>
                            <input onChange={(e)=>{setPrixU(e.target.value)}} min={1} type="number" name="prixU" id="" placeholder={0} />
                        </div>
                        <div className={Style.divInput}>
                            <label htmlFor="">Quantiter</label>
                            <input onChange={(e)=>{setQte(e.target.value)}} min={1} type="number" name="qte" id="" placeholder={0} />
                        </div>
                    </div>
                    <div className={Style.btnSave}>
                        <button onClick={()=>{
                            (code && nom && prixU && qte && nomE) ?  (
                                                                        cutDate = new Date().toString().slice(0, 15),
                                                                        setProduct([...product,{ code, nomE, nom, prixU, qte, cutDate, prixT}]) ,
                                                                        saveProduct = [{code, nom, nomE, prixU, qte, cutDate, prixT}],
                                                                        console.log(saveProduct),
                                                                        Array.from(document.querySelectorAll('input')).map((e)=>{e.value=''}) ,
                                                                        handleSubmit(),
                                                                        setCode(),
                                                                        setNom(),
                                                                        setPrixU(0),
                                                                        setQte(0),
                                                                        setPrixT(0)
                                                                    ):(
                                                                        console.log(code +' '+ nom +' '+ prixU +' '+ qte +' '+ nomE),
                                                                        alert('veuillez remplire tous les champ')
                                                                    ) 
                            }}>
                            Ajouter
                        </button>
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
                            product.length>0 ? product?.map((e, index)=>(
                                <Element key={index} onClick={()=>{jj(e[0])}} zero={e.code} one={e.nom} two={e.cutDate} three={e.prixU} four={e.qte} five={e.prixT}/>
                            )):''
                        }
                    </div>
                </div>
            </div>         
        </div>
    )
}