import { Search } from 'lucide-react'
import Boton from './Boton'


export default function BotonBuscar(props: any) {
  const texto = props.texto || 'Buscar'

  return (
    <Boton
      texto={texto}
      onClick={props.onClick}
      variante="primario"
      icono={Search}
    />
  )
}