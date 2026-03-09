import 'katex/dist/katex.min.css';

const createKatex = (a, b) => {
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

    const num1 = a.split("");
    const num2 = b.split("");

    console.log(num1, num2);

    if (num1.length < num2.length) {
      return `
      \\begin{array}{c}
      \\text{The second input cannot be larger than the first}
      \\end{array}
      `;
    }
    
    const maxDigits = Math.max(num1.length, num2.length);
    const totalCols = maxDigits + 1;

    // pads both numbers from the left to enforce H, T, U places
    const padded1 = Array(maxDigits - num1.length).fill("").concat(num1);
    const padded2 = Array(maxDigits - num2.length).fill("").concat(num2);

    // Row1: clears first column before num1 starts
    const row1 = ["", ...padded1].join(" & ");

    // Row2: preceds the second row with the relevant operator (-)
    const row2 = ["-"].concat(padded2).join(" & ");

    // Answer = Subtract the digits, and pad the left-most column for alignment
    const subtractDigits = (parseInt(a) - parseInt(b))
      .toString()
      .split("");
    
    const answer = Array(totalCols - subtractDigits.length).fill("").concat(subtractDigits).join(" & ");

    const template = 
    `
    \\begin{array}{${"c".repeat(totalCols)}}
      ${row1} \\\\
      ${row2} \\\\
      \\hline
      ${answer}
    \\end{array}
    `;

    return template;
  }

const Subtraction = ({ onSubmit }) => {
  return (
    <BaseQuestionForm
      title="Subtraction Template"
      createKatex={createKatex}
      fields={[
        { name: "a", placeholder: "First Number" },
        { name: "b", placeholder: "Second Number" }
      ]}
      onSubmit={onSubmit}
    />
  );
}

export default Subtraction;