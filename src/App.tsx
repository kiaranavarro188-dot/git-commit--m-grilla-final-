import { useState, useRef } from 'react'
import BarraHerramientas from './BarraHerramientas'
import Grilla from './Grilla'
import { Grilla as GrillaLogica } from './Grilla/Grilla'

// componentes que hizo Galia
import Header from './Componentes/Header'
import Modal from './Componentes/Modal'

// botones reutilizables
import BotonExportar from './Componentes/BotonExportar'
import BotonRefrescar from './Componentes/BotonRefrescar'
import BotonEditarColumnas from './Componentes/BotonEditarColumnas'

const datosIniciales1 = [
  { id: 1, nombre: 'Juan Perez', edad: 30, sexo: "Masculino", ciudad: "Buenos Aires" },
  { id: 2, nombre: 'Maria Garcia', edad: 25, sexo: "Femenino", ciudad: "Cordoba" },
  { id: 3, nombre: 'Pedro Ramirez', edad: 28, sexo: "Masculino", ciudad: "Rosario" },
  { id: 4, nombre: 'Ana Rodriguez', edad: 22, sexo: "Femenino", ciudad: "Mendoza" },
  { id: 5, nombre: 'Carlos Sanchez', edad: 35, sexo: "Masculino", ciudad: "Tucuman" },
  { id: 6, nombre: 'Laura Martinez', edad: 29, sexo: "Femenino", ciudad: "Salta" },
  { id: 7, nombre: 'Diego Gonzalez', edad: 26, sexo: "Masculino", ciudad: "Mar del Plata" },
  { id: 8, nombre: 'Sofia Hernandez', edad: 31, sexo: "Femenino", ciudad: "La Plata" },
  { id: 9, nombre: 'Fernando Torres', edad: 24, sexo: "Masculino", ciudad: "Bahia Blanca" },
  { id: 10, nombre: 'Isabella Lopez', edad: 33, sexo: "Femenino", ciudad: "Neuquen" },
];

const datosIniciales2 = [
  { id: 1, Herramienta: 'Martillo', Operario: 'Macarena', Cantidad: 1000 },
];

export default function App() {
  // instancias de las clases (logica de la grilla)
  const grillaPersonas = useRef(new GrillaLogica(datosIniciales1, ["id", "nombre", "edad", "sexo", "ciudad"]));
  const grillaHerramientas = useRef(new GrillaLogica(datosIniciales2, ['Herramienta', 'Operario', 'Cantidad']));

  // useState para forzar re-render cuando la clase cambia
  const [, forzarRender] = useState(0);

  // ============================================================
  // CONEXION CON EL MODAL DE GALIA
  // estos 3 estados controlan el modal:
  // - modalAbierto: si se ve o no en pantalla
  // - modoModal: si esta en modo 'editar' o solo 'ver'
  // - filaSeleccionada: que fila se esta mostrando adentro
  // ============================================================
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modoModal, setModoModal] = useState<'editar' | 'ver'>('editar')
  const [filaSeleccionada, setFilaSeleccionada] = useState<any>(null)

  function actualizar() {
    forzarRender(function (x) { return x + 1; });
  }

  // handlers de la barra de herramientas
  function agregarFila() {
    grillaPersonas.current.agregarFila();
    actualizar();
  }

  function agregarColumna() {
    grillaPersonas.current.agregarColumna();
    actualizar();
  }

  function cambiarFuente() {
    grillaPersonas.current.cambiarFuente();
    actualizar();
  }

  function cambiarColor() {
    grillaPersonas.current.cambiarColor();
    actualizar();
  }

  function buscar(texto: string) {
    grillaPersonas.current.buscar(texto);
    actualizar();
  }

  // ============================================================
  // FUNCIONES QUE CONECTAN LOS BOTONES DE ACCION CON EL MODAL
  // cuando el BotonEditar de la grilla se aprieta, llama a abrirModalEditar
  // cuando el BotonVer se aprieta, llama a abrirModalVer
  // ambas funciones le dicen al Modal que se abra con los datos de la fila
  // ============================================================
  function abrirModalEditar(indice: number) {
    const fila = grillaPersonas.current.getFila(indice)
    setFilaSeleccionada({ ...fila, _indice: indice })
    setModoModal('editar')
    setModalAbierto(true)
  }

  function abrirModalVer(indice: number) {
    const fila = grillaPersonas.current.getFila(indice)
    setFilaSeleccionada({ ...fila, _indice: indice })
    setModoModal('ver')
    setModalAbierto(true)
  }

  function cerrarModal() {
    // cuando el Modal apreta el boton "Cerrar", llama a esta funcion
    setModalAbierto(false)
    setFilaSeleccionada(null)
  }

  // borra la fila directamente sin preguntar
  function eliminarFila(indice: number) {
    grillaPersonas.current.eliminarFila(indice)
    actualizar()
  }

  // refresca la grilla
  function refrescar() {
    actualizar()
    alert('Grilla refrescada')
  }

  // exporta los datos a la consola
  function exportar() {
    const datos = grillaPersonas.current.getFilasFiltradas()
    console.log('Datos exportados:', datos)
    alert('Datos exportados a la consola (F12 para ver)')
  }

  // renombra las columnas una por una con prompts
  function editarColumnas() {
    const columnas = grillaPersonas.current.getColumnas()
    for (const col of columnas) {
      const nuevoNombre = prompt(`Nombre nuevo para "${col}" (cancelar para dejar igual):`, col)
      if (nuevoNombre && nuevoNombre !== col) {
        grillaPersonas.current.renombrarColumna(col, nuevoNombre)
      }
    }
    actualizar()
  }

  // se llama desde el contenido del modal cuando aprietan Guardar
  function guardarCambiosModal(nuevosDatos: any) {
    grillaPersonas.current.editarFila(filaSeleccionada._indice, nuevosDatos)
    actualizar()
    cerrarModal()
  }

  return (
    <div>
      {/* HEADER de Galia, recibe titulo y opciones */}
      <Header
        titulo="Mi Proyecto"
        opciones={[
          { label: "Inicio", onClick: function() { console.log('inicio') } },
          { label: "Salir", onClick: function() { alert('Cerrando sesion') } },
        ]}
      />

      <div style={{ padding: '20px' }}>
        <BarraHerramientas
          onAgregarFila={agregarFila}
          onAgregarColumna={agregarColumna}
          onCambiarFuente={cambiarFuente}
          onCambiarColor={cambiarColor}
          onBuscar={buscar}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <h3>Listado de Personas</h3>
          <div>
            <BotonEditarColumnas onClick={editarColumnas} />
            <BotonExportar onClick={exportar} />
            <BotonRefrescar onClick={refrescar} />
          </div>
        </div>

        {/* la grilla recibe callbacks para que sus botones de fila avisen al padre */}
        <Grilla
          instancia={grillaPersonas.current}
          onActualizar={actualizar}
          onEditar={abrirModalEditar}
          onEliminar={eliminarFila}
          onVer={abrirModalVer}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
          <h3>Listado de Herramientas</h3>
          <div>
            <BotonExportar onClick={function() { console.log('exportar herramientas') }} />
            <BotonRefrescar onClick={actualizar} />
          </div>
        </div>

        <Grilla
          instancia={grillaHerramientas.current}
          onActualizar={actualizar}
          onEditar={function() { alert('Modal de herramientas pendiente') }}
          onEliminar={function() { console.log('eliminar herramienta') }}
          onVer={function() { alert('Ver herramienta') }}
        />
      </div>

      {/* ============================================================
          MODAL DE GALIA conectado con los botones de accion de la grilla
          se abre cuando el usuario apreta BotonEditar o BotonVer en una fila
          recibe:
            - abierto: si se ve o no (controlado por estado modalAbierto)
            - titulo: cambia segun si esta editando o solo viendo
            - onClose: funcion que se ejecuta al apretar el boton Cerrar
          adentro renderiza el formulario o el detalle de la fila
      ============================================================ */}
      <Modal
        abierto={modalAbierto}
        titulo={modoModal === 'editar' ? 'Editar Persona' : 'Ver Detalle'}
        onClose={cerrarModal}
      >
        {filaSeleccionada && (
          <ContenidoModal
            datos={filaSeleccionada}
            modo={modoModal}
            onGuardar={guardarCambiosModal}
            onCancelar={cerrarModal}
          />
        )}
      </Modal>
    </div>
  )
}

// componente interno que dibuja lo que va adentro del modal
// si modo='ver' muestra texto, si modo='editar' muestra inputs
function ContenidoModal(props: any) {
  const [datosEditados, setDatosEditados] = useState({ ...props.datos })

  function handleCambio(campo: string, valor: string) {
    setDatosEditados(function(prev: any) {
      return { ...prev, [campo]: valor }
    })
  }

  // sacamos los campos internos que no queremos mostrar
  const campos = Object.keys(props.datos).filter(function(k) {
    return k !== '_indice' && k !== '_indiceOriginal'
  })

  // modo ver: solo muestra los datos
  if (props.modo === 'ver') {
    return (
      <div>
        {campos.map(function(campo) {
          return (
            <p key={campo} style={{ margin: '8px 0' }}>
              <strong>{campo}:</strong> {props.datos[campo]}
            </p>
          )
        })}
      </div>
    )
  }

  // modo editar: muestra inputs y botones de guardar/cancelar
  return (
    <div>
      {campos.map(function(campo) {
        return (
          <div key={campo} style={{ margin: '8px 0' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>{campo}:</label>
            <input
              type="text"
              value={datosEditados[campo] || ''}
              onChange={function(e) { handleCambio(campo, e.target.value) }}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )
      })}
      <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
        <button
          onClick={function() { props.onGuardar(datosEditados) }}
          style={{ padding: '8px 16px', background: '#1e40af', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Guardar
        </button>
        <button
          onClick={props.onCancelar}
          style={{ padding: '8px 16px', background: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}