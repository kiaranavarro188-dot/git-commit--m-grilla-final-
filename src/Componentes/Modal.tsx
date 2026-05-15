type ModalProps = {
  abierto: boolean;
  titulo: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({
  abierto,
  titulo,
  children,
  onClose,
}: ModalProps) {

  // SI ESTA CERRADO NO MUESTRA NADA
  if (!abierto) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* CAJA DEL MODAL */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          minWidth: "300px",
        }}
      >
        {/* TITULO */}
        <h2>{titulo}</h2>

        {/* CONTENIDO */}
        <div>{children}</div>

        {/* BOTON CERRAR */}
        <button onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}