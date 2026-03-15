import { useState } from "react";

function AccordionItem({ item, level = 0, onSelect }) {
  const [open, setOpen] = useState(false);

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

  const isLeaf = !item.children;

  const handleClick = () => {
    if (!item.children && onSelect) {
      onSelect(item);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        style={{ paddingLeft: `${level * 16}px` }}
        className={`flex justify-between items-center w-full py-2 ${violetShades[3 - level]} font-medium text-left hover:bg-gray-50 transition-colors cursor-pointer`}
        onClick={handleClick}
      >
        {item.title}
        {!isLeaf && <span className="ml-2">{open ? "▾" : "▸"}</span>}
      </button>

      {open && item.children && 
        item.children.map((child, idx) => (
          <AccordionItem
            key={idx}
            item={child}
            level={level + 1}
            onSelect={onSelect}
          />
        ))}
    </div>
  );
}

export default function Accordion({ data, onSelect }) {
  return (
    <div className="flex flex-col w-full border border-gray-200 rounded-md">
      {data.map((item, idx) => (
        <AccordionItem key={idx} item={item} onSelect={onSelect} />
      ))}
    </div>
  )
}