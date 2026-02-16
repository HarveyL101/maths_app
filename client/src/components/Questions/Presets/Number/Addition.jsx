import { useState } from "react";

const Addition = () => {
  // state definitions go here
  const [previewTitle, setPreviewTitle] = useState(null);
  const [previewBody, setPreviewBody] = useState(null);

  
  const createKatex = (arg1, arg2) => {
    const result = Array.from(arg1 + arg2);
    const arr1 = Array.from(arg1);
    const arr2 = Array.from(arg2);

    cols = Math.max(arr1.length(), arr2.length());

    const row1 = "& " + arr1.join(" & ");
    const row2 = "+ & " + arr2.join(" & ");
    const answer = result.join(" & ");

    const template = `
    \begin{array}{${cols}}
      ${row1} \\
    + ${row2} \\
    \hline
      ${answer}
    \end {array}
    `;

    return template;
  }

  const handleSubmit = () => {
    // Form submission for question details go here
  }

  return (
    <div className="question-container">

      <div className="qform-container">
        <form action={handleSubmit}>
          <label>
            Question Title:
            <input type="text" name="questionTitle" onChange={(e) => setPreviewTitle(e.target.value)}/>
          </label>
          <label>
            Input 1:
            <input type="text" name="input1" placeholder="First Parameter Here."/>
          </label>
          <label>
            Input 2:
            <input type="text" name="input2" placeholder="Second Parameter Here."/>
          </label>

          <button type="reset">Reset</button>
          <button type="button">Preview</button> {/** Button that passes the input value to produce a template, then displays in the preview section */}
          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="preview-container">
        <div className="preview-title">
          <h1>{previewTitle && "Question Title Here"}</h1>
        </div>
        <div className="preview-body">
          <p>{previewBody && "Your Equation here"}</p>
        </div>
        <div>
          <button type="reset">Reset</button>
          <button type="button" onClick={createKatex}>Preview</button>
          <button type="submit">Submit</button>
        </div>
      </div>

      <h1>katex to html will go here</h1>
      <p>{template && 'Template is not yet usable.'}</p>
    </div>
  );
};

export default Addition;