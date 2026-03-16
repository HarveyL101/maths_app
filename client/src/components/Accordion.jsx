import { useState } from "react";

function AccordionItem({ item, level = 0, openByLevel, setOpenByLevel, id, onSelect }) {
  const open = openByLevel[level] === id;
  const isLeaf = !item.children;

  const violetShades = [
    "bg-violet-1",
    "bg-violet-2",
    "bg-violet-3",
    "bg-violet-4",
    "bg-violet-5",
    "bg-violet-5",
    "bg-violet-6",
    "bg-violet-7",
    "bg-violet-8",
    "bg-violet-9",
    "bg-violet-10"
  ];


  const handleClick = () => {
    if (!item.children && onSelect) {
      onSelect?.(item);
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
        style={{ paddingLeft: `${level * 16}px` }}
        className={`accordion-button ${violetShades[3 - level]}`}
        onClick={handleClick}
      >
        {item.title}
        {!isLeaf && <span className="ml-2">{open ? "▾" : "▸"}</span>}
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
          />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Accordion({ data, onSelect }) {
  const [openByLevel, setOpenByLevel] = useState({});

  return (
    <div className="accordion-container">
      {data.map((item, idx) => (
        <AccordionItem 
          key={idx} 
          id={String(idx)}
          item={item} 
          openByLevel={openByLevel}
          setOpenByLevel={setOpenByLevel}
          onSelect={onSelect} 
        />
      ))}
    </div>
  )
}