import { ChevronRight } from 'lucide-react'
import Boton from './Boton'

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