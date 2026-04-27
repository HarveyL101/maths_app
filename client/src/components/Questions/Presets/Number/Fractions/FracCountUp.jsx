import 'katex/dist/katex.min.css';
import BaseQuestionForm from '../../../BaseQuestionForm';

const createKatex = (params) => {
    const p1 = params.param1?.value; // Starting numerator
    const p2 = params.param2?.value; // Starting denominator
    const p3 = params.param3?.value; // Step numerator
    const p4 = params.param4?.value; // Step denominator
    const p5 = params.param5?.value; // Number of steps to show

    if (!p1 || !p2 || !p3 ||!p4 || !p5) return "";

    if ([p1, p2, p3, p4, p5].some(p => !/^\d+$/.test(p))) return `\\text{Invalid input}`;

    const startN = Number(p1);
    const startD = Number(p2);
    const stepN = Number(p3);
    const stepD = Number(p4);
    const steps = Number(p5);

    if (startD === 0 || stepD === 0) return `\\text{Denominator cannot be zero}`;
    if (steps < 2 || steps > 8) return `\\text{Steps must be between 2 and 8}`;

    if (startD !== stepD) return `\\text{Start and step must share the same denominator}`;

    const sequence = [];
    for (let i = 0; i < steps; i++) {
        sequence.push(`\\frac{${startN + stepN * i}}{${startD}}`);
    }

    return sequence.join(" \\rightarrow ") + "  \\rightarrow \\ldots";
}
const FracCountUp = ({ onSubmit }) => {
    return(
        <BaseQuestionForm
            title={"Fraction Count Up Template"}
            createKatex={createKatex}
            questionType="fraction_count_up"
            fields={[
                { name: "param1", placeholder: "Start Numerator" },
                { name: "param2", placeholder: "Start Denominator" },
                { name: "param3", placeholder: "Step Numerator" },
                { name: "param4", placeholder: "Step Denominator" },
                { name: "param5", placeholder: "Number of Steps (2-8)" },
            ]}
            onSubmit={onSubmit}
        />
    );
}

export default FracCountUp;