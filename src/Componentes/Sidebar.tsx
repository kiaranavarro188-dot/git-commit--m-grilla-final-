import { useState } from "react";
import "./Sidebar.css";

export type SidebarItemType = {
  label: string;
  onClick?: () => void;
  subItems?: SidebarItemType[];
};

type SidebarProps = {
  items: SidebarItemType[];
};

function MenuItem({ item }: { item: SidebarItemType }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleClick = () => {
    if (hasSubItems) {
      setIsOpen(!isOpen);
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="sidebar-item-container">
      <button className="sidebar-item" onClick={handleClick}>
        <span className="sidebar-item-label">{item.label}</span>
        {hasSubItems && (
          <span className={`sidebar-icon ${isOpen ? 'open' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        )}
      </button>

      {hasSubItems && isOpen && (
        <div className="sidebar-subitems">
          {item.subItems!.map((sub, idx) => (
            <MenuItem key={idx} item={sub} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">
        MENÚ
      </div>
      <nav className="sidebar-nav">
        {items.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </nav>
    </aside>
  );
}