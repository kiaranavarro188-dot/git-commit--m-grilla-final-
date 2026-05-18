import { Columns } from 'lucide-react'
import Boton from './Boton'


export default function BotonEditarColumnas(props: any) {
  return (
    <Boton
      texto="Editar Columnas"
      onClick={props.onClick}
      variante="celeste"
      icono={Columns}
    />
  )
}