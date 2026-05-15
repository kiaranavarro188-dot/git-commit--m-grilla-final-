// define quien recibe el componente
type Opcion = {
  label: string;
  onClick: () => void;
};

type HeaderProps = {
  titulo: string;
  opciones?: Opcion[];
};

export default function Header({
  titulo,
  opciones = [],
}: HeaderProps) {
  return (
    <header
      style={{
        background: "#07214d",
        color: "white",
        padding: "15px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* TITULO */}
      <h1 style={{ margin: 0 }}>{titulo}</h1>

      {/* OPCIONES */}
      <nav style={{ display: "flex", gap: "15px" }}>
        {opciones.map((op, index) => (
          <span
            key={index}
            onClick={op.onClick}
            style={{
              cursor: "pointer",
            }}
          >
            {op.label}
          </span>
        ))}
      </nav>
    </header>
  );
}

// type HeaderProps = {
//   titulo: string;
// };

// export default function Header({ titulo }: HeaderProps) {
//   return (
//     <header
//       style={{
//         background: "#1e293b",
//         color: "white",
//         padding: "15px 20px",
//       }}
//     >
//       <h1>{titulo}</h1>
//     </header>
//   );
// }



