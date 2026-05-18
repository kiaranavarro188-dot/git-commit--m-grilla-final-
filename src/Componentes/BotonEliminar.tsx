import { Trash2 } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'

export default function BotonEliminar(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={Trash2}
      variante="iconoSolo"
      colorFondo={colores.secundario}
      title="Eliminar"
    />
  )
}