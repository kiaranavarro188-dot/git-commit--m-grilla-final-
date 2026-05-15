import { useState, useRef } from 'react'
import BarraHerramientas from './BarraHerramientas'
import Grilla from './Grilla'
import { Grilla as GrillaLogica } from './Grilla/Grilla'
import BotonAgregar from './Componentes/BotonAgregar'
import BotonBorrar from './Componentes/BotonBorrar'
import BotonBuscar from './Componentes/BotonBuscar'
import Header from './Componentes/Header'
import Modal from './Componentes/Modal'

const datosIniciales1 = [
  { id: 1, nombre: 'Juan Perez', edad: 30, sexo: "Masculino", ciudad: "Buenos Aires" },
  { id: 2, nombre: 'Maria Garcia', edad: 25, sexo: "Femenino", ciudad: "Cordoba" },
  { id: 3, nombre: 'Pedro Ramirez', edad: 28, sexo: "Masculino", ciudad: "Rosario" },
  { id: 4, nombre: 'Ana Rodriguez', edad: 22, sexo: "Femenino", ciudad: "Mendoza" },
  { id: 5, nombre: 'Carlos Sanchez', edad: 35, sexo: "Masculino", ciudad: "Tucuman" },
  { id: 6, nombre: 'Laura Martinez', edad: 29, sexo: "Femenino", ciudad: "Salta" },
  { id: 7, nombre: 'Diego Gonzalez', edad: 26, sexo: "Masculino", pais: "Argentina" },
  { id: 8, nombre: 'Sofia Hernandez', edad: 31, sexo: "Femenino", pais: "chile" },
  { id: 9, nombre: 'Fernando Torres', edad: 24, sexo: "Masculino" },
  { id: 10, nombre: 'Isabella Lopez', edad: 33, sexo: "Femenino" },
   { id: 7, nombre: 'Diego Gonzalez', edad: 26, sexo: "Masculino" },
  { id: 8, nombre: 'Sofia Hernandez', edad: 31, sexo: "Femenino" },
  { id: 9, nombre: 'Fernando Torres', edad: 24, sexo: "Masculino" },
  { id: 10, nombre: 'Isabella Lopez', edad: 33, sexo: "Femenino" },
];

const datosIniciales2 = [
  { id: 1, Herramienta: 'Martillo', Operario: 'Macarena', Cantidad: 1000 },
];

export default function App() {
  // creamos las instancias de las clases con useRef
  const grillaPersonas = useRef(new GrillaLogica(datosIniciales1, ["id", "nombre", "edad", "sexo","pais", "ciudad"]));
  const grillaHola = useRef(new GrillaLogica(datosIniciales2, ['Herramienta', 'Operario', 'Cantidad']));

  // useState de "tick" para forzar re-render de la vista
  const [, forzarRender] = useState(0);

  const [modalAbierto, setModalAbierto] = useState(false);

  function actualizar() {
    forzarRender(function (x) { return x + 1; });
  }

  // cada handler llama a un metodo de la clase y despues a actualizar
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

   function borrarFila() {
    grillaPersonas.current.borrarFila();
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
  

  return (
    <div>
      <Header titulo="Mi Proyecto" />

      <BarraHerramientas
        onAgregarFila={agregarFila}
        onAgregarColumna={agregarColumna}
        onCambiarFuente={cambiarFuente}
        onCambiarColor={cambiarColor}
        onBuscar={buscar}
      />
      
      <BotonAgregar onClick={agregarFila} texto="Agregar Fila" />
      
      <BotonBorrar onClick={borrarFila} texto="Borrar Fila" />

      <BotonBuscar onClick={() => console.log('buscar')} />
        <button onClick={() => setModalAbierto(true)}>
        Abrir Modal
        </button>
        <Modal
         abierto={modalAbierto}
         titulo="Mi Modal"
          onClose={() => setModalAbierto(false)}>
          <p>Hola 😎 soy un modal reusable</p>
        </Modal>

      <h3>Tabla de grillaHola</h3>
      <Grilla
        instancia={grillaHola.current}
        onActualizar={actualizar}
      />

    </div>

    
  )

 

}
