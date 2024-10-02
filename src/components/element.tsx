import Style from '../app/page.module.scss'
interface Prop {
    url?: String
    zero?: any
    one?: String
    two?: string
    three?: string
    four?: any
    five?: any
    six?: any
    onClick?: Function
    onDoubleClick?: Function
}

export default function Element({url, zero, one, two, three, four,five,six, onClick, onDoubleClick}:Prop){

    return(
    <a onClick={(event) => {onClick ? onClick(event) : ''}} href={url ? `${url}` : undefined} className={Style.product}>
        {zero  ? <p> {zero} </p> : ''}
        {one   ? <p> {one}  </p> : ''}
        {two   ? <p> {two}  </p> : ''}
        {three ? <p> {three}</p> : ''}
        {four  ? <p> {four} </p> : ''}
        {five  ? <p> {five} </p> : ''}
        {six   ? <p> {six}  </p> : ''}
    </a>
    )
}