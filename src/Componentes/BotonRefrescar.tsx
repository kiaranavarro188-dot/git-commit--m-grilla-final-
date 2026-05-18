import { RefreshCw } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'

export default function BotonRefrescar(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={RefreshCw}
      variante="iconoSolo"
      colorFondo={colores.primario}
      title="Refrescar"
    />
  )
}