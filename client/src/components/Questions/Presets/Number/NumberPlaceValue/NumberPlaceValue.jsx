import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const CountUp = () => {
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewBody, setPreviewBody] = useState("");
  // Will represent an array of numbers in KaTeX format e.g. [1, 2, 3, 4, 5]
  const [numArr, setNumArr] = useState(["", "", "", "", ""]); // Trialling an idea of using an array of values instead of 10 separate variables
  const [toggleArr, setToggleArr] = useState([false, false, false, false, false]); // Also trialling a stored array of boolean values
  const [arg1, setArg1] = useState(""); 
  const [arg2, setArg2] = useState("");
  const [arg3, setArg3] = useState("");
  const [arg4, setArg4] = useState("");
  const [arg5, setArg5] = useState("");

  const createKatex = (input1, input2, input3, input4, input5) => {
    // Protects against crashing on load
    if (!input1 || !input2 || !input3 || !input4 || !input5) {
      return ``;
    }

    // Checks if either input does not contain only one or more digits
    if (!/^\d+$/.test(input1) || !/^\d+$/.test(input2)) {
      return `
        \\begin{array}{c}
          \\text{Please use positive whole numbers only}
        \\end{array}
      `;
    }

    // Loops over numArr to 'hide' the toggled values
    for (i = 0; i < 4; i++) {
      if (toggleArr[i] === true) {
        const updatedNumArr = [...numArr];
        updatedNumArr[i] = `\\_`;

        setNumArr[updatedNumArr];
      }
    }

    return `
      ${numArr[0]}, ${numArr[1]}, ${numArr[2]}, ${numArr[3]}, ${numArr[4]}
    `;
  }

  // Updates previewBody whenever an argument changes
  // Also updates the array to be displayed in preview
  useEffect(() => {
    setPreviewBody(createKatex(arg1, arg2, arg3, arg4, arg5));
    setNumArr(input1, input2, input3, input4, input5);
  }, [arg1, arg2, arg3, arg4, arg5]);

  const handleReset = () => {
    setPreviewTitle("");
    setArg1("");
    setArg2("");
    setArg3("");
    setArg4("");
    setArg5("");
    setPreviewBody(null); // also clears the current preview
  }

  const updateToggle = (index) => {
    // Creates temporary updated array
    const el = document.querySelector(`#${inputID}`);
    const updatedToggleArr = [...toggleArr];
    updatedToggleArr[index] = !toggleArr[index]; // Flips the truthiness of the targeted index

    // debugging log
    console.log(`
      ToggleArr: ${toggleArr} \\
      Updated ToggleArr: ${updatedToggleArr}  
    `); 
    
    // Overwrites whole array to state
    setToggleArr(updatedToggleArr);
    
  }

  // requires further sanitation (assert INT datatype, etc.)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!previewTitle || !arg1 || !arg2 || !arg3 || !arg4 || !arg5) {
      alert("Please fill in all fields before submission!");
      return;
    }
    
    // Data object to be sent up to the parent and submitted to the database
    const formData = {
      previewTitle,
      arg1,
      arg2,
      arg3,
      arg4,
      arg5
    };

    onSubmit(formData); // Passing data to parent component

    handleReset(); // Clears fields after submission
  }
  
  return(
    <div className="q-container">
      <div className="qform-container">
          <div className="qform-title">
            <h1>Numerical Counting Up Template</h1>
            <h4>Here you can create a question for counting up and down in whole numbers</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div> {/** This will contain the row of inputs */}
              <input 
                className="qform-input"
                type="text" 
                value={previewTitle}
                onChange={(e) => setPreviewTitle(e.target.value)}
                placeholder="Question Title..."
              />

            <div> {/** This will contain the row of toggles used for hiding */}
              <p>Please use the toggles provided to indicate a 'hidden' entry in your sequence</p>
              <button type="checkbox" onClick={() => updateToggle(1)}>Hide</button>
              <button type="checkbox" onClick={() => updateToggle(2)}>Hide</button>
              <button type="checkbox" onClick={() => updateToggle(3)}>Hide</button>
              <button type="checkbox" onClick={() => updateToggle(4)}>Hide</button>
              <button type="checkbox" onClick={() => updateToggle(5)}>Hide</button>
            </div>

              <input
                id="0" 
                className="qform-input"
                type="text"
                value={arg1}
                onChange={(e) => setArg1(e.target.value)}
                placeholder="First Parameter Here..."
              />
              <input
                id="1" 
                className="qform-input"
                type="text" 
                value={arg2}
                onChange={(e) => setArg2(e.target.value)}
                placeholder="Second Parameter Here..."
              />
              <input
                id="2" 
                className="qform-input"
                type="text" 
                value={arg3}
                onChange={(e) => setArg3(e.target.value)}
                placeholder="Third Parameter Here..."
              />
              <input
                id="3" 
                className="qform-input"
                type="text" 
                value={arg4}
                onChange={(e) => setArg4(e.target.value)}
                placeholder="Fourth Parameter Here..."
              />
              <input
                id="4" 
                className="qform-input"
                type="text" 
                value={arg5}
                onChange={(e) => setArg5(e.target.value)}
                placeholder="Fifth Parameter Here..."
              />
            </div>
              

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
                <BlockMath math={previewBody} />
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

export default CountUp;