import Boton from './Boton'

export default function BarraHerramientas(props: any) {
  // botones para modificar la grilla
  // el de fuente va rotando entre las 3 que definimos abajo
  // el buscador es un input controlado desde App
  return (
    <div style={{ marginBottom: '10px' }}>
      <Boton texto="Agregar Fila" onClick={props.onAgregarFila} />
      <Boton texto="Agregar Columna" onClick={props.onAgregarColumna} />
      <Boton texto="Cambiar Fuente" onClick={props.onCambiarFuente} />
      <Boton texto="Cambiar Color" onClick={props.onCambiarColor} />
      
      <input 
        type="text" 
        placeholder="Buscar..." 
        onChange={function(e) { props.onBuscar(e.target.value) }}
        style={{ marginLeft: '10px', padding: '4px' }}
      />
    </div>
  )
}
