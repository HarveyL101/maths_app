import 'katex/dist/katex.min.css';
import BaseQuestionForm from '../../BaseQuestionForm';

const createKatex = (params) => {
  let a = params.num0?.value;
  let b = params.num1?.value;
  // protects against crashing on load
  if (!a || !b) return "";

  // Checks if either input does not contain only one or more digits
  if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) return `\\text{Please use positive whole numbers only}`;

  a = Number(a);
  b = Number(b);

  // Divide by zero protection
  if (b === 0) return `\\text{Cannot divide by zero}`;
  // Checking for bottom heavy divisions
  if (b > a) return `\\text{The second input cannot be larger than the first}`;

  const quotient = Math.floor(a / b);
  const remainder = a % b;

  const dividendDigits = String(a).split("");
  const quotientDigits = String(quotient).split("");
  const n = dividendDigits.length;

  // Pad to the left to match column count of dividend
  const paddedQuotient = Array(n - quotientDigits.length).fill("").concat(quotientDigits);

  // Top row: Blank divisor column, then quotient digits
  const topRow = ["", ...paddedQuotient].join(" & ");
  // Bottom row: Divisor with bracket and overline, then dividend digits
  const bottomRow = [`${b})`, ...dividendDigits].join(" & ");

  const remainderString = remainder !== 0 
    ? `\\text{r. } ${remainder}`
    : "";

  const cols = "r" + "r".repeat(n);

  return `
    \\begin{array}{ll}
      \\begin{array}{${cols}}
        ${topRow} \\\\
        \\hline
        ${bottomRow}
      \\end{array}
      & \\begin{array}{l} ${remainderString} \\\\ \\phantom{0} \\end{array}
    \\end{array}
  `; 
}
const Division = ({ onSubmit }) => {
  return (
    <BaseQuestionForm
      title="Subtraction Template"
      createKatex={createKatex}
      questionType="number_division"
      fields={[
        { name: "num0", placeholder: "Dividend" },
        { name: "num1", placeholder: "Divisor" }
      ]}
      onSubmit={onSubmit}
    />
  );
}

export default Division;