import { Columns } from 'lucide-react'
import Boton from './Boton'

export default function BotonBorrarColumna(props: any) {
  return (
    <Boton
      texto="Borrar Columna"
      onClick={props.onClick}
      variante="celeste"
      icono={Columns}
    />
  )
}