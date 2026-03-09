import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../../BaseQuestionForm";

const createKatex = (params) => {
  const { frac1, frac2 } = params;

  // Protects against crashing on load
  if (!frac1 || !frac2) return "";

  const numerator1 = frac1.n;
  const denominator1 = frac1.d;
  const numerator2 = frac2.n;
  const denominator2 = frac2.d;

  // Protects against crashing on load
  if (!numerator1 || !denominator1 || !numerator2 || !denominator2) return "";

  // Protects against invalid fractions
  if (denominator1 === "0" || denominator2 === "0") {
    return `
      \\text{Denominator cannot be zero}
    `;
  }

  // Checks if either input does not contain only one or more digits
  if (!/^\d+$/.test(numerator1) || !/^\d+$/.test(denominator1) || 
      !/^\d+$/.test(numerator2) || !/^\d+$/.test(denominator2)) {
    return `
      \\frac{${numerator1}}{${denominator1}} + \\frac{${numerator2}}{${denominator2}} = 
    `;
  }

  const a = Number(numerator1);
  const b = Number(denominator1);
  const c = Number(numerator2);
  const d = Number(denominator2);

  // Check if the denominators are the same (Year 3/4)
  if (b === d) {
    const numerator = a + c;
    return `
      \\frac{${a}}{${b}} + \\frac{${c}}{${d}}
      = \\frac{${numerator}}{${b}}
    `;
  }

  // Check if a denominator is a multiple of the other (Year 5 Skill)
  if (b % d === 0 || d % b === 0) {
    const commonDenom = Math.max(b, d);

    const newA = a * (commonDenom / b);
    const newC = c * (commonDenom / d);

    const numerator = newA + newC;

    return `
      \\frac{${a}}{${b}} + \\frac{${c}}{${d}}
      =
      \\frac{${newA}}{${commonDenom}} + \\frac{${newC}}{${commonDenom}}
      =
      \\frac{${numerator}}{${commonDenom}}
    `;
  }

  return `
    \\text{Unsuitable denominators for KS2 fraction addition}
  `;
}

const FracAddition = () => {

  return (
    <BaseQuestionForm
      title="Fraction Addition Template"
      createKatex={createKatex}
      fields={[
        { name: "frac1.n", placeholder: "First Numerator" },
        { name: "frac1.d", placeholder: "First Denominator" },
        { name: "frac2.n", placeholder: "Second Numerator" },
        { name: "frac2.d", placeholder: "Second Denominator" }
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default FracAddition;