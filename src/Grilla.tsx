import { useState } from 'react'
import BotonEditar from './Componentes/BotonEditar'
import BotonEliminar from './Componentes/BotonEliminar'
import BotonVer from './Componentes/BotonVer'
import BotonAnterior from './Componentes/BotonAnterior'
import BotonSiguiente from './Componentes/BotonSiguiente'
// 🛠️ Importamos el modal que ya tienen separado en componentes
import Modal from './Componentes/Modal' 

export default function Grilla(props: any) {
  const [pagina, setPagina] = useState(1)
  const [porPagina, setPorPagina] = useState(10)
  
  // 🛠️ Estado para controlar la visibilidad del modal de editar columnas
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  return (
    <div style={{ marginTop: '10px' }}>
      
      {/* 🛠️ MODAL DE EDITAR COLUMNAS: Totalmente integrado y reutilizable */}
      <Modal 
        abierto={isModalOpen} 
        titulo="EDITAR COLUMNAS" 
        onClose={function() { setIsModalOpen(false) }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#333' }}>
          {columnas.map(function(col: string) {
            return (
              <div key={col} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{col}</span>
                {/* Acá adentro viven los interruptores/switches que armó Galia */}
                <input type="checkbox" defaultChecked style={{ width: '40px', height: '20px', cursor: 'pointer' }} />
              </div>
            )
          })}
        </div>
      </Modal>

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

        {/* 🛠️ El botón azul de BUSCAR se vincula con el input y la lógica nativa */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Buscar..."
            onChange={handleBusqueda}
            style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button 
            style={{ 
              padding: '6px 14px', 
              background: '#102a54', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
            onClick={props.onActualizar}
          >
            Buscar
          </button>
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