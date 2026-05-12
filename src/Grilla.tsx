import { useState } from 'react'

// aca arriba esta la clase que maneja la logica
export default function Grilla(props: any) {
  // el estado de la vista (que fila se esta editando) vive en React
  const [filaEditando, setFilaEditando] = useState<number | null>(null)
  const [datosTemporales, setDatosTemporales] = useState<any>({})

  // le pedimos todo a la clase
  const grilla = props.instancia;
  const datosFiltrados = grilla.getFilasFiltradas()
  const columnas = grilla.getColumnas()
  const fuente = grilla.getFuente()
  const color = grilla.getColor()

  function iniciarEdicion(originalIndex: number, fila: any) {
    setFilaEditando(originalIndex)
    setDatosTemporales({ ...fila })
  }

  function guardarEdicion(originalIndex: number) {
    // llamamos al metodo de la clase para guardar los cambios
    grilla.editarFila(originalIndex, datosTemporales)
    setFilaEditando(null)
    // forzamos a que se vuelva a renderizar
    props.onActualizar()
  }

  function cancelarEdicion() {
    setFilaEditando(null)
  }

  function handleInputChange(columna: string, valor: string) {
    setDatosTemporales(function(prev: any) {
      return { ...prev, [columna]: valor }
    })
  }

  return (
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
        {datosFiltrados.map(function(fila: any) {
          // usamos el indice original que le inyecto la clase Grilla
          const originalIndex = fila._indiceOriginal
          // si la fila esta en modo edicion muestro inputs en vez del texto
          const enEdicion = filaEditando === originalIndex

          return (
            <tr key={originalIndex}>
              {columnas.map(function(col: string) {
                return (
                  <td key={col} style={{ border: `1px solid ${color}`, padding: '8px' }}>
                    {enEdicion ? (
                      <input 
                        type="text" 
                        value={datosTemporales[col] || ''} 
                        onChange={function(e) { handleInputChange(col, e.target.value) }}
                      />
                    ) : (
                      fila[col]
                    )}
                  </td>
                )
              })}
              <td style={{ border: `1px solid ${color}`, padding: '8px' }}>
                {enEdicion ? (
                  <>
                    <button onClick={function() { guardarEdicion(originalIndex) }}>Guardar</button>
                    <button onClick={cancelarEdicion} style={{ marginLeft: '4px' }}>Cancelar</button>
                  </>
                ) : (
                  <button onClick={function() { iniciarEdicion(originalIndex, fila) }}>Editar</button>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
