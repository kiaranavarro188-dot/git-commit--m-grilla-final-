import { Edit } from 'lucide-react'
import Boton from './Boton'

// boton para editar, celeste con icono de lapiz
export default function BotonEditar(props: any) {
  const texto = props.texto || 'Editar'

  return (
    <Boton
      texto={texto}
      onClick={props.onClick}
      variante="celeste"
      icono={Edit}
    />
  )
}