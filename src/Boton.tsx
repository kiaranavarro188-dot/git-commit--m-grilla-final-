export default function Boton(props: any) {
  return (
    <button
      onClick={props.onClick}
      title={props.title}
      style={{ padding: '4px 8px', margin: '0 4px', cursor: 'pointer' }}
    >
      {props.texto}
    </button>
  )
}
