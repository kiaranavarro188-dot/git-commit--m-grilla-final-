import { colores } from './Colores'

// boton reutilizable
// recibe: texto, onClick, y opcionalmente: icono, variante, tamaño
export default function Boton(props: any) {
  // valores por defecto si no se pasan
  const variante = props.variante || 'primario'  // primario, celeste, blanco
  const tamano = props.tamano || 'medio'         // chico, medio, grande
  const Icono = props.icono                       // componente de lucide-react

  // segun la variante, elegimos el color
  let fondo = colores.primario
  let textoColor = colores.blanco
  let borde = colores.primario

  if (variante === 'celeste') {
    fondo = colores.secundario
    textoColor = colores.blanco
    borde = colores.secundario
  }
  if (variante === 'blanco') {
    fondo = colores.blanco
    textoColor = colores.primario
    borde = colores.borde
  }

  // segun el tamaño, elegimos el padding
  let padding = '8px 16px'
  let fontSize = '14px'
  if (tamano === 'chico') { padding = '4px 8px'; fontSize = '12px' }
  if (tamano === 'grande') { padding = '12px 24px'; fontSize = '16px' }

  return (
    <button
      onClick={props.onClick}
      title={props.title}
      style={{
        padding: padding,
        margin: '0 4px',
        cursor: 'pointer',
        backgroundColor: fondo,
        color: textoColor,
        border: `1px solid ${borde}`,
        borderRadius: '6px',
        fontSize: fontSize,
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {Icono && <Icono size={16} />}
      {props.texto}
    </button>
  )
}