import { Plus } from 'lucide-react'
import Boton from './Boton'

// boton especializado para agregar
// internamente usa el Boton base con la config ya armada
export default function BotonAgregar(props: any) {
  // si me pasan un texto custom lo uso, sino uso "Agregar"
  const texto = props.texto || 'Agregar'

  return (
    <Boton
      texto={texto}
      onClick={props.onClick}
      variante="primario"
      icono={Plus}
    />
  )
}