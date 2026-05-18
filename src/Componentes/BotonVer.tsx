import { Eye } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'

export default function BotonVer(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={Eye}
      variante="iconoSolo"
      colorFondo={colores.celeste}
      title="Ver detalle"
    />
  )
}