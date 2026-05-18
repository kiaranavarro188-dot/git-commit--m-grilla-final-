import { useState } from 'react'
import BotonEditar from './Componentes/BotonEditar'
import BotonEliminar from './Componentes/BotonEliminar'
import BotonVer from './Componentes/BotonVer'
import BotonAnterior from './Componentes/BotonAnterior'
import BotonSiguiente from './Componentes/BotonSiguiente'

// componente de la grilla. recibe callbacks del padre para editar/eliminar/ver
export default function Grilla(props: any) {
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(10)

  const grilla = props.instancia
  const datosFiltrados = grilla.getFilasFiltradas()
  const columnas = grilla.getColumnas()
  const fuente = grilla.getFuente()
  const color = grilla.getColor()

  // calculo de paginacion
  const totalPaginas = Math.max(1, Math.ceil(datosFiltrados.length / porPagina))
  const inicio = (pagina - 1) * porPagina
  const fin = inicio + porPagina
  const datosVisibles = datosFiltrados.slice(inicio, fin)

  function handleBusqueda(e: any) {
    grilla.buscar(e.target.value)
    setPagina(1) // si busca, vuelve a la primera pagina
    props.onActualizar()
  }

  function handleCambiarPorPagina(e: any) {
    setPorPagina(Number(e.target.value))
    setPagina(1)
  }

  function paginaAnterior() {
    if (pagina > 1) setPagina(pagina - 1)
  }

  function paginaSiguiente() {
    if (pagina < totalPaginas) setPagina(pagina + 1)
  }

  return (
    <div style={{ marginTop: '10px' }}>
      {/* barra superior: mostrar a la izquierda, buscar a la derecha */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0'
      }}>
        <div>
          <label>Mostrar </label>
          <select value={porPagina} onChange={handleCambiarPorPagina} style={{ padding: '4px 8px', borderRadius: '4px' }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div>
          <label>Buscar: </label>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={handleBusqueda}
            style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
      </div>

      {/* tabla */}
      <table style={{
        fontFamily: fuente,
        border: `2px solid ${color}`,
        width: '100%',
        borderCollapse: 'collapse'
      }}>
        <thead>
          <tr>
            {columnas.map(function(col: string) {
              return (
                <th key={col} style={{ border: `1px solid ${color}`, padding: '8px', background: '#eee', textAlign: 'left' }}>
                  {col}
                </th>
              )
            })}
            <th style={{ border: `1px solid ${color}`, padding: '8px', background: '#eee', textAlign: 'left' }}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {datosVisibles.map(function(fila: any) {
            const originalIndex = fila._indiceOriginal

            return (
              <tr key={originalIndex}>
                {columnas.map(function(col: string) {
                  return (
                    <td key={col} style={{ border: `1px solid ${color}`, padding: '8px' }}>
                      {fila[col]}
                    </td>
                  )
                })}
                <td style={{ border: `1px solid ${color}`, padding: '8px' }}>
                  {/* los botones llaman a las funciones que vienen del padre por props */}
                  <BotonEditar onClick={function() { props.onEditar(originalIndex) }} />
                  <BotonEliminar onClick={function() { props.onEliminar(originalIndex) }} />
                  <BotonVer onClick={function() { props.onVer(originalIndex) }} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* paginacion abajo */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '10px 0',
        gap: '8px'
      }}>
        <span>Pagina {pagina} de {totalPaginas}</span>
        <BotonAnterior onClick={paginaAnterior} />
        <BotonSiguiente onClick={paginaSiguiente} />
      </div>
    </div>
  )
}