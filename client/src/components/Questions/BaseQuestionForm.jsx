import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";

const BaseQuestionForm = ({ title, tooltipText, fields, createKatex, onSubmit, questionType }) => {
    const [previewTitle, setPreviewTitle] = useState("");
    const [params, setParams] = useState({});
    const [previewBody, setPreviewBody] = useState(""); 

    const handleChange = (name, prop, value) => {
        setParams(prev => ({
            ...prev, [name]: {
              ...prev[name],
              [prop]: value
            }
        }));
    };

    useEffect(() => {
        setPreviewBody(createKatex(params));
    }, [params]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ previewTitle, params, questionType });
        handleReset();
    };

    const handleReset = () => {
      setPreviewTitle("");
      setParams({});
      setPreviewBody("");
    }

    return (
    <div className="q-container">
      <div className="qform-container">
        <div className="qform-title">
          <h1>{title}</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="qform-input"
            type="text"
            value={previewTitle}
            onChange={(e) => setPreviewTitle(e.target.value)}
            placeholder="Question Title..."
          />

          {fields.map(field => {
            const fieldValue = params[field.name]?.value || ""; 
            const fieldHidden = params[field.name]?.hidden || false;

            return (
              <div key={field.name} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <input
                  className="qform-input"
                  type="text"
                  placeholder={field.placeholder}
                  value={fieldValue}
                  onChange={(e) => handleChange(field.name, "value", e.target.value)}
                  style={{ marginRight: 8 }}
                />

                {field.hasHidden && (
                  <label>
                    <input
                      type="checkbox"
                      checked={fieldHidden}
                      onChange={(e) => handleChange(field.name, "hidden", e.target.checked)}
                      style={{ marginRight: 4 }}
                    />
                    Hidden
                  </label>
                )}
              </div>
            )})}

          <div className="qform-button-container">
            <button type="reset" className="qform-button" onClick={handleReset}>Reset</button>
            <button type="submit" className="qform-button">Submit</button>
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
        
        <div className="preview-button-container">
          <button type="reset" className="preview-button">Reset</button>
          <button type="submit" className="preview-button">Submit</button>
        </div>

      </div>

    </div>
    );
};

export default BaseQuestionForm;