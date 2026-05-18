import { colores } from './Colores'

// boton reutilizable
// soporta variantes: primario, celeste, blanco, iconoSolo
// el modo iconoSolo es cuadrado, sin texto, solo un icono dentro
export default function Boton(props: any) {
  const variante = props.variante || 'primario'
  const tamano = props.tamano || 'medio'
  const Icono = props.icono

  // colores segun variante
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
  // si la variante es iconoSolo el color lo pasa por props.colorFondo
  if (variante === 'iconoSolo') {
    fondo = props.colorFondo || colores.primario
    textoColor = colores.blanco
    borde = fondo
  }

  // padding segun tamaño
  let padding = '8px 16px'
  let fontSize = '14px'
  if (tamano === 'chico') { padding = '4px 8px'; fontSize = '12px' }
  if (tamano === 'grande') { padding = '12px 24px'; fontSize = '16px' }

  // si es iconoSolo, padding cuadrado y sin texto
  if (variante === 'iconoSolo') {
    padding = '8px'
    if (tamano === 'chico') padding = '6px'
    if (tamano === 'grande') padding = '12px'
  }

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
        justifyContent: 'center',
        gap: '6px',
      }}
    >
      {Icono && <Icono size={16} />}
      {variante !== 'iconoSolo' && props.texto}
    </button>
  )
}