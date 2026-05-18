import "./Sidebar.css";

type SidebarItem = {
  label: string;
  onClick?: () => void;
};

type SidebarProps = {
  items: SidebarItem[];
};

export default function Sidebar({
  items,
}: SidebarProps) {

  return (
    <aside className="sidebar">

      <div className="sidebar-title">
        MENÚ
      </div>

      <nav className="sidebar-nav">

        {items.map((item, index) => (
          <button
            key={index}
            className="sidebar-item"
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}

      </nav>

    </aside>
  );
}