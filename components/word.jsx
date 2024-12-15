export default function Word(props)
{
      return(
        <span className={props.classname}>{props.text.toUpperCase()}</span>
      )
}