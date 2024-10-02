import Style from '@/app/page.module.scss'

export default function Authentification() {

    return(
        <div className={Style.contener} 
            onClick={()=>{
                console.log(localStorage.getItem(0)), 
                localStorage.setItem(0, localStorage.getItem('0')=='test' ? false : 'test')   
                // location.reload()
            }}>
            Authentificate
        </div>
    )
}