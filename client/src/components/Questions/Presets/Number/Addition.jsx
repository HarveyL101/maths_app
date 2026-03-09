import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import ToolTip from '../../../ToolTip.jsx';
import BaseQuestionForm from "../../BaseQuestionForm.jsx";

const createKatex = ({ a, b }) => {

    // Protects against crashing on load
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
    const sumDigits = (parseInt(a) + parseInt(b))
      .toString()
      .split("");
    const answer = Array(totalCols - sumDigits.length).fill("").concat(sumDigits).join(" & ");


    return `
      \\begin{array}{${"c".repeat(totalCols)}}
        ${row1} \\\\
        ${row2} \\\\
        \\hline
        ${answer}
      \\end{array}
    `;
  }

const Addition = ({ onSubmit }) => {
  // state definitions go here
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBody, setPreviewBody] = useState("");
  const [arg1, setArg1] = useState('');
  const [arg2, setArg2] = useState('');

  
  

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

    const formData = { previewTitle, arg1, arg2 };

    onSubmit(formData); // Passing data to parent component

    handleReset(); // Clears fields after submission
  }

  return (
    <div className="q-container">
      <div className="qform-container">
        <div className="qform-title relative">
          <h1>Addition Template</h1>

          <div className="absolute top-0 right-2">
            <ToolTip
              title="Addition Guidance (National Curriculum backed)" 
              body={
                <>
                  <p><strong>Year 3:</strong></p>
                  <p>
                    Pupils add three-digit numbers mentally and using 
                    formal column methods. They estimate answers and check using 
                    inverse operations. They solve missing number and word problems.
                  </p>

                  <p><strong>Year 4:</strong></p>
                  <p>
                    Pupils use formal written methods with four-digit numbers. 
                    They solve two-step problems and decide which methods are appropriate.
                  </p>

                  <p><strong>Year 5:</strong></p>
                  <p>
                    Pupils add numbers with more than four digits using formal and mental methods.
                    They solve multi-step contextual problems and use rounding to judge accuracy.
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