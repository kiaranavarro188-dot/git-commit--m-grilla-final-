import { Trash2 } from 'lucide-react'
import Boton from './Boton'

// boton para borrar, en blanco con icono de tacho
export default function BotonBorrar(props: any) {
  const texto = props.texto || 'Borrar'

  return (
    <Boton
      texto={texto}
      onClick={props.onClick}
      variante="blanco"
      icono={Trash2}
    />
  )
}