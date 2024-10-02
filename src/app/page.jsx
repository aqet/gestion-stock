'use client'
import Element from "@/components/element";
import Style from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const route = useRouter()
    const [filterOgj, setFilterOgj] = useState()
    const [data, setData] = useState([])
    const [obj,setObj] = useState([
        {
            nom: "tole",
            quantite:"3"
        },
        {
            nom: "gaine",
            quantite: '6'
        },
        {
            nom: "tole",
            quantite:"3"
        },
        {
            nom: "gaine",
            quantite: '6'
        },
        {
            nom: "tole",
            quantite:"3"
        },
        {
            nom: "gaine",
            quantite: '6'
        },
        {
            nom: "tole",
            quantite:"3"
        },
        {
            nom: "gaine",
            quantite: '6'
        },
        {
            nom: "tol",
            quantite:"3"
        },
        {
            nom: "gaine",
            quantite: '6'
        }
    ])

    useEffect(() => {
        fetch('http://0.0.0.0:5000/api/data')
        // https://5cf2-154-72-150-244.ngrok-free.app
          .then(response => response.json())
          .then(data => setData(data));  
    }, []);
    
    const searchElement=(e) =>{
        setFilterOgj(data.filter(obje=>obje[0].toLowerCase().includes(e.target.value)))
    }

    return (
    <>
        <div className={Style.search}>
            <label htmlFor="">rechercher un produit</label>
            <input placeholder="Commencez a ecrire" onChange={searchElement} type="text" name="search" className={Style.Isearch} />
        </div>
        <div className={Style.contener}>
            <div className={Style.dashboard}> 
                <div className={Style.head}>
                    <p>libelé</p>
                    <p>Quantité</p>
                </div>
                <div className={Style.list}>
                    {
                        (filterOgj && filterOgj.length>0)? filterOgj.map((e, index)=>(
                            <Element key={index} url={`detail/${e[0]}`} one={e[0]} five={e[1]}/>
                        )) : (!filterOgj) ? data?.map((e, index)=>(
                            <Element key={index} url={`detail/${e[0]}`} one={e[0]} five={e[1]}/>
                        )): <p>il n'ya auccun element avec ce nom</p>
                    }
                </div>
            </div>
        </div>
      </>
  );
}
