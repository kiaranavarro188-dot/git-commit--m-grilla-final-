import { Search } from 'lucide-react'
import Boton from './Boton'

// boton de buscar, azul oscuro con lupa
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