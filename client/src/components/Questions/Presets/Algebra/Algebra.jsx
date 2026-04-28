import 'katex/dist/katex.min.css';
import BaseQuestionForm from "../../BaseQuestionForm";

const OPERATORS = {
  '+':  (a, b) => a + b,
  '-':  (a, b) => a - b,
  '*':  (a, b) => a * b,
  '/':  (a, b) => a / b,
};

const KATEX_OPERATORS = {
  '+': '+',
  '-': '-',
  '*': '\\times',
  '/': '\\div',
};


const createKatex = (params) => {
  const p1       = params.param1?.value; // Left operand
  const operator = params.param2?.value; // Operator
  const p2       = params.param3?.value; // Right operand
  const result   = params.param4?.value; // Result

  if (!p1 || !operator || !p2 || !result) return "";
  // Must be a whole number
  if (![p1, p2, result].every(n => /^\d+$/.test(n))) return `\\text{The operands and result must be whole numbers}`;

  if (!OPERATORS[operator]) return `\\text{Operator must be one of: + - * /}`;

  const left    = params.param1?.hidden ? "\\square" : p1;
  const right   = params.param3?.hidden ? "\\square" : p2;
  const answer  = params.param4?.hidden ? "\\square" : result;
  const katexOperator = KATEX_OPERATORS[operator];

  // Validate that the equation is actually correct
  const computed = OPERATORS[operator](parseInt(p1), parseInt(p2));
  if (computed !== parseInt(result)) return `\\text{Equation is incorrect:} \\ ${p1} ${operator} ${p2} \\not= ${result}`;

  return `${left} ${katexOperator} ${right} = ${answer}`;
};

const Algebra = ({ onSubmit }) => {
  return (
    <BaseQuestionForm
      title="Algebra Template"
      createKatex={createKatex}
      questionType="algebra_missing_number"
      fields={[
        { name: "param1", placeholder: "Left operand (e.g. 3)",    hasHidden: true },
        { name: "param2", placeholder: "Operator ( + - * / )" },
        { name: "param3", placeholder: "Right operand (e.g. 4)",   hasHidden: true },
        { name: "param4", placeholder: "Result (e.g. 7)",          hasHidden: true },
      ]}
      onSubmit={onSubmit}
    />
  );
};

export default Algebra;