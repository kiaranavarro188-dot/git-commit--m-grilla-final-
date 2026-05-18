import { RefreshCw } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'

// boton para refrescar la grilla
// icono-solo, fondo primario, flecha circular blanca
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