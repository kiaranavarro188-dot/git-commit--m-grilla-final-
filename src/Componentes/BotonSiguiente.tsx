import { ChevronRight } from 'lucide-react'
import Boton from './Boton'

// boton para ir a la pagina siguiente
// variante blanca, icono-solo de flecha derecha
export default function BotonSiguiente(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={ChevronRight}
      variante="blanco"
      title="Siguiente"
    />
  )
}