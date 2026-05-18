import { Pencil } from 'lucide-react'
import Boton from './Boton'
import { colores } from './Colores'

// boton de accion para editar fila
// icono-solo, fondo azul oscuro (primario)
export default function BotonEditar(props: any) {
  return (
    <Boton
      onClick={props.onClick}
      icono={Pencil}
      variante="iconoSolo"
      colorFondo={colores.primario}
      title="Editar"
    />
  )
}