import { useState, useEffect } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const FracCountUp = () => {
    const [previewTitle, setPreviewTitle] = useState("");
    const [previewBody, setPreviewBody] = useState("");
    // Will represent an array of fractions in KaTeX format e.g. [1/5, 2/5, 3/5, 4/5, 5/5]
    // Trialling an idea of using an array of values instead of 10 separate variables
    const [numbers, setNumbers] = useState([
        { value: '', hidden: false },
        { value: '', hidden: false },
        { value: '', hidden: false },
        { value: '', hidden: false },
        { value: '', hidden: false }
    ]);

    useEffect(() => {
        const katexStr = numbers
            .map(n => n.hidden ? '\\_' : n.value || '?')
            .join(', \\; '); // padding between each value
        setPreviewBody(katexStr);
    }, [numbers]);

    const handleNumberChange = (index, value) => {
        const newNumbers = [...numbers];
        newNumbers[index].value = value;
        setNumbers(newNumbers);
    }

    const handleToggle = (index) => {
        const newNumbers = [...numbers];
        newNumbers[index].hidden = !newNumbers[index].hidden;
        setNumbers(newNumbers);
    }

    const handleReset = () => {
        setPreviewTitle('');
        setNumbers(numbers.map(n => ({ value: '', hidden: false })));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFilled = numbers.every(n => n.value !== '');
        if (!previewTitle || !allFilled) {
            alert("Please fill in all fields before submission :)");
            return;
        }

        const formData = {previewTitle, numbers };
        onSubmit(formData);
        handleReset();
    }

    return(
        <div className="q-container">
            <div className="qform-container">
                <div className="qform-title">
                <h1>Fractional Counting Up Template</h1>
                <h4>Here you can create a question for counting up and down in fractions</h4>
                </div>

                <form onSubmit={handleSubmit}>
                    <input 
                        className="qform-input"
                        type="text" 
                        value={previewTitle}
                        onChange={(e) => setPreviewTitle(e.target.value)}
                        placeholder="Question Title..."
                    />

                    <div className="toggle-row">
                        {numbers.map((n, i) => (
                            <label key={i} style={{ marginRight: 10 }}>
                                <input 
                                    type="checkbox"
                                    checked={n.hidden}
                                    onChange={() => handleToggle(i)}
                                />
                                Hide
                            </label>
                        ))}
                    </div>

                    <div className="input-row">
                        {numbers.map((n, i) => (
                            <input 
                                key={i}
                                className="qform-input"
                                type="text" 
                                value={n.value}
                                onChange={(e) => handleNumberChange(i, e.target.value)}
                                placeholder={`Number ${i + 1}`}
                            />
                        ))}
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
                        <div className={"text-3xl"}>
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

export default FracCountUp;