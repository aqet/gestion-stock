'use client'
import { useEffect, useState } from "react";
import Authentification from "./Autthentification/page";
import Style from '@/app/page.module.scss'

export default function Layout({children}) {
    const [nom, setNom] = useState()
    const [pass, setPass] = useState()
    const handleAuthentification = () => {
        setIsAuthentifie(!isAuthentifie);
        localStorage.setItem("isAuthentifie", isAuthentifie);
    };

    let saveProduct 
    const handleSubmit = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/api/pass', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(saveProduct),
          });
          console.log(response);
          if (response.ok){
            console.log('Données envoyées avec succès');
            response.status==200 ? handleAuthentification() : alert('verifier le mot de passe et le nom d;utilisateur')
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

    const [isAuthentifie, setIsAuthentifie] = useState(localStorage.getItem("isAuthentifie") === "true");
    // const [isAuthentifie, setIsAuthentifie] = useState(false);
    
    const addMonte =(e)=>{
        // e.target.parentNode.children[0].style.transform='translateY(-130%)';
        // e.target.parentNode.children[0].style.color='black';
        e.target.parentNode.children[0].classList.add(Style.inputFocus)
    }
    
    const removeMonte =(e)=>{
        // e.target.parentNode.children[0].style.transform='translateY(-130%)';
        // e.target.parentNode.children[0].style.color='black';
        e.target.value=='' ?
            e.target.parentNode.children[0].classList.remove(Style.inputFocus)
        :
            ''
    }

  return (
    <>
        {
            isAuthentifie ?( 
                <div className={Style.contener}>
                    <div className={Style.auth}>
                        <div className={Style.div}>
                            <div className={Style.head}>Entrez votre nom d&apos;utilisateur et votre mot de passe</div>
                            <div className={Style.body}>
                                <div className={Style.divInput}>
                                    <div>
                                        <label htmlFor="nom">Nom d&apos;utilisateur</label>
                                        <input onChange={(e)=>setNom(e.target.value)} onBlur={(e)=>{removeMonte(e)}} onFocus={(e)=>{addMonte(e)}} id="nom" type="text" />
                                    </div>
                                    <div>
                                        <label htmlFor="nom">Mot de passe</label>
                                        <input onChange={(e)=>setPass(e.target.value)} onBlur={(e)=>{removeMonte(e)}} onFocus={(e)=>{addMonte(e)}} id="nom" type="text" />
                                    </div>                                
                                </div>
                                <div style={{display: 'flex',justifyContent: 'space-between',width: '100%',alignItems: 'center'}}>
                                    <p style={{cursor:'pointer',color:'#0000ff96'}}>changer les informations</p>
                                    <button 
                                        // onClick={handleAuthentification}
                                        onClick={()=>{
                                            saveProduct=[{nom,pass}],
                                            console.log(saveProduct),
                                            handleSubmit()
                                        }}
                                        >
                                        Authentifier
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <button onClick={handleAuthentification}>Authentifier</button> */}
                </div>
            ):(
                children
            )
        }
    </>
  );
}