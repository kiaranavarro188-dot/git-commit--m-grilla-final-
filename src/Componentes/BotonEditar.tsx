import { Pencil } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'


export default function BotonEditar(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={Pencil}
      variante="iconoSolo"
      colorFondo={colores.primario}
      title="Editar"
    />
  )
}