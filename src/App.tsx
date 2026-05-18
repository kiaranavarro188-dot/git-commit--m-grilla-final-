import { useState, useRef } from 'react'
import BarraHerramientas from './BarraHerramientas'
import Grilla from './Grilla'
import { Grilla as GrillaLogica } from './Grilla/Grilla'
import Header from './Componentes/Header'
import Modal from './Componentes/Modal'
import Sidebar from './Componentes/Sidebar'
import BotonExportar from './Componentes/BotonExportar'
import BotonRefrescar from './Componentes/BotonRefrescar'
import BotonEditarColumnas from './Componentes/BotonEditarColumnas'
<<<<<<< HEAD
import BotonBorrarColumna from './Componentes/BotonBorrarColumna.tsx'
=======
import BotonAgregar from './Componentes/BotonAgregar'
import BotonBorrar from './Componentes/BotonBorrar'
import BotonBuscar from './Componentes/BotonBuscar';
import SignIn from './Componentes/SignIn';
>>>>>>> 252fd6e59bf53a0a75e60e97e958f3466b42ecbb

const datosIniciales1 = [
  { id: 1, nombre: 'Juan Perez', edad: 30, sexo: "Masculino", ciudad: "Buenos Aires" },
  { id: 2, nombre: 'Maria Garcia', edad: 25, sexo: "Femenino", ciudad: "Cordoba" },
  { id: 3, nombre: 'Pedro Ramirez', edad: 28, sexo: "Masculino", ciudad: "Rosario" },
  { id: 4, nombre: 'Ana Rodriguez', edad: 22, sexo: "Femenino", ciudad: "Mendoza" },
  { id: 5, nombre: 'Carlos Sanchez', edad: 35, sexo: "Masculino", ciudad: "Tucuman" },
,
];

const datosIniciales2 = [
  { id: 1, Herramienta: 'Martillo', Operario: 'Macarena', Cantidad: 1000 },
];

export default function App() {
  const [logueado, setLogueado] = useState(false);
  const [sidebarAbierto, setSidebarAbierto] = useState(true);

  // creamos las instancias de las clases con useRef
  const grillaPersonas = useRef(new GrillaLogica(datosIniciales1, ["id", "nombre", "edad", "sexo", "ciudad"]));
  const grillaHerramientas = useRef(new GrillaLogica(datosIniciales2, ['Herramienta', 'Operario', 'Cantidad']));

  // useState de "tick" para forzar re-render de la vista
  const [, forzarRender] = useState(0);

  // ESTADOS DE LOS MODALES 
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoModal, setModoModal] = useState<'editar' | 'ver'>('editar');
  const [filaSeleccionada, setFilaSeleccionada] = useState<any>(null);

<<<<<<< HEAD
  const [modalEditarColsAbierto, setModalEditarColsAbierto] = useState(false);
  const [modalBorrarColsAbierto, setModalBorrarColsAbierto] = useState(false);
=======
  if (!logueado) {
    return (
      <SignIn onSignIn={() => setLogueado(true)} />
    );
  }
>>>>>>> 252fd6e59bf53a0a75e60e97e958f3466b42ecbb

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

  // 
  // FUNCIONES QUE CONECTAN LOS BOTONES DE ACCION CON EL MODAL
  // 
  function abrirModalEditar(indice: number) {
    const fila = grillaPersonas.current.getFila(indice);
    setFilaSeleccionada({ ...fila, _indice: indice });
    setModoModal('editar');
    setModalAbierto(true);
  }

  function abrirModalVer(indice: number) {
    const fila = grillaPersonas.current.getFila(indice);
    setFilaSeleccionada({ ...fila, _indice: indice });
    setModoModal('ver');
    setModalAbierto(true);
  }

  function cerrarModal() {
    setModalAbierto(false);
    setFilaSeleccionada(null);
  }

  // borra la fila sin preguntar
  function eliminarFila(indice: number) {
    grillaPersonas.current.eliminarFila(indice);
    actualizar();
  }

  function refrescar() {
    actualizar();
    alert('Grilla refrescada');
  }

  function exportar() {
    const datos = grillaPersonas.current.getFilasFiltradas();
    console.log('Datos exportados:', datos);
    alert('Datos exportados a la consola (F12 para ver)');
  }

  // se llama desde el contenido del modal cuando aprietan Guardar
  function guardarCambiosModal(nuevosDatos: any) {
    grillaPersonas.current.editarFila(filaSeleccionada._indice, nuevosDatos);
    actualizar();
    cerrarModal();
  }
  // EDITAR Y BORRAR COLUMNAS CON EL MODAL 
  
  function abrirModalEditarColumnas() {
    setModalEditarColsAbierto(true);
  }

  function abrirModalBorrarColumnas() {
    setModalBorrarColsAbierto(true);
  }

  function guardarColumnasRenombradas(cambios: any) {
    for (const viejo in cambios) {
      const nuevo = cambios[viejo];
      if (nuevo && nuevo !== viejo) {
        grillaPersonas.current.renombrarColumna(viejo, nuevo);
      }
    }
    actualizar();
    setModalEditarColsAbierto(false);
  }

  function borrarUnaColumna(nombre: string) {
    grillaPersonas.current.borrarColumna(nombre);
    actualizar();
  }

  return (

    <div>
<<<<<<< HEAD
=======

>>>>>>> 252fd6e59bf53a0a75e60e97e958f3466b42ecbb
      <Header
        titulo="Mi Proyecto"
        onMenuClick={() => setSidebarAbierto(!sidebarAbierto)}
      />

      <div style={{ display: 'flex' }}>
        {sidebarAbierto && (
          <Sidebar
            items={[
<<<<<<< HEAD
              { label: "Dashboard", onClick: () => console.log("Dashboard") },
              { label: "Usuarios", onClick: () => console.log("Usuarios") },
              { label: "Configuración", onClick: () => console.log("Config") },
=======
              {
                label: "Dashboard",
                // AQUÍ AGREGAMOS EL DESPLEGABLE DE DASHBOARD
                subItems: [
                  { label: "Resumen General", onClick: () => console.log("Resumen General") },
                  { label: "Estadísticas", onClick: () => console.log("Estadísticas") },
                  { label: "Reportes", onClick: () => console.log("Reportes") },
                ]
              },
              {
                label: "Usuarios",
                // AQUÍ AGREGAMOS EL DESPLEGABLE DE USUARIOS
                subItems: [
                  { label: "Ver Listado", onClick: () => console.log("Ver Listado") },
                  { label: "Añadir Nuevo", onClick: () => console.log("Añadir Nuevo") },
                  { label: "Roles y Permisos", onClick: () => console.log("Roles y Permisos") },
                ]
              },
              {
                label: "Configuración",
                // ESTE ES EL DESPLEGABLE DE CONFIGURACIÓN
                subItems: [
                  { label: "Perfil", onClick: () => console.log("Perfil") },
                  { label: "Seguridad", onClick: () => console.log("Seguridad") },
                  { label: "Preferencias", onClick: () => console.log("Preferencias") },
                ],
              },
>>>>>>> 252fd6e59bf53a0a75e60e97e958f3466b42ecbb
            ]}
          />
        )}

        <div style={{ flex: 1, padding: '20px' }}>
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
              <BotonEditarColumnas onClick={abrirModalEditarColumnas} />
              <BotonBorrarColumna onClick={abrirModalBorrarColumnas} />
              <BotonExportar onClick={exportar} />
              <BotonRefrescar onClick={refrescar} />
            </div>
          </div>

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
              <BotonExportar onClick={function () { console.log('exportar herramientas') }} />
              <BotonRefrescar onClick={actualizar} />
            </div>
          </div>

          <Grilla
            instancia={grillaHerramientas.current}
            onActualizar={actualizar}
            onEditar={function () { alert('Modal de herramientas pendiente') }}
            onEliminar={function () { console.log('eliminar herramienta') }}
            onVer={function () { alert('Ver herramienta') }}
          />
        </div>
      </div>

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

      <Modal
        abierto={modalEditarColsAbierto}
        titulo="Editar Nombres de Columnas"
        onClose={function() { setModalEditarColsAbierto(false) }}
      >
        <EditarColumnasContenido
          columnas={grillaPersonas.current.getColumnas()}
          onGuardar={guardarColumnasRenombradas}
          onCancelar={function() { setModalEditarColsAbierto(false) }}
        />
      </Modal>

      <Modal
        abierto={modalBorrarColsAbierto}
        titulo="Borrar Columna"
        onClose={function() { setModalBorrarColsAbierto(false) }}
      >
        <BorrarColumnaContenido
          columnas={grillaPersonas.current.getColumnas()}
          onBorrar={borrarUnaColumna}
          onCerrar={function() { setModalBorrarColsAbierto(false) }}
        />
      </Modal>
    </div>
  )
}


// contenido del modal de editar/ver una fila
function ContenidoModal(props: any) {
  const [datosEditados, setDatosEditados] = useState({ ...props.datos })

  function handleCambio(campo: string, valor: string) {
    setDatosEditados(function (prev: any) {
      return { ...prev, [campo]: valor }
    })
  }

<<<<<<< HEAD
  const campos = Object.keys(props.datos).filter(function(k) {
=======
  // sacamos los campos internos que no queremos mostrar
  const campos = Object.keys(props.datos).filter(function (k) {
>>>>>>> 252fd6e59bf53a0a75e60e97e958f3466b42ecbb
    return k !== '_indice' && k !== '_indiceOriginal'
  })

  if (props.modo === 'ver') {
    return (
      <div>
        {campos.map(function (campo) {
          return (
            <p key={campo} style={{ margin: '8px 0' }}>
              <strong>{campo}:</strong> {props.datos[campo]}
            </p>
          )
        })}
      </div>
    )
  }

  return (
    <div>
      {campos.map(function (campo) {
        return (
          <div key={campo} style={{ margin: '8px 0' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>{campo}:</label>
            <input
              type="text"
              value={datosEditados[campo] || ''}
              onChange={function (e) { handleCambio(campo, e.target.value) }}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )
      })}
      <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
        <button
          onClick={function () { props.onGuardar(datosEditados) }}
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

// contenido del modal de editar nombres de columnas (inputs para todas las columnas)
function EditarColumnasContenido(props: any) {
  const [nombres, setNombres] = useState(function() {
    const inicial: any = {}
    for (const col of props.columnas) {
      inicial[col] = col
    }
    return inicial
  })

  function handleCambio(viejo: string, nuevo: string) {
    setNombres(function(prev: any) {
      return { ...prev, [viejo]: nuevo }
    })
  }

  return (
    <div>
      <p style={{ marginTop: 0, color: '#666' }}>Modifica los nombres y presiona Guardar:</p>
      {props.columnas.map(function(col: string) {
        return (
          <div key={col} style={{ margin: '8px 0' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px', color: '#666' }}>
              {col}:
            </label>
            <input
              type="text"
              value={nombres[col]}
              onChange={function(e) { handleCambio(col, e.target.value) }}
              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
        )
      })}
      <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
        <button
          onClick={function() { props.onGuardar(nombres) }}
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

// contenido del modal de borrar columna (lista cada columna con un boton al lado)
function BorrarColumnaContenido(props: any) {
  return (
    <div>
      <p style={{ marginTop: 0, color: '#666' }}>Hacé click en "Borrar" al lado de la columna que quieras eliminar:</p>
      {props.columnas.map(function(col: string) {
        const esProtegida = col === 'id'
        return (
          <div
            key={col}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 12px',
              margin: '4px 0',
              background: '#f5f5f5',
              borderRadius: '4px'
            }}
          >
            <span>{col}</span>
            <button
              onClick={function() { props.onBorrar(col) }}
              disabled={esProtegida}
              style={{
                padding: '4px 12px',
                background: esProtegida ? '#ccc' : '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: esProtegida ? 'not-allowed' : 'pointer',
                fontSize: '13px'
              }}
            >
              {esProtegida ? 'Protegida' : 'Borrar'}
            </button>
          </div>
        )
      })}
      <div style={{ marginTop: '15px' }}>
        <button
          onClick={props.onCerrar}
          style={{ padding: '8px 16px', background: 'white', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}