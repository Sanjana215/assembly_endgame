export default function  Span (props)
{
    let style={
        backgroundColor:props.backgroundcolor,
        color:props.color
    }
    if(props.classname!=="hit")
    {
        
        return(
            <span style={style} className="not_hit">{props.name}</span>
         )
    }
    else{
        return (
       <span className={`not_hit ${props.classname}`} style={style}>{props.name}</span>)
    }
      
}