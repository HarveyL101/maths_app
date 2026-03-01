import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const FracSubtraction = () => {
    // state definitions go here
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBody, setPreviewBody] = useState("");
  const [arg1, setArg1] = useState('');
  const [arg2, setArg2] = useState('');
  const [arg3, setArg3] = useState('');
  const [arg4, setArg4] = useState('');

  const createKatex = (input1, input2, input3, input4) => {
    // Protects against crashing on load
    if (!input1 || !input2 || !input3 || !input4) return "";

    // Protects against invalid fractions
    if (input2 === "0" || input4 === "0") {
        return `
            \\text{Denominator cannot be zero}
        `;
    }

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(input1) || !/^\d+$/.test(input2) || 
        !/^\d+$/.test(input3) || !/^\d+$/.test(input4)) {
      return `
        \\frac{${input1}}{${input2}} - \\frac{${input3}}{${input4}} = 
      `;
    }

    const a = Number(input1);
    const b = Number(input2);
    const c = Number(input3);
    const d = Number(input4); 

    // Check if the denominators are the same (Year 3/4)
    if (b === d) {
        const numerator = a - c;
        return `
            \\frac{${a}}{${b}} - \\frac{${c}}{${d}}
            = \\frac{${numerator}}{${b}}
        `;
    }

    // Check if a denominator is a multiple of the other (Year 5 Skill)
    if (b % d === 0 || d % b === 0) {
      const commonDenom = Math.max(b, d);

      const newA = a * (commonDenom / b);
      const newC = c * (commonDenom / d);

      const numerator = newA - newC;

      return `
        \\frac{${a}}{${b}} - \\frac{${c}}{${d}}
        =
        \\frac{${newA}}{${commonDenom}} - \\frac{${newC}}{${commonDenom}}
        =
        \\frac{${numerator}}{${commonDenom}}
      `;
    }

    return `
        \\text{Unsuitable denominators for KS2 fraction subtraction}
    `;
  } 
}

export default FracSubtraction;
// harveylovesellasomuch