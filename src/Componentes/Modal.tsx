import "./Modal.css";

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

  if (!abierto) return null;

  return (
    <div className="modal-overlay">

      <div className="modal-container">

        <h2 className="modal-title">
          {titulo}
        </h2>

        <div className="modal-content">
          {children}
        </div>

        <div className="modal-actions">
          <button
            className="modal-button"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

      </div>

    </div>
  );
}