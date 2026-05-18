import Boton from './Componentes/Boton'

export default function BarraHerramientas(props: any) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <Boton texto="Agregar Columna" onClick={props.onAgregarColumna} />
      <Boton texto="Modificar Columna" onClick={props.onModificarColumna} />
      <Boton texto="Borrar Columna" onClick={props.onBorrarColumna} variante="blanco" />
      <Boton texto="Cambiar Fuente" onClick={props.onCambiarFuente} />
      <Boton texto="Cambiar Color" onClick={props.onCambiarColor} />
      <Boton texto="Agregar Fila" onClick={props.onAgregarFila} />
      <input
        type="text"
        placeholder="Buscar..."
        onChange={function(e) { props.onBuscar(e.target.value) }}
        style={{ marginLeft: '10px', padding: '4px' }}
      />
    </div>
  )
}