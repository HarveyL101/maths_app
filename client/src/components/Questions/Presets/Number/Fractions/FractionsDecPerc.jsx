import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../../BaseQuestionForm";

const createKatex = (params) => {
  const p1 = params.param1?.value; // Numerator
  const p2 = params.param2?.value; // Denominator
  const p3 = params.param3?.value; // Decimal
  const p4 = params.param4?.value; // Percentage

  if (!p1 || !p2 || !p3 || !p4) return "";
  
  // Is given value a whole number
  if (!/^\d+$/.test(p1) || !/^\d+$/.test(p2))
    return `\\text{Numerator and denominator must be whole numbers}`;

  // Does given value contain either 1 or 2 decimal places
  if (!/^\d+(\.\d{1,2})?$/.test(p3))
    return `\\text{Decimal must have 1 or 2 decimal places}`;
  
  // Is given value a whole number
  if (!/^\d+$/.test(p4))
    return `\\text{Percentage must be a whole number}`;

  const validDenominators = [2, 3, 4, 5, 8, 10, 100];
  if (!validDenominators.includes(parseInt(p2)))
    return `\\text{Denominator must be one of: 2, 3, 4, 5, 8, 10, 100}`;

  const fraction = params.param1?.hidden ? "?" : `\\frac{${p1}}{${p2}}`;
  const decimal  = params.param3?.hidden ? "?" : p3;
  const percentage = params.param4?.hidden ? "?" : `${p4}\\%`;

  return `${fraction} = ${decimal} = ${percentage}`;
};

const FractionsDecPerc = ({ onSubmit }) => {
  return (
    <BaseQuestionForm
      title="Fractions, Decimals & Percentages Template"
      createKatex={createKatex}
      questionType="fraction_decimal_percentages"
      fields={[
        { name: "param1", placeholder: "Numerator",  hasHidden: true },
        { name: "param2", placeholder: "Denominator" },
        { name: "param3", placeholder: "Decimal (e.g. 0.75)", hasHidden: true },
        { name: "param4", placeholder: "Percentage (e.g. 75)", hasHidden: true },
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default FractionsDecPerc;