import { ChevronLeft } from 'lucide-react'
import Boton from './Boton'


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