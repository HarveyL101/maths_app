import { useState } from "react";

function AccordionItem({ item, level = 0 }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col`}>
      <button
        className={`flex justify-between items-center w-full py-2 px-${level * 4} font-medium text-left hover:bg-gray-50 transition-colors`}
        onClick={() => setOpen(!open)}
      >
        {item.title}
        <span className="ml-2">{open ? "v" : ">"}</span>
      </button>

      {open && item.content && (
        <div className={`pl-${level*4} py-2 text-gray-700`}>
          {item.content}
        </div>
      )}

      {open &&
        item.children &&
        item.children.map((child, idx) => (
          <AccordionItem key={idx} item={child} level={level + 1} />
        ))}
    </div>
  );
}

export default function Accordion({ data }) {
  return (
    <div className="flex flex-col w-full border border-gray-200 rounded-md">
      {data.map((item, idx) => (
        <AccordionItem key={idx} item={item} />
      ))}
    </div>
  )
}