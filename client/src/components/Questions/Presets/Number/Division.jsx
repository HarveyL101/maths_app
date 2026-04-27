import 'katex/dist/katex.min.css';
import BaseQuestionForm from '../../BaseQuestionForm';

const createKatex = (params) => {
  let a = params.num0?.value;
  let b = params.num1?.value;
  // protects against crashing on load
  if (!a || !b) return "";

  // Checks if either input does not contain only one or more digits
  if (!/^\d+$/.test(a) || !/^\d+$/.test(b)) {
    return `
    \\begin{array}{c}
      \\text{Please use positive whole numbers only}
    \\end{array}
    `;
  }

  // assigned due to repeated use
  a = Number(a);
  b = Number(b);

  // Checking for bottom heavy divisions
  if (b > a) {
    return `
    \\begin{array}{c}
      \\text{The second input cannot be larger than the first}
    \\end{array}
    `;
  }

  // Divide by zero protection
  if (b === 0) {
    return `
    \\begin{array}{c}
      \\text{Cannot divide by zero}
    \\end{array}
    `;
  }

  const quotient = Math.floor(a / b);
  const remainder = a % b;


  const num1 = a.split("");
  const num2 = b.split("");

  console.log(num1, num2);

  // Answer = Divide a by b, and pad the left-most column for alignment
  const divideDigits = quotient
    .toString()
    .split("");

  const maxDigits = Math.max(a.length, divideDigits.length); // alows for dynamic inputs independant of length
  const totalCols = maxDigits; // Extra column is not needed here since short division format is not columnal

  // pads both numbers from the left to enforce H, T, U places
  // Dividend -> the total number being divided
  const paddedDividend = Array(maxDigits - a.length)
    .fill("")
    .concat(a.split(""));

  // Quotient -> the resulting number after division
  const paddedQuotient = Array(maxDigits - divideDigits.length)
    .fill("")
    .concat(divideDigits);

  // Row1 clears first column before the start of num1
  const row1 = ["", ...paddedDividend].join(" & ");
  // Row2 preceds num2 with the relevant operator (/)
  // Use KaTeX's own operators instead of symbols like / or %
  const row2 = ["\\div", ...Array(maxDigits).fill("")].join(" & ");
  const answer = ["", ...paddedQuotient].join(" & ");

  // `\\!` = negative thinspace
  const topLine = remainder === 0 ? `${quotient}` : `${quotient} & \\!\\!\\!\\! \\text{r. }${remainder}`;
  
  const template = 
  `
  \\begin{array}{${"r" + "c".repeat(totalCols - 1)}}
      ${topLine} \\\\
      ${b}\\overline{\\smash{)}${a}}
  \\end{array}
  `;

  return template; 
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