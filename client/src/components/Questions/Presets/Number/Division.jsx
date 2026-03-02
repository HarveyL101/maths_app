import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from "react-katex";
import ToolTip from "../../../ToolTip";

const Division = () => {
  // state definitions here
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBody, setPreviewBody] = useState("");
  const [arg1, setArg1] = useState('');
  const [arg2, setArg2] = useState('');

  const createKatex = (input1, input2) => {
    // protects against crashing on load
    if (!input1 || !input2) return "";

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(input1) || !/^\d+$/.test(input2)) {
      return `
      \\begin{array}{c}
        \\text{Please use positive whole numbers only}
      \\end{array}
      `;
    }

    // assigned due to repeated use
    const a = Number(input1);
    const b = Number(input2);

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


    const num1 = input1.split("");
    const num2 = input2.split("");

    console.log(num1, num2);

    // Answer = Divide input1 by input2, and pad the left-most column for alignment
    const divideDigits = quotient
      .toString()
      .split("");

    const maxDigits = Math.max(input1.length, divideDigits.length); // alows for dynamic inputs independant of length
    const totalCols = maxDigits; // Extra column is not needed here since short division format is not columnal

    // pads both numbers from the left to enforce H, T, U places
    // Dividend -> the total number being divided
    const paddedDividend = Array(maxDigits - input1.length)
      .fill("")
      .concat(input1.split(""));

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

  useEffect(() => {
    setPreviewBody(createKatex(arg1, arg2));
  }, [arg1, arg2]);

  const handleReset = () => {
    setPreviewTitle("");
    setArg1("");
    setArg2("");
    setPreviewBody(""); // also clears the current preview
  }

  // requires further sanitation (assert INT datatype, etc.)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!previewTitle || !arg1 || !arg2) {
      alert("Please fill in all fields before submission!");
      return;
    }

    const formData = {
      previewTitle,
      arg1,
      arg2
    };

    onSubmit(formData); // Passing data to parent component

    handleReset(); // Clears fields after submission
  }

  return (
    <div className="q-container">
      <div className="qform-container">
        <div className="qform-title relative">
          <h1>Division Template</h1>

          <div className="absolute top-0 right-2">
            <ToolTip
              title="Addition Guidance (National Curriculum backed)" 
              body={
                <>
                  <p><strong>Year 3:</strong></p>
                  <p>
                    Pupils recall the 3, 4 and 8 times tables. 
                    They multiply two-digit numbers by one-digit numbers
                    and solve simple scaling and correspondence problems.
                  </p>

                  <p><strong>Year 4:</strong></p>
                  <p>
                    Pupils recall all multiplication facts to 12 &times; 12. 
                    They multiply two- and three-digit numbers by one digit using formal methods 
                    and use factor pairs and the distributive law.
                  </p>

                  <p><strong>Year 5:</strong></p>
                  <p>
                    Pupils multiply up to four digits by one- or two-digit numbers 
                    using long multiplication. They divide using short division and interpret 
                    remainders in context. They identify primes, factors and multiples.
                  </p>
                  <p><strong>Year: 6</strong></p>
                  <p>
                    Pupils divide using long division with two-digit divisors. 
                    They apply order of operations and solve complex multi-step problems 
                    involving all four operations.
                  </p>
                </>
              }
            />
          </div>
        </div>
        <form onSubmit={handleSubmit}>

          <input 
            className="qform-input"
            type="text" 
            value={previewTitle}
            onChange={(e) => setPreviewTitle(e.target.value)}
            placeholder="Question Title..."
          />

          <input 
            className="qform-input"
            type="text"
            value={arg1}
            onChange={(e) => setArg1(e.target.value)}
            placeholder="Dividend..."
          />

          <input 
            className="qform-input"
            type="text" 
            value={arg2}
            onChange={(e) => setArg2(e.target.value)}
            placeholder="Divisor..."
          />

          <div className="qform-button-container">
            <button className="qform-button" type="reset" onClick={handleReset}>Reset</button>
            <button className="qform-button" type="submit">Submit</button>
          </div>
          
        </form>
      </div>

      <div className="preview-container">
        <div className="preview-title">
          <h1>{previewTitle || "Question Title Here"}</h1>
        </div>
        <div className="preview-body">
          {previewBody ? (
            <div className="text-4xl">
              <BlockMath math={previewBody} />
            </div>
          ) : (
            <p>A complete calculation will appear here.</p>
          )}
        </div>

        <input className="qform-input" type="text" placeholder="Answer will go here..." disabled/>
        
        <div className="preview-button-container ">
          <button className="preview-button" type="reset" disabled>Reset</button>
          <button className="preview-button" type="submit" disabled>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Division;