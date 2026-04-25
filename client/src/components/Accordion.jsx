import { useState } from "react";

function AccordionItem({ item, level = 0, openByLevel, setOpenByLevel, id, onSelect, selected }) {
  const open = openByLevel[level] === id;
  const isLeaf = !item.children;

  const isSelected = isLeaf 
    && selected?.title === item.title
    && selected?.year === item.year
    && selected?.topic === item.topic;

  const handleClick = () => {
    if (isLeaf && onSelect) {
      onSelect(item);
      return;
    } 
    
    setOpenByLevel(prev => ({
      ...prev, 
      [level]: open ? null : id
    }));
  };

  return (
    <div className="flex flex-col">
      <button
        data-level={level}
        style={{ "--indent": `${level * 16 + 8}px` }}
        className={`accordion-button
          ${isLeaf ? "accordion-leaf" : ""}
          ${open ? "open" : ""}
          ${isSelected ? "selected" : ""}
        `}
        onClick={handleClick}
      >
        {item.title}
        {!isLeaf && <span className="accordion-icon">▸</span>}
      </button>

      {item.children && (
        <div className={`accordion-panel ${open ? "open" : ""}`}>
          {item.children.map((child, idx) => (
            <AccordionItem
              key={idx}
              id={`${id}-${idx}`}
              item={child}
              level={level + 1}
              openByLevel={openByLevel}
              setOpenByLevel={setOpenByLevel}
              onSelect={onSelect}
              selected={selected}
          />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Accordion({ data, onSelect }) {
  const [openByLevel, setOpenByLevel] = useState({});
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
    onSelect?.(item);
  };

  return (
    <div className="accordion-container">
      {data.map((item, idx) => (
        <AccordionItem 
          key={idx} 
          id={String(idx)}
          item={item} 
          openByLevel={openByLevel}
          setOpenByLevel={setOpenByLevel}
          onSelect={handleSelect}
          selected={selected}
        />
      ))}
    </div>
  );
}