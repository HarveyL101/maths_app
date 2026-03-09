import { useState, useEffect } from "react";
import { BlockMath } from "react-katex";

const BaseQuestionForm = ({ title, tooltipText, fields, createKatex, onSubmit }) => {
    const [previewTitle, setPreviewTitle] = useState("");
    const [params, setParams] = useState({});
    const [previewBody, setPreviewBody] = useState(""); 

    const handleChange = (name, value) => {
        setParams(prev => ({
            ...prev, [name]: value
        }));
    };

    useEffect(() => {
        setPreviewBody(createKatex(params));
    }, [params]);

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            previewTitle,
            params
        });
    };

    return (
    <div className="q-container">

      <div className="qform-container">

        <h1>{title}</h1>

        <form onSubmit={handleSubmit}>

          <input
            className="qform-input"
            type="text"
            value={previewTitle}
            onChange={(e) => setPreviewTitle(e.target.value)}
            placeholder="Question Title..."
          />

          {fields.map(field => (
            <input
              key={field.name}
              className="qform-input"
              type="text"
              placeholder={field.placeholder}
              value={params[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ))}

          <button type="submit">Submit</button>

        </form>

      </div>

      <div className="preview-container">

        <h1>{previewTitle || "Question Title Here"}</h1>

        {previewBody ? (
          <BlockMath math={previewBody} />
        ) : (
          <p>A complete calculation will appear here.</p>
        )}

      </div>

    </div>
    );
};

export default BaseQuestionForm;