import {
    Algebra,
    PositionDirection,
    PropertiesOfShapes,
    Measurement,
    Addition,
    Division,
    Fractions,
    FractionsDec,
    FractionsDecPerc,
    Multiplication,
    NumberPlaceValue,
    Subtraction,
    Statistics
} from './Presets/index.js';

import { curriculum } from './curriculumConfig';
import { useState } from "react";

const QuestionPortal = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSubTopic, setSelectedSubTopic] = useState('');
    const [template, setTemplate] = useState(null);

    const PRESET_COMPONENTS = {
        'Algebra': <Algebra />,
        'Properties of Shapes': <PropertiesOfShapes />,
        'Position & Direction': <PositionDirection />,
        'Measurement': <Measurement />,
        'Number & Place Value': <NumberPlaceValue />,
        'Addition': <Addition />,
        'Subtraction': <Subtraction />,
        'Multiplication': <Multiplication />,
        'Division': <Division />,
        'Fractions': <Fractions />,
        'Fractions (Including Decimals)': <FractionsDec />,
        'Fractions (Including Decimals & Percentages)': <FractionsDecPerc />,
        'Statistics': <Statistics />
    }

    const SelectedPreset = selectedSubTopic && PRESET_COMPONENTS[selectedSubTopic];

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
        setSelectedTopic('');
        setSelectedSubTopic('');
    }

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
        setSelectedSubTopic('');
    }

    return (
        <div className="portal-container">
            <div className="portal-card">
                <div className="portal-header">
                    <h1>This is the header portion</h1>

                    <label> {/** Needs to display based on prev select element (Year Group -> Topic -> SubTopic) */}
                        Target Year Group:
                        <select value={selectedYear} onChange={handleYearChange}>
                            <option value="">Select year</option>
                            {[3, 4, 5, 6].map((year) => (
                                <option key={year} value={year}>
                                    Year {year}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Topic:
                        <select
                            value={selectedTopic}
                            onChange={e => {
                                setSelectedTopic(e.target.value)
                                setSelectedSubTopic('')
                            }}
                            disabled={!selectedYear}
                        >
                            <option value="">Select topic</option>

                            {selectedYear && 
                                Object.keys(curriculum[selectedYear]).map((topic) => (
                                    <option key={topic} value={topic}>
                                        {topic}
                                    </option>
                                ))}
                        </select>
                    </label>

                    <label>
                        Sub-Topic:
                        <select
                            value={selectedSubTopic}
                            onChange={(e) => setSelectedSubTopic(e.target.value)}
                            disabled={!selectedTopic}
                        >
                            <option value="">Select sub-topic</option>

                            {selectedYear && 
                                selectedTopic &&
                                curriculum[selectedYear][selectedTopic].map((subTopic) => (
                                    <option key={subTopic} value={subTopic}>
                                        {subTopic}
                                    </option>
                                ))}
                        </select>
                    </label>
                </div>

                <div className="portal-body"> {/** Will hopefully be able to conditionally render a question preset based on the selected tags */}
                    {/** Something like `if subtopic.value === x, render template_x` */}
                    {/** Maybe a switch case, after importing all templates */}

                    <div>
                        {SelectedPreset && <SelectedPreset />}
                    </div>

                </div>

                <div className="portal-footer">
                    <button type="reset">Reset</button>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionPortal;