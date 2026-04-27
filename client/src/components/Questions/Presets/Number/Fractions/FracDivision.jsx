import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../../BaseQuestionForm";

const createKatex = (params) => {
  const p1 = params.param1?.value;
  const p2 = params.param2?.value;
  const p3 = params.param3?.value;
  const p4 = params.param4?.value;

  if (!p1 || !p2 || !p3 || !p4) return "";

  if ([p1, p2, p3, p4].some(p => !/^\d+$/.test(p)))
    return `\\text{Invalid input}`;

  if (parseInt(p2) === 0 || parseInt(p4) === 0)
    return `\\text{Denominator cannot be zero}`;

  const n1 = parseInt(p1);
  const d1 = parseInt(p2);
  const n2 = parseInt(p3);
  const d2 = parseInt(p4);

  // Follows Keep Change Flip method
  const baseNumerator = n1 * d2;
  const baseDenominator = d1 * n2;

  if (baseDenominator === 0) return `\\text{Invalid, cannot divide by zero}`;

  const gcd = (x,y) => y ? gcd(y, x % y) : x;
  const divisor = gcd(baseNumerator, baseDenominator);

  return `
    \\frac{${p1}}{${p2}} \\div \\frac{${p3}}{${p4}}
    = \\frac{${p1}}{${p2}} \\times \\frac{${p4}}{${p3}}
    = \\frac{${baseNumerator}}{${baseDenominator}}
    = \\frac{${baseNumerator / divisor}}{${baseDenominator / divisor}}
  `;
};

const FracDivision = ({ onSubmit }) => {
  return(
    <BaseQuestionForm 
      title="Fraction Division Template"
      createKatex={createKatex}
      questionType="fraction_division"
      fields={[
        { name: "param1", placeholder: "First Numerator" },
        { name: "param2", placeholder: "First Denominator" },
        { name: "param3", placeholder: "Second Numerator" },
        { name: "param4", placeholder: "Second Denominator" },
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default FracDivision;