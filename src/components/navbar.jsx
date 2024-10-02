'use client'
import { useEffect, useState } from "react";
import Style from "../app/page.module.scss";
import { usePathname } from "next/navigation";

export default function Home() {

    const url = usePathname()
    const [currentDetail, setCurrentDetail] = useState(false)
    const [currentPret, setCurrentPret] = useState(false)
    useEffect(()=>{
        setCurrentDetail(window.location.href.indexOf('/detail') !== -1 ? true : false)
    },[])
    useEffect(()=>{
        setCurrentPret(window.location.href.indexOf('/Pret') !== -1 ? true : false)
    },[])
    
  return (
    <div className={Style.nav}>
            <div className={Style.div}>
            <div>LOGO</div>
            <ul className={Style.navigate}>
                <a href="/" className={
                    [
                        Style.element, 
                        url == `/` || currentDetail ? Style.color : ''
                    ].join(" ")}>
                        Dashboard
                </a>
                <a href="/Entrer" className={[Style.element, url == '/Entrer' ? Style.color : ""].join(" ")}>
                    Entrer
                </a>
                <a href="/Vente" className={[Style.element, url == '/Vente' ? Style.color : ""].join(" ")}>
                    Vente
                </a>
                <a href="/Commande" className={[Style.element, url == '/Commande' ? Style.color : ""].join(" ")}>
                    A Commander
                </a>
                <a href="/Pret"  className={
                    [
                        Style.element,
                         url == '/Pret' || currentPret ? Style.color : ""
                    ].join(" ")}>
                    Pret
                </a>
            </ul>
            </div>
        </div>
  )
}