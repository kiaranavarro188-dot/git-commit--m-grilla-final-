import { Download } from 'lucide-react'
import Boton from './Boton'

// boton para exportar datos
// variante secundaria (celeste), con texto e icono de descarga
export default function BotonExportar(props: any) {
  const texto = props.texto || 'Exportar'

  return (
    <Boton
      texto={texto}
      onClick={props.onClick}
      variante="celeste"
      icono={Download}
    />
  )
}