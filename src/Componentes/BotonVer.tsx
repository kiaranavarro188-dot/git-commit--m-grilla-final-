import { Eye } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'

// boton de accion para ver detalle
// icono-solo, fondo celeste
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