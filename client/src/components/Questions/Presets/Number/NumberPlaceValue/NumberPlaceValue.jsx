import { useState } from "react";
import BaseQuestionForm from "../../../BaseQuestionForm.jsx";

// BIG WIP, NOT CURRENTLY A NPV TEMPLATE

const NumberPlaceValue = ({ onSubmit }) => {
  // Will represent an array of numbers in KaTeX format e.g. [1, 2, 3, 4, 5]
  const [numbers, setNumbers] = useState([
    { value: "", hidden: false },
    { value: "", hidden: false },
    { value: "", hidden: false },
    { value: "", hidden: false },
    { value: "", hidden: false }
  ]);

  const createKatex = (input1, input2, input3, input4, input5) => {
    // Protects against crashing on load
    if (!numbers.every(n => n.value)) return "";

    // Checks if all values are positive integers
    if (!numbers.every(n => /^\d+$/.test(n.value))) {
      return `
        \\begin{array}{c}
          \\text{Please use positive whole numbers only}
        \\end{array}
      `;
    }

    return numbers.map(n => n.hidden ? "\\_" : n.value).join(", ");
  }

  const updateValue = (index, value) => {
    const updated = [...numbers];
    updated[index].value = value;
    setNumbers(updated);
  };

  const toggleHidden = (index) => {
    const updated = [...numbers];
    updated[index].hidden = !updated[index].hidden;
    setNumbers(updated);
  }

  const fields = numbers.map((_, i) => ({
    name: `num${i}`,
    placeholder: `Number ${i + 1}`,
    value: numbers[i].value,
    onChange: (e) => updateValue(i, e.target.value),
    toggleHidden: () => toggleHidden(i),
    hidden: numbers[i].hidden
  }));
  
  return(
    <BaseQuestionForm 
      title="Number & Place Value Template"
      createKatex={createKatex}
      fields={fields}
      onSubmit={onSubmit}
    />
  );
}

export default NumberPlaceValue;