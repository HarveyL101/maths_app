import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../../BaseQuestionForm";

const createKatex = (params) => {
  const p1 = params.param1?.value;
  const p2 = params.param2?.value;
  const p3 = params.param3?.value;
  const p4 = params.param4?.value;
  
  // Protects against crashing on load
  if (!p1 || !p2 || !p3 || !p4) return "";

  if (
    !/^\d+$/.test(p1) ||
    !/^\d+$/.test(p2) ||
    !/^\d+$/.test(p3) ||
    !/^\d+$/.test(p4)
  ) return `\\text{Invalid input}`;

  const n1 = Number(p1);
  const d1 = Number(p2);
  const n2 = Number(p3);
  const d2 = Number(p4);

  // Protects against invalid fractions
  if (d1 === 0 || d2 === 0) {
    return `\\text{Denominator cannot be zero}`;
  }

  // Check if the denominators are the same (Year 3/4)
  if (d1 === d2) {
    return `
      \\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}
      = \\frac{${n1 + n2}}{${d1}}
    `;
  }

  // Check if a denominator is a multiple of the other (Year 5 Skill)
  if (d1 % d2 === 0 || d2 % d1 === 0) {
    const commonDenom = Math.max(d1, d2);

    const a = n1 * (commonDenom / d1);
    const b = n2 * (commonDenom / d2);

    const numerator = a + b;

    return `
      \\frac{${n1}}{${d1}} + \\frac{${n2}}{${d2}}
      =
      \\frac{${a}}{${commonDenom}} + \\frac{${b}}{${commonDenom}}
      =
      \\frac{${numerator}}{${commonDenom}}
    `;
  }

  return `\\text{Unsuitable denominators for KS2 fraction addition}`;
}

const FracAddition = ({ onSubmit }) => {

  return (
    <BaseQuestionForm
      title="Fraction Addition Template"
      createKatex={createKatex}
      questionType="fraction_addition"
      fields={[
        { name: "param1", placeholder: "First Numerator" },
        { name: "param2", placeholder: "First Denominator" },
        { name: "param3", placeholder: "Second Numerator" },
        { name: "param4", placeholder: "Second Denominator" }
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default FracAddition;