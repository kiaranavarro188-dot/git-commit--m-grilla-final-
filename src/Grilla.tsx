import { useState } from 'react'
import BotonEditar from './Componentes/BotonEditar'
import BotonEliminar from './Componentes/BotonEliminar'
import BotonVer from './Componentes/BotonVer'
import BotonAnterior from './Componentes/BotonAnterior'
import BotonSiguiente from './Componentes/BotonSiguiente'
import Modal from './Componentes/Modal'

export default function Grilla(props: any) {
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(10)
  const [isModalColumnas, setIsModalColumnas] = useState(false)
  const [isModalModificar, setIsModalModificar] = useState(false)
  const [isModalBorrar, setIsModalBorrar] = useState(false)
  const [columnaSeleccionada, setColumnaSeleccionada] = useState('')
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [columnaABorrar, setColumnaABorrar] = useState('')

  const grilla = props.instancia
  const datosFiltrados = grilla.getFilasFiltradas()
  const columnas = grilla.getColumnas()
  const fuente = grilla.getFuente()
  const color = grilla.getColor()

  const totalPaginas = Math.max(1, Math.ceil(datosFiltrados.length / porPagina))
  const inicio = (pagina - 1) * porPagina
  const fin = inicio + porPagina
  const datosVisibles = datosFiltrados.slice(inicio, fin)

  // registrar funciones para que App las pueda llamar desde la BarraHerramientas
  if (props.onSetModalModificar) {
    props.onSetModalModificar(() => {
      setColumnaSeleccionada(columnas[0] || '')
      setNuevoNombre(columnas[0] || '')
      setIsModalModificar(true)
    })
  }
  if (props.onSetModalBorrar) {
    props.onSetModalBorrar(() => {
      setColumnaABorrar(columnas.find((c: string) => c !== 'id') || '')
      setIsModalBorrar(true)
    })
  }

  function handleBusqueda(e: any) {
    grilla.buscar(e.target.value)
    setPagina(1)
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

  function confirmarModificar() {
    if (columnaSeleccionada && nuevoNombre) {
      grilla.renombrarColumna(columnaSeleccionada, nuevoNombre)
      props.onActualizar()
      setIsModalModificar(false)
    }
  }

  function confirmarBorrar() {
    if (columnaABorrar) {
      grilla.borrarColumna(columnaABorrar)
      props.onActualizar()
      setIsModalBorrar(false)
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>

      {/* Modal ver/ocultar columnas */}
      <Modal
        abierto={isModalColumnas}
        titulo="EDITAR COLUMNAS"
        onClose={function() { setIsModalColumnas(false) }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#333' }}>
          {columnas.map(function(col: string) {
            return (
              <div key={col} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{col}</span>
                <input type="checkbox" defaultChecked style={{ width: '40px', height: '20px', cursor: 'pointer' }} />
              </div>
            )
          })}
        </div>
      </Modal>

      {/* Modal modificar columna */}
      <Modal
        abierto={isModalModificar}
        titulo="MODIFICAR COLUMNA"
        onClose={function() { setIsModalModificar(false) }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Seleccionar columna:</label>
            <select
              value={columnaSeleccionada}
              onChange={function(e) {
                setColumnaSeleccionada(e.target.value)
                setNuevoNombre(e.target.value)
              }}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {columnas.map(function(col: string) {
                return <option key={col} value={col}>{col}</option>
              })}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Nuevo nombre:</label>
            <input
              type="text"
              value={nuevoNombre}
              onChange={function(e) { setNuevoNombre(e.target.value) }}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button
            onClick={confirmarModificar}
            style={{ padding: '8px 16px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Guardar
          </button>
        </div>
      </Modal>

      {/* Modal borrar columna */}
      <Modal
        abierto={isModalBorrar}
        titulo="BORRAR COLUMNA"
        onClose={function() { setIsModalBorrar(false) }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Seleccionar columna a borrar:</label>
            <select
              value={columnaABorrar}
              onChange={function(e) { setColumnaABorrar(e.target.value) }}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {columnas.filter(function(c: string) { return c !== 'id' }).map(function(col: string) {
                return <option key={col} value={col}>{col}</option>
              })}
            </select>
          </div>
          <p style={{ color: '#dc2626' }}>¿Seguro que querés borrar la columna <strong>{columnaABorrar}</strong>?</p>
          <button
            onClick={confirmarBorrar}
            style={{ padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Borrar
          </button>
        </div>
      </Modal>

      {/* barra superior */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
        <div>
          <label>Mostrar </label>
          <select value={porPagina} onChange={handleCambiarPorPagina} style={{ padding: '4px 8px', borderRadius: '4px' }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={handleBusqueda}
            style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button
            style={{ padding: '6px 14px', background: '#102a54', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={props.onActualizar}
          >
            Buscar
          </button>
        </div>
      </div>

      {/* tabla */}
      <table style={{ fontFamily: fuente, border: `2px solid ${color}`, width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columnas.map(function(col: string) {
              return (
                <th key={col} style={{ border: `1px solid ${color}`, padding: '8px', background: '#eee', textAlign: 'left' }}>
                  {col}
                </th>
              )
            })}
            <th style={{ border: `1px solid ${color}`, padding: '8px', background: '#eee', textAlign: 'left' }}>Acciones</th>
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
                  <BotonEditar onClick={function() { props.onEditar(originalIndex) }} />
                  <BotonEliminar onClick={function() { props.onEliminar(originalIndex) }} />
                  <BotonVer onClick={function() { props.onVer(originalIndex) }} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* paginacion */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '10px 0', gap: '8px' }}>
        <span>Pagina {pagina} de {totalPaginas}</span>
        <BotonAnterior onClick={paginaAnterior} />
        <BotonSiguiente onClick={paginaSiguiente} />
      </div>
    </div>
  )
}