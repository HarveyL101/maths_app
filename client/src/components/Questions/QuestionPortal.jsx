import {
    // Algebra
    Algebra,
    // Geometry
    PositionDirection,
    PropertiesOfShapes,
    // Measurement
    Measurement,
    // Number
    Addition,
    Subtraction,
    Multiplication,
    Division,
    // Number/Fractions
    FracAddition,
    FracSubtraction,
    FracCountUp,
    Fractions,
    FractionsDec,
    FractionsDecPerc,
    // Number/NumberPlaceValue
    CountUp,
    NumberPlaceValue,
    // Statistics
    Statistics
} from './Presets/index.js';

import { curriculum } from './curriculumConfig';
import { useState } from "react";

const QuestionPortal = () => {
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedSubTopic, setSelectedSubTopic] = useState('');
    const [formData, setFormData] = useState(null);

    const handleFormSubmit = (submittedData) => {
        console.log("Data received in parent:", submittedData);
        setFormData(submittedData);
    }

    const PRESET_COMPONENTS = {
        // Algebra
        'Algebra': Algebra,
        // Geometry
        'Properties of Shapes': PropertiesOfShapes,
        'Position & Direction': PositionDirection,
        // Measurement
        'Measurement': Measurement,
        // Number
        'Addition': Addition,
        'Subtraction': Subtraction,
        'Multiplication': Multiplication,
        'Division': Division,
        // Number/Fraction
        'Fraction Addition': FracAddition,
        'Fraction Subtraction': FracSubtraction,
        'Fraction Counting Up': FracCountUp,
        'Fractions': Fractions,
        'Fractions (Inc. Decimals)': FractionsDec,
        'Fractions (Inc. Decimals & Percentages)': FractionsDecPerc,
        // Number/NumberPlaceValue
        'Counting up': CountUp,
        'Number & Place Value': NumberPlaceValue,
        // Statistics
        'Statistics': Statistics
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

                    <label> {/** Displays the appropriate subgroup options based on the selected grouping (Hierarchy = YearGroup -> Topic -> SubTopic) */}
                        Target Year Group:
                        <select 
                            value={selectedYear} 
                            onChange={handleYearChange}
                        >
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
                            onChange={handleTopicChange}
                            disabled={!selectedYear}
                        >
                            <option value="">Select Topic</option>

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
                            <option value="">Select Sub-Topic</option>

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

                <div className="portal-body"> {/* Selected preset component must pass form values back to the parent layer for submission */}
                    <div> 
                        {SelectedPreset && <SelectedPreset onSubmit={handleFormSubmit}/>}
                    </div>

                </div>

                <div className="portal-footer">
                    <p>this is the portal footer</p>
                </div>
            </div>
        </div>
    );
};

export default QuestionPortal;