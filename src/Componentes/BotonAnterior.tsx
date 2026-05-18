import { ChevronLeft } from 'lucide-react'
import Boton from './Boton'

// boton para ir a la pagina anterior
// variante blanca, icono-solo de flecha izquierda
export default function BotonAnterior(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={ChevronLeft}
      variante="blanco"
      title="Anterior"
    />
  )
}