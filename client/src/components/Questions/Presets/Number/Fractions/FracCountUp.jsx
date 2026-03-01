import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const CountUp = () => {
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewBody, setPreviewBody] = useState("");
    // Will represent an array of fractions in KaTeX format e.g. [1/5, 2/5, 3/5, 4/5, 5/5]
    const [fracArr, setFracArr] = useState([]); // Trialling an idea of using an array of values instead of 10 separate variables
    const [toggleArr, setToggleArr] = useState([]);
    const [arg1, setArg1] = useState(""); 
    const [arg2, setArg2] = useState("");
    const [arg3, setArg3] = useState("");
    const [arg4, setArg4] = useState("");
    const [arg5, setArg5] = useState("");

    return(
        <div className="q-container">
            <div className="qform-container">
                <div className="qform-title">
                <h1>Fractional Counting Up Template</h1>
                <h4>Here you can create a question for counting up and down in fractions</h4>
                </div>
                <form onSubmit={handleSubmit}>
                    <p>Please use the toggles provided to indicate a 'hidden' entry in your sequence</p>

                    <div> {/** This will contain the row of toggles used for hiding */}
                        <button type="checkbox">X</button>
                        <button type="checkbox">X</button>
                        <button type="checkbox">X</button>
                        <button type="checkbox">X</button>
                        <button type="checkbox">X</button>
                    </div>
                    <div> {/** This will contain the row of inputs */}
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
                        <input 
                            className="qform-input"
                            type="text" 
                            value={arg3}
                            onChange={(e) => setArg3(e.target.value)}
                            placeholder="Third Parameter Here..."
                        />
                        <input 
                            className="qform-input"
                            type="text" 
                            value={arg4}
                            onChange={(e) => setArg4(e.target.value)}
                            placeholder="Fourth Parameter Here..."
                        />
                        <input 
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