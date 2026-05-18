import { Columns } from 'lucide-react'
import Boton from './Boton'

// boton para editar los nombres de las columnas de la grilla
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