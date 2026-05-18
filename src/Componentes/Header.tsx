import "./Header.css";

type HeaderProps = {
  titulo: string;
  usuario?: string;
  onMenuClick?: () => void;
};

export default function Header({
  titulo,
  usuario = "Usuario",
  onMenuClick,
}: HeaderProps) {

  return (
    <header className="header">

      {/* IZQUIERDA */}
      <div className="header-left">

        <button
          className="menu-button"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <h1 className="header-title">
          {titulo}
        </h1>

      </div>

      {/* DERECHA */}
      <div className="header-user">

        <div className="user-avatar">
          👤
        </div>

        <span>
          {usuario}
        </span>

      </div>

    </header>
  );
}