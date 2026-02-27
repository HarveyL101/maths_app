import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const Addition = () => {
  // state definitions go here
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBody, setPreviewBody] = useState("");
  const [arg1, setArg1] = useState('');
  const [arg2, setArg2] = useState('');

  
  const createKatex = (input1, input2) => {

    // Protects against crashing on load
    if (!input1 || !input2) return "";

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(input1) || !/^\d+$/.test(input2)) {
      return `
      \\begin{array}{c}
      \\text{Please use positive whole numbers only}
      \\end{array}
      `;
    }
    
    const num1 = input1.split("");
    const num2 = input2.split("");

    console.log(num1, num2);

    const maxDigits = Math.max(num1.length, num2.length); // allows for dynamic inputs independant of length
    const totalCols = maxDigits + 1; // extra column for  the operator (+)

    // Pads both numbers from the left to enforce H, T, U places
    const padded1 = Array(maxDigits - num1.length).fill("").concat(num1);
    const padded2 = Array(maxDigits - num2.length).fill("").concat(num2);

    // Row 1: clears first column before num1 starts
    const row1 = ["", ...padded1].join(" & ");

    // Row 2: + in the first column before num2 starts
    const row2 = ["+"].concat(padded2).join(" & ");

    // Answer = sum the digits, and pad the left-most column for alignment
    const sumDigits = (parseInt(input1) + parseInt(input2))
      .toString()
      .split("");
    const answer = Array(totalCols - sumDigits.length).fill("").concat(sumDigits).join(" & ");

    const template = `
    \\begin{array}{${"c".repeat(totalCols)}}
      ${row1} \\\\
      ${row2} \\\\
      \\hline
      ${answer}
    \\end{array}
    `;

    return template;
  }

  // Updates previewBody whenever arg1 or arg2 changes
  useEffect(() => {
    setPreviewBody(createKatex(arg1, arg2));
  }, [arg1, arg2]);

  const handleReset = () => {
    setPreviewTitle("");
    setArg1("");
    setArg2("");
    setPreviewBody(null); // also clears the current preview
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
        <div className="qform-title">
          <h1>Addition Template</h1>
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
            placeholder="First Parameter Here..."
          />

          <input 
            className="qform-input"
            type="text" 
            value={arg2}
            onChange={(e) => setArg2(e.target.value)}
            placeholder="Second Parameter Here..."
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
};

export default Addition;